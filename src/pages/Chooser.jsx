import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, MousePointer2 } from "lucide-react";

// Distribute N points evenly across strokes with perpendicular scatter for thickness
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
    // First pass: build spine points with tangent info
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
            // tangent direction
            const tx = s[lo+1].x - s[lo].x;
            const ty = s[lo+1].y - s[lo].y;
            const tl = Math.sqrt(tx*tx + ty*ty) || 1;
            // normal (perpendicular)
            spine.push({ x, y, nx: -ty/tl, ny: tx/tl });
        }
    }
    while (spine.length < n) spine.push({ ...spine[spine.length - 1] });
    // Second pass: scatter each point perpendicular to the path
    const pts = [];
    for (let i = 0; i < n; i++) {
        const sp = spine[i];
        // Gaussian-ish offset: sum of randoms for bell-curve distribution
        const r = ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2;
        const offset = r * thickness;
        pts.push({
            x: sp.x + sp.nx * offset,
            y: sp.y + sp.ny * offset,
        });
    }
    return pts;
}

// Sample points along a circular arc
function arc(cx, cy, r, a0, a1, steps = 32) {
    const pts = [];
    for (let i = 0; i <= steps; i++) {
        const a = a0 + (a1 - a0) * (i / steps);
        pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    }
    return pts;
}

// </> — code brackets
function codeShape(W, H, n) {
    const cx = W/2, cy = H/2, sx = W*0.36, sy = H*0.42;
    const thick = Math.min(W, H) * 0.04;
    return buildShape([
        // <
        [{ x: cx-sx*0.52, y: cy-sy*0.72 }, { x: cx-sx, y: cy }, { x: cx-sx*0.52, y: cy+sy*0.72 }],
        // >
        [{ x: cx+sx*0.52, y: cy-sy*0.72 }, { x: cx+sx, y: cy }, { x: cx+sx*0.52, y: cy+sy*0.72 }],
        // /
        [{ x: cx+sx*0.20, y: cy+sy*0.72 }, { x: cx-sx*0.20, y: cy-sy*0.72 }],
    ], n, thick);
}

// UX shape: magnifying glass (circle + handle)
function uxShape(W, H, n) {
    const cx = W / 2, cy = H / 2;
    const r = Math.min(W, H) * 0.3;
    const PI = Math.PI;

    // Offset lens center up-left so the handle extends down-right
    const lx = cx - r * 0.2, ly = cy - r * 0.2;

    // Lens circle (full loop)
    const lens = arc(lx, ly, r, 0, PI * 2, 64);

    // Handle extending from bottom-right of circle at 45 degrees
    const angle = PI / 4;
    const hx0 = lx + r * Math.cos(angle);
    const hy0 = ly + r * Math.sin(angle);
    const hLen = r * 0.65;
    const handle = [
        { x: hx0, y: hy0 },
        { x: hx0 + hLen * Math.cos(angle), y: hy0 + hLen * Math.sin(angle) },
    ];

    // Small crosshair inside the lens for detail
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
    const stateRef  = useRef({ targets: null, activeKey: null });
    const shapesRef = useRef({ dev: null, ux: null });
    const [active, setActive] = useState(null);

    const setMode = useCallback((mode) => {
        setActive(mode);
        stateRef.current.activeKey = mode;
        stateRef.current.targets   = mode ? shapesRef.current[mode] : null;
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
            const { targets } = stateRef.current;

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
                ctx.globalAlpha = Math.min(1, p.alpha) * 0.9;
                ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            frameId = requestAnimationFrame(animate);
        }

        frameId = requestAnimationFrame(animate);
        return () => { cancelAnimationFrame(frameId); ro.disconnect(); };
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden py-32">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            {/* Ambient center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
            {/* Subtle ambient center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl h-[50%] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">What are you looking for?</h1>
                    <p className="text-lg text-white/60 max-w-md font-light">
                        Select a focus area to explore the work that matters to you.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onMouseEnter={() => setMode("dev")}
                        onMouseLeave={() => setMode(null)}
                        onClick={() => navigate("/dev")}
                        className={`flex items-center gap-3 px-8 py-4 rounded-full border text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer
                            ${active === "dev"
                                ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-105"
                                : "bg-white/5 text-white/80 border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-md"
                            }`}
                    >
                        <Code2 size={18} />
                        Development
                    </button>
                    <button
                        onMouseEnter={() => setMode("ux")}
                        onMouseLeave={() => setMode(null)}
                        onClick={() => navigate("/ux")}
                        className={`flex items-center gap-3 px-8 py-4 rounded-full border text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer
                            ${active === "ux"
                                ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-105"
                                : "bg-white/5 text-white/80 border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-md"
                            }`}
                    >
                        <MousePointer2 size={18} />
                        UX Research
                    </button>
                </div>
            </div>
        </div>
    );
}
