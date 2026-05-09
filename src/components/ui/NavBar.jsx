import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";
import Logo from "../../assets/logo-white.png"
import { ChevronDown } from "lucide-react";


export default function NavBar () {
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
            <div className="flex w-full max-w-5xl items-center justify-between gap-12 px-8 py-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
                <div className="flex items-center gap-8">
                    <a href="/" className="flex gap-2 items-center cursor-pointer">
                        <img src={Logo} alt="Logo" className="w-6 h-4 object-contain opacity-90 hover:opacity-100 transition-opacity" />
                    </a>
                    <div>
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
                </div>
                        
                <div className="flex gap-8">
                    <a href="mailto:flennoy.bobby@gmail.com" className="flex items-center text-white/70 hover:text-white transition-colors gap-2">
                        <FaMailBulk size={18}/>
                    </a>
                    <a href="https://linkedin.com/in/bobby-flennoy" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/70 hover:text-white transition-colors gap-2">
                        <FaLinkedin size={18}/>
                    </a>
                    <a href="https://github.com/BobbyAl" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/70 hover:text-white transition-colors gap-2">
                        <FaGithub size={18}/>
                    </a>
                </div>
            </div>
        </div>
    )
}