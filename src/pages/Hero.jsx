import { FolderGit2, Mail, ArrowRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
export default function Hero() {

    return (
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 flex flex-col justify-center min-h-screen">

            {/* Eyebrow */}
            <p
                className="text-sm font-semibold uppercase tracking-[0.2em] mb-6"
                style={{ color: '#999999', animationDelay: '0ms', animation: 'fadeUp 0.6s ease forwards', opacity: 0 }}
            >
                <span style={{ color: '#158EFF', marginRight: '8px' }}>●</span>UX Researcher &amp; Software Engineer
            </p>

            {/* Big name */}
            <h1
                className="font-bold leading-none tracking-tight"
                style={{
                    fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                    color: '#111111',
                    animation: 'fadeUp 0.7s ease forwards',
                    animationDelay: '100ms',
                    opacity: 0,
                    lineHeight: 0.95,
                }}
            >
                Bobby<br />
                <span style={{ color: '#111111' }}>Flennoy</span>
            </h1>

            {/* Horizontal rule */}
            <div
                style={{
                    height: '3px',
                    background: '#158EFF',
                    marginTop: '32px',
                    marginBottom: '28px',
                    width: '80px',
                    animation: 'fadeUp 0.7s ease forwards',
                    animationDelay: '200ms',
                    opacity: 0,
                }}
            />

            {/* Tagline */}
            <p
                className="text-lg md:text-xl max-w-xl leading-relaxed"
                style={{
                    color: '#555555',
                    animation: 'fadeUp 0.7s ease forwards',
                    animationDelay: '300ms',
                    opacity: 0,
                }}
            >
                I love understanding people. How they think, what they notice,
                why they make the choices they do. Then I design and build
                experiences that actually reflect that understanding.
            </p>

            {/* CTA row */}
            <div
                className="flex flex-wrap gap-4 mt-10 items-center"
                style={{ animation: 'fadeUp 0.7s ease forwards', animationDelay: '420ms', opacity: 0 }}
            >
                <button
                    onClick={() => document.getElementById('chooser')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-80 active:scale-95"
                    style={{ background: '#158EFF', color: '#ffffff' }}
                >
                    <FolderGit2 size={15} />
                    View My Work
                </button>

                <button
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border transition-all duration-200 hover:bg-black/5 active:scale-95"
                    style={{ borderColor: '#cccccc', color: '#111111', background: 'transparent' }}
                >
                    About Me
                    <ArrowRight size={14} />
                </button>
            </div>

            {/* Social links */}
            <div
                className="flex gap-6 mt-10 items-center"
                style={{ animation: 'fadeUp 0.7s ease forwards', animationDelay: '520ms', opacity: 0 }}
            >
                <a
                    href="mailto:flennoy.bobby@gmail.com"
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-60"
                    style={{ color: '#777777', textDecoration: 'none' }}
                >
                    <Mail size={14} />
                    Email
                </a>
                <a
                    href="https://linkedin.com/in/bobby-flennoy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-60"
                    style={{ color: '#777777', textDecoration: 'none' }}
                >
                    <FaLinkedin size={14} />
                    LinkedIn
                </a>
                <a
                    href="/ux-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:opacity-60"
                    style={{ color: '#777777', textDecoration: 'none' }}
                >
                    Resume ↗
                </a>
            </div>

            {/* Scroll hint */}
            <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity hover:opacity-60"
                style={{ color: '#aaaaaa', background: 'none', border: 'none', cursor: 'pointer', animation: 'fadeUp 0.7s ease forwards', animationDelay: '700ms', opacity: 0, position: 'absolute' }}
            >
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'inherit' }}>Scroll</span>
                <div style={{ width: '1px', height: '32px', background: '#cccccc' }} />
            </button>
        </div>
    );
}
