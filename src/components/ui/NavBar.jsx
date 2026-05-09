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
                className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors outline-none cursor-pointer"
            >
                {label}
                <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className={`absolute top-full mt-4 ${align === "right" ? "right-0" : "left-0"} z-50`}>
                    <div className="flex flex-col min-w-44 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-1.5" onClick={() => setOpen(false)}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

function Item({ href, target, children }) {
    return (
        <a href={href} target={target} rel={target ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm rounded-xl"
        >
            {children}
        </a>
    );
}

export default function NavBar() {
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
            <div className="flex w-full max-w-5xl items-center justify-between px-5 py-3 md:px-8 md:py-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">

                {/* Logo + desktop links grouped left */}
                <div className="flex items-center gap-12">
                    <a href="/" className="flex items-center cursor-pointer shrink-0">
                        <img src={Logo} alt="Logo" className="w-6 h-4 object-contain opacity-90 hover:opacity-100 transition-opacity" />
                    </a>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-8 text-sm text-white/80 font-medium tracking-wide">
                            <li><a href="/#about" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="/#experience" className="hover:text-white transition-colors">Experience</a></li>
                            <li><a href="/#chooser" className="hover:text-white transition-colors">Projects</a></li>
                            <li className="relative group">
                                <button className="flex items-center gap-1 hover:text-white transition-colors outline-none cursor-pointer">
                                    Resume <ChevronDown size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                </button>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                    <div className="flex flex-col w-48 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-1.5">
                                        <a href="/dev-resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm rounded-xl">Software Engineering</a>
                                        <a href="/ux-resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm rounded-xl">UX Research</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile dropdowns */}
                    <div className="flex md:hidden items-center gap-4">
                        <MobileDropdown label="Explore" align="left">
                            <Item href="/#about">About</Item>
                            <Item href="/#experience">Experience</Item>
                            <Item href="/#education">Education</Item>
                            <Item href="/#extracurriculars">Extracurriculars</Item>
                            <Item href="/#chooser">Projects</Item>
                            <div className="border-t border-white/10 my-1" />
                            <Item href="/dev-resume.pdf" target="_blank">Resume — Software</Item>
                            <Item href="/ux-resume.pdf" target="_blank">Resume — UX</Item>
                        </MobileDropdown>
                        <MobileDropdown label="Connect" align="left">
                            <Item href="mailto:flennoy.bobby@gmail.com"><Mail size={13} /> Email me</Item>
                            <Item href="https://linkedin.com/in/bobby-flennoy" target="_blank"><FaLinkedin size={13} /> LinkedIn</Item>
                            <Item href="https://github.com/BobbyAl" target="_blank"><FaGithub size={13} /> GitHub</Item>
                        </MobileDropdown>
                    </div>
                </div>

                {/* Desktop icons — right side */}
                <div className="hidden md:flex gap-8">
                    <a href="mailto:flennoy.bobby@gmail.com" className="flex items-center text-white/70 hover:text-white transition-colors"><FaMailBulk size={18} /></a>
                    <a href="https://linkedin.com/in/bobby-flennoy" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/70 hover:text-white transition-colors"><FaLinkedin size={18} /></a>
                    <a href="https://github.com/BobbyAl" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/70 hover:text-white transition-colors"><FaGithub size={18} /></a>
                </div>

            </div>
        </div>
    );
}
