import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";
import { Mail, ChevronDown } from "lucide-react";
import Logo from "../../assets/logo-white.png";
import { useState, useRef, useEffect } from "react";

function MobileDropdown({ label, align = "left", children }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1 text-sm font-medium transition-colors outline-none cursor-pointer"
                style={{ color: '#555555' }}
            >
                {label}
                <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className={`absolute top-full mt-3 ${align === "right" ? "right-0" : "left-0"} z-50`}>
                    <div
                        className="flex flex-col min-w-44 shadow-lg border p-1"
                        style={{ background: '#ffffff', borderColor: '#e5e5e5' }}
                        onClick={() => setOpen(false)}
                    >
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

function Item({ href, target, children }) {
    return (
        <a
            href={href}
            target={target}
            rel={target ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
            style={{ color: '#333333', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
            {children}
        </a>
    );
}

export default function NavBar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50" style={{ background: '#f8f7f4', borderBottom: '1px solid #e5e2dc' }}>
            <div className="flex w-full max-w-6xl mx-auto items-center justify-between px-6 md:px-12 py-4">

                {/* Logo */}
                <a href="/" className="flex items-center cursor-pointer shrink-0">
                    {/* Use text logo since the asset is white */}
                    <span style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '-0.03em', color: '#111111' }}>BF</span>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { href: '/#about',      label: 'About' },
                        { href: '/#experience', label: 'Experience' },
                        { href: '/#chooser',    label: 'Work' },
                    ].map(({ href, label }) => (
                        <a
                            key={label}
                            href={href}
                            className="text-sm font-medium transition-colors"
                            style={{ color: '#555555', textDecoration: 'none' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                            onMouseLeave={e => e.currentTarget.style.color = '#555555'}
                        >
                            {label}
                        </a>
                    ))}

                    {/* Resume dropdown */}
                    <div className="relative group">
                        <button
                            className="flex items-center gap-1 text-sm font-medium transition-colors outline-none cursor-pointer"
                            style={{ color: '#555555', background: 'none', border: 'none' }}
                        >
                            Resume <ChevronDown size={13} />
                        </button>
                        <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" style={{ zIndex: 50 }}>
                            <div className="flex flex-col w-52 shadow-lg border p-1" style={{ background: '#ffffff', borderColor: '#e5e5e5' }}>
                                <DropItem href="/dev-resume.pdf" target="_blank">Software Engineering</DropItem>
                                <DropItem href="/ux-resume.pdf" target="_blank">UX Research</DropItem>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop right — icons + CTA */}
                <div className="hidden md:flex items-center gap-6">
                    <a href="https://linkedin.com/in/bobby-flennoy" target="_blank" rel="noopener noreferrer"
                        style={{ color: '#888888', textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                        onMouseLeave={e => e.currentTarget.style.color = '#888888'}
                    >
                        <FaLinkedin size={16} />
                    </a>
                    <a href="https://github.com/BobbyAl" target="_blank" rel="noopener noreferrer"
                        style={{ color: '#888888', textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                        onMouseLeave={e => e.currentTarget.style.color = '#888888'}
                    >
                        <FaGithub size={16} />
                    </a>
                    <a
                        href="mailto:flennoy.bobby@gmail.com"
                        className="text-sm font-semibold px-5 py-2 transition-opacity hover:opacity-75"
                        style={{ background: '#158EFF', color: '#ffffff', textDecoration: 'none' }}
                    >
                        Contact
                    </a>
                </div>

                {/* Mobile dropdowns */}
                <div className="flex md:hidden items-center gap-4">
                    <MobileDropdown label="Menu" align="right">
                        <Item href="/#about">About</Item>
                        <Item href="/#experience">Experience</Item>
                        <Item href="/#chooser">Work</Item>
                        <Item href="/dev-resume.pdf" target="_blank">Resume — Software</Item>
                        <Item href="/ux-resume.pdf" target="_blank">Resume — UX</Item>
                        <Item href="mailto:flennoy.bobby@gmail.com"><Mail size={13} /> Email</Item>
                        <Item href="https://linkedin.com/in/bobby-flennoy" target="_blank"><FaLinkedin size={13} /> LinkedIn</Item>
                        <Item href="https://github.com/BobbyAl" target="_blank"><FaGithub size={13} /> GitHub</Item>
                    </MobileDropdown>
                </div>
            </div>
        </div>
    );
}

function DropItem({ href, target, children }) {
    return (
        <a
            href={href}
            target={target}
            rel={target ? "noopener noreferrer" : undefined}
            className="px-4 py-2.5 text-sm transition-colors"
            style={{ color: '#333333', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
            {children}
        </a>
    );
}
