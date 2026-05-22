import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, MousePointer2, ArrowRight } from "lucide-react";

function buildShape(strokes, n, thickness = 0) {
    const lengths = strokes.map(s => {
        let l = 0;
        for (let i = 1; i < s.length; i++) {
            const dx = s[i].x - s[i-1].x, dy = s[i].y - s[i-1].y;
            l += Math.sqrt(dx*dx + dy*dy);
        }
        return l;
    });
    const total = lengths.reduce((a, b) => a + b, 0);
    const spine = [];
    for (let si = 0; si < strokes.length; si++) {
        const s = strokes[si];
        const count = Math.max(2, Math.round((lengths[si] / total) * n));
        const cumul = [0];
        for (let i = 1; i < s.length; i++) {
            const dx = s[i].x - s[i-1].x, dy = s[i].y - s[i-1].y;
            cumul.push(cumul[i-1] + Math.sqrt(dx*dx + dy*dy));
        }
        const sLen = cumul[cumul.length - 1];
        for (let k = 0; k < count; k++) {
            const d = (k / Math.max(count - 1, 1)) * sLen;
            let lo = 0, hi = cumul.length - 2;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (cumul[mid+1] < d) lo = mid + 1; else hi = mid;
            }
            const span = cumul[lo+1] - cumul[lo];
            const t = span < 1e-9 ? 0 : (d - cumul[lo]) / span;
            const x = s[lo].x + (s[lo+1].x - s[lo].x) * t;
            const y = s[lo].y + (s[lo+1].y - s[lo].y) * t;
            const tx = s[lo+1].x - s[lo].x;
            const ty = s[lo+1].y - s[lo].y;
            const tl = Math.sqrt(tx*tx + ty*ty) || 1;
            spine.push({ x, y, nx: -ty/tl, ny: tx/tl });
        }
    }
    while (spine.length < n) spine.push({ ...spine[spine.length - 1] });
    const pts = [];
    for (let i = 0; i < n; i++) {
        const sp = spine[i];
        const r = ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2;
        pts.push({ x: sp.x + sp.nx * r * thickness, y: sp.y + sp.ny * r * thickness });
    }
    return pts;
}

function arc(cx, cy, r, a0, a1, steps = 32) {
    const pts = [];
    for (let i = 0; i <= steps; i++) {
        const a = a0 + (a1 - a0) * (i / steps);
        pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    }
    return pts;
}

function codeShape(W, H, n) {
    const cx = W/2, cy = H/2, sx = W*0.36, sy = H*0.42;
    const thick = Math.min(W, H) * 0.04;
    return buildShape([
        [{ x: cx-sx*0.52, y: cy-sy*0.72 }, { x: cx-sx, y: cy }, { x: cx-sx*0.52, y: cy+sy*0.72 }],
        [{ x: cx+sx*0.52, y: cy-sy*0.72 }, { x: cx+sx, y: cy }, { x: cx+sx*0.52, y: cy+sy*0.72 }],
        [{ x: cx+sx*0.20, y: cy+sy*0.72 }, { x: cx-sx*0.20, y: cy-sy*0.72 }],
    ], n, thick);
}

function uxShape(W, H, n) {
    const cx = W / 2, cy = H / 2;
    const r = Math.min(W, H) * 0.3;
    const PI = Math.PI;
    const lx = cx - r * 0.2, ly = cy - r * 0.2;
    const lens = arc(lx, ly, r, 0, PI * 2, 64);
    const angle = PI / 4;
    const hx0 = lx + r * Math.cos(angle);
    const hy0 = ly + r * Math.sin(angle);
    const hLen = r * 0.65;
    const handle = [
        { x: hx0, y: hy0 },
        { x: hx0 + hLen * Math.cos(angle), y: hy0 + hLen * Math.sin(angle) },
    ];
    const cr = r * 0.3;
    const hLine = [{ x: lx - cr, y: ly }, { x: lx + cr, y: ly }];
    const vLine = [{ x: lx, y: ly - cr }, { x: lx, y: ly + cr }];
    const thick = Math.min(W, H) * 0.04;
    return buildShape([lens, handle, hLine, vLine], n, thick);
}

const N = 800;
const LERP   = 0.048;
const JITTER = 0.5;

