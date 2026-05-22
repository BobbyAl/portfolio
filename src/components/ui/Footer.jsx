import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer style={{ background: '#f0ede8', borderTop: '1px solid #e5e2dc', padding: '64px 48px 32px', overflow: 'hidden', width: '100%' }}>
            {/* Top row */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8 max-w-6xl mx-auto">
                <span style={{ color: '#999999', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                    Creativity Reimagined
                </span>
                <div className="flex gap-16 text-sm" style={{ color: '#555555' }}>
                    <div className="flex flex-col gap-2">
                        {[
                            { href: '/#about',      label: 'About' },
                            { href: '/#experience', label: 'Experience' },
                            { href: '/#chooser',    label: 'Work' },
                        ].map(({ href, label }) => (
                            <a key={label} href={href} style={{ color: '#555555', textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                                onMouseLeave={e => e.currentTarget.style.color = '#555555'}
                            >{label}</a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        {[
                            { href: 'mailto:flennoy.bobby@gmail.com',              label: 'Contact' },
                            { href: '/dev-resume.pdf',                              label: 'Dev Resume',  target: '_blank' },
                            { href: '/ux-resume.pdf',                               label: 'UX Resume',   target: '_blank' },
                            { href: 'https://linkedin.com/in/bobby-flennoy',        label: 'LinkedIn',    target: '_blank' },
                        ].map(({ href, label, target }) => (
                            <a key={label} href={href} target={target} rel={target ? 'noopener noreferrer' : undefined}
                                style={{ color: '#555555', textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                                onMouseLeave={e => e.currentTarget.style.color = '#555555'}
                            >{label}</a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Big display name */}
            <div
                className="max-w-6xl mx-auto"
                style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#dddad5', marginLeft: '-4px' }}
            >
                Bobby Flennoy
            </div>

            {/* Bottom bar */}
            <div className="flex justify-between items-center mt-8 max-w-6xl mx-auto" style={{ borderTop: '1px solid #dddad5', paddingTop: '16px' }}>
                <span style={{ fontSize: '11px', color: '#aaaaaa' }}>
                    © {new Date().getFullYear()} Bobby Flennoy
                </span>
                <div className="flex gap-4 items-center">
                    <a href="mailto:flennoy.bobby@gmail.com" style={{ color: '#aaaaaa' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                        onMouseLeave={e => e.currentTarget.style.color = '#aaaaaa'}
                    ><Mail size={15} /></a>
                    <a href="https://linkedin.com/in/bobby-flennoy" target="_blank" rel="noopener noreferrer" style={{ color: '#aaaaaa' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                        onMouseLeave={e => e.currentTarget.style.color = '#aaaaaa'}
                    ><FaLinkedin size={15} /></a>
                    <a href="https://github.com/BobbyAl" target="_blank" rel="noopener noreferrer" style={{ color: '#aaaaaa' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                        onMouseLeave={e => e.currentTarget.style.color = '#aaaaaa'}
                    ><FaGithub size={15} /></a>
                </div>
            </div>
        </footer>
    );
}
