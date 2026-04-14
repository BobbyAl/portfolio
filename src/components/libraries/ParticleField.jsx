import { useRef, useEffect } from "react";

const COUNT          = 500;
const VISIBLE_RADIUS = 420;
const PEAK_RADIUS    = 240;
const REPULSE_RADIUS = 80;
const REPULSE_FORCE  = 3.5;
const SPRING         = 0.0006;
const FRICTION       = 0.97;
const SIZE_MIN       = 0.6;
const SIZE_MAX       = 2.2;
const WAVE_SPEED     = 7;
const WAVE_DECAY     = 0.96;
const WANDER_AMP     = 28;
const WANDER_SPEED   = 0.004;
// Auto-animate: virtual cursor takes over after this many ms of no mouse movement
const IDLE_DELAY_MS  = 2000;

export default function ParticleField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function buildParticles() {
            const cols = Math.ceil(Math.sqrt(COUNT * (canvas.width / canvas.height)));
            const rows = Math.ceil(COUNT / cols);
            const spacingX = canvas.width / cols;
            const spacingY = canvas.height / rows;
            return Array.from({ length: COUNT }, (_, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                const hx = (col + 0.5 + (Math.random() - 0.5) * 0.8) * spacingX;
                const hy = (row + 0.5 + (Math.random() - 0.5) * 0.8) * spacingY;
                return {
                    x: hx, y: hy,
                    homeX: hx, homeY: hy,
                    vx: 0, vy: 0,
                    wanderAngle: Math.random() * Math.PI * 2,
                    wanderPhase: Math.random() * Math.PI * 2,
                    wanderSpeed: WANDER_SPEED * (0.5 + Math.random() * 1.0),
                    wanderAmp: WANDER_AMP * (0.4 + Math.random() * 0.9),
                    excitement: 0,
                    alpha: 0,
                };
            });
        }

        let particles = buildParticles();

        function handleResize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = buildParticles();
        }
        window.addEventListener("resize", handleResize);

        const mouse = { x: -9999, y: -9999 };
        const mouseVel = { x: 0, y: 0 };
        let lastMouseMoveTime = 0;

        function handleMouseMove(e) {
            mouseVel.x = e.clientX - mouse.x;
            mouseVel.y = e.clientY - mouse.y;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            lastMouseMoveTime = Date.now();
        }
        function handleMouseLeave() {
            mouse.x = -9999; mouse.y = -9999;
            mouseVel.x = 0; mouseVel.y = 0;
        }
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        const waves = [];
        // Virtual cursor — smoothly lerps toward its target
        const vCursor = { x: canvas.width / 2, y: canvas.height / 2 };
        let frameId;
        let startTime = null;

        function animate(ts) {
            if (!startTime) startTime = ts;
            const elapsed = (ts - startTime) / 1000; // seconds

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const isIdle = Date.now() - lastMouseMoveTime > IDLE_DELAY_MS;

            // Compute destination for vCursor
            let destX, destY;
            if (!isIdle && mouse.x > 0) {
                // Real mouse active — destination is actual cursor
                destX = mouse.x;
                destY = mouse.y;
            } else {
                // Idle — destination is a slow figure-8 across the viewport
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;
                const rx = canvas.width * 0.28;
                const ry = canvas.height * 0.22;
                destX = cx + Math.sin(elapsed * 0.4) * rx;
                destY = cy + Math.sin(elapsed * 0.8) * ry;
            }

            // vCursor always lerps — seamless handoff in both directions
            const followSpeed = isIdle ? 0.02 : 0.08;
            vCursor.x += (destX - vCursor.x) * followSpeed;
            vCursor.y += (destY - vCursor.y) * followSpeed;
            const activeCursor = { x: vCursor.x, y: vCursor.y };

            // Waves from real mouse movement only
            if (!isIdle && mouse.x > 0) {
                const speed = Math.sqrt(mouseVel.x ** 2 + mouseVel.y ** 2);
                if (speed > 1.5) {
                    waves.push({ x: mouse.x, y: mouse.y, radius: 0, strength: Math.min(1, speed / 20) });
                }
            }
            if (waves.length > 30) waves.splice(0, waves.length - 30);
            for (const w of waves) { w.radius += WAVE_SPEED; w.strength *= WAVE_DECAY; }
            for (let i = waves.length - 1; i >= 0; i--) {
                if (waves[i].strength < 0.01 || waves[i].radius > VISIBLE_RADIUS * 1.5) waves.splice(i, 1);
            }

            for (const p of particles) {
                const hdx = p.homeX - activeCursor.x;
                const hdy = p.homeY - activeCursor.y;
                const homeDist = Math.sqrt(hdx * hdx + hdy * hdy);

                const cursorAlpha = homeDist < VISIBLE_RADIUS ? 1 : 0;

                for (const w of waves) {
                    const wdx = p.homeX - w.x;
                    const wdy = p.homeY - w.y;
                    const wDist = Math.sqrt(wdx * wdx + wdy * wdy);
                    const ringDiff = Math.abs(wDist - w.radius);
                    if (ringDiff < 40) {
                        const hit = (1 - ringDiff / 40) * w.strength;
                        if (hit > p.excitement) p.excitement = hit;
                    }
                }
                p.excitement *= 0.97;

                const targetAlpha = Math.max(cursorAlpha, p.excitement);
                p.alpha += (targetAlpha - p.alpha) * 0.015;

                p.wanderPhase += p.wanderSpeed;
                if (p.alpha < 0.008) continue;

                const wanderOffset = Math.sin(p.wanderPhase) * p.wanderAmp;
                const wanderX = p.homeX + Math.cos(p.wanderAngle) * wanderOffset;
                const wanderY = p.homeY + Math.sin(p.wanderAngle) * wanderOffset;

                p.vx += (wanderX - p.x) * SPRING;
                p.vy += (wanderY - p.y) * SPRING;

                // Repulsion from active cursor
                const dx = p.x - activeCursor.x;
                const dy = p.y - activeCursor.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < REPULSE_RADIUS && dist > 0) {
                    const force = (1 - dist / REPULSE_RADIUS) * REPULSE_FORCE;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }

                // Wave impulse
                for (const w of waves) {
                    const wdx = p.x - w.x;
                    const wdy = p.y - w.y;
                    const wDist = Math.sqrt(wdx * wdx + wdy * wdy);
                    const ringDiff = Math.abs(wDist - w.radius);
                    if (ringDiff < 40 && wDist > 0) {
                        const impulse = (1 - ringDiff / 40) * w.strength * 1.8;
                        p.vx += (wdx / wDist) * impulse;
                        p.vy += (wdy / wDist) * impulse;
                    }
                }

                p.vx *= FRICTION;
                p.vy *= FRICTION;
                p.x += p.vx;
                p.y += p.vy;

                const innerT = Math.min(1, homeDist / PEAK_RADIUS);
                const outerT = Math.min(1, Math.max(0, (homeDist - PEAK_RADIUS) / (VISIBLE_RADIUS - PEAK_RADIUS)));
                const bellSize = innerT < 1
                    ? SIZE_MIN + (SIZE_MAX - SIZE_MIN) * Math.pow(innerT, 1.2)
                    : SIZE_MAX + (SIZE_MIN - SIZE_MAX) * Math.pow(outerT, 0.8);

                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(0.3, bellSize), 0, Math.PI * 2);
                ctx.globalAlpha = Math.min(1, p.alpha);
                ctx.fillStyle = "#148EFF";
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            frameId = requestAnimationFrame(animate);
        }

        frameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
}