export default function Chooser() {
    const navigate  = useNavigate();
    const canvasRef = useRef(null);
    const stateRef  = useRef({ targets: null, activeKey: null, activeColor: null });
    const shapesRef = useRef({ dev: null, ux: null });
    const [active, setActive] = useState(null);

    const setMode = useCallback((mode) => {
        setActive(mode);
        stateRef.current.activeKey = mode;
        stateRef.current.targets = mode ? shapesRef.current[mode] : null;
        stateRef.current.activeColor = mode === 'dev' ? '21, 142, 255' : '17, 17, 17';
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let frameId;

        function buildShapes() {
            const W = canvas.width, H = canvas.height;
            shapesRef.current.dev = codeShape(W, H, N);
            shapesRef.current.ux  = uxShape(W, H, N);
            const key = stateRef.current.activeKey;
            if (key) stateRef.current.targets = shapesRef.current[key];
        }

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            buildShapes();
        };

        const particles = Array.from({ length: N }, () => ({
            x: Math.random() * (window.innerWidth  || 800),
            y: Math.random() * (window.innerHeight || 600),
            tx: 0, ty: 0, alpha: 0,
        }));

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const { targets, activeColor } = stateRef.current;
            const color = activeColor || '21, 142, 255';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                if (targets) {
                    p.tx = targets[i].x;
                    p.ty = targets[i].y;
                    p.alpha += (1 - p.alpha) * 0.05;
                } else {
                    p.alpha += (0 - p.alpha) * 0.04;
                }
                p.x += (p.tx - p.x) * LERP + (Math.random() - 0.5) * JITTER;
                p.y += (p.ty - p.y) * LERP + (Math.random() - 0.5) * JITTER;
                if (p.alpha < 0.01) continue;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
                ctx.globalAlpha = Math.min(1, p.alpha) * 0.7;
                ctx.fillStyle = `rgba(${color}, 1)`;
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            frameId = requestAnimationFrame(animate);
        }

        frameId = requestAnimationFrame(animate);
        return () => { cancelAnimationFrame(frameId); ro.disconnect(); };
    }, []);

    return (
        <div
            className="relative flex flex-col w-full py-24 overflow-hidden"
            style={{ borderTop: '1px solid #e5e2dc' }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            <div className="relative z-10 flex flex-col w-full max-w-6xl mx-auto gap-16 px-6 md:px-12">

                {/* Section label */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div style={{ width: '32px', height: '3px', background: '#158EFF', flexShrink: 0 }} />
                        <span className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: '#158EFF' }}>
                            Work
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: '#111111' }}>
                        What are you looking for?
                    </h2>
                    <p className="text-base max-w-md" style={{ color: '#777777' }}>
                        Select a focus area to explore the work that matters to you.
                    </p>
                </div>

                {/* Cards */}
                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
                    <button
                        onMouseEnter={() => setMode("dev")}
                        onMouseLeave={() => setMode(null)}
                        onClick={() => navigate("/dev")}
                        className="flex flex-col gap-4 p-8 text-left transition-all duration-200 cursor-pointer flex-1 group"
                        style={{
                            background: active === 'dev' ? '#158EFF' : '#ffffff',
                            border: `1px solid ${active === 'dev' ? '#158EFF' : '#e5e2dc'}`,
                            boxShadow: active === 'dev' ? '0 8px 32px rgba(21,142,255,0.2)' : 'none',
                        }}
                    >
                        <Code2 size={24} style={{ color: active === 'dev' ? '#ffffff' : '#158EFF' }} />
                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-bold" style={{ color: active === 'dev' ? '#ffffff' : '#111111' }}>
                                Development
                            </span>
                            <span className="text-sm" style={{ color: active === 'dev' ? 'rgba(255,255,255,0.75)' : '#888888' }}>
                                Full-stack projects, AI tooling, and engineering work
                            </span>
                        </div>
                        <ArrowRight size={16} style={{ color: active === 'dev' ? '#ffffff' : '#158EFF', marginTop: 'auto' }} />
                    </button>

                    <button
                        onMouseEnter={() => setMode("ux")}
                        onMouseLeave={() => setMode(null)}
                        onClick={() => navigate("/ux")}
                        className="flex flex-col gap-4 p-8 text-left transition-all duration-200 cursor-pointer flex-1"
                        style={{
                            background: active === 'ux' ? '#111111' : '#ffffff',
                            border: `1px solid ${active === 'ux' ? '#111111' : '#e5e2dc'}`,
                            boxShadow: active === 'ux' ? '0 8px 32px rgba(0,0,0,0.12)' : 'none',
                        }}
                    >
                        <MousePointer2 size={24} style={{ color: active === 'ux' ? '#ffffff' : '#111111' }} />
                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-bold" style={{ color: active === 'ux' ? '#ffffff' : '#111111' }}>
                                UX Research
                            </span>
                            <span className="text-sm" style={{ color: active === 'ux' ? 'rgba(255,255,255,0.65)' : '#888888' }}>
                                Research studies, usability testing, and process work
                            </span>
                        </div>
                        <ArrowRight size={16} style={{ color: active === 'ux' ? '#ffffff' : '#111111', marginTop: 'auto' }} />
                    </button>
                </div>

            </div>
        </div>
    );
}
