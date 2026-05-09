
export default function Footer() {
    return (
        <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 px-8 md:px-16 pt-16 pb-8 overflow-hidden w-full relative z-10">
            {/* Top row */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
                <span className="text-white/60 text-sm tracking-widest uppercase font-semibold">Creativity Reimagined</span>
                <div className="flex gap-16 text-sm font-medium text-white/70">
                    <div className="flex flex-col gap-1">
                        <a href="/#about" className="hover:text-white transition-colors cursor-pointer py-1">About</a>
                        <a href="/#experience" className="hover:text-white transition-colors cursor-pointer py-1">Experience</a>
                        <a href="/#education" className="hover:text-white transition-colors cursor-pointer py-1">Education</a>
                        <a href="/#chooser" className="hover:text-white transition-colors cursor-pointer py-1">Projects</a>
                    </div>
                    <div className="flex flex-col gap-1">
                        <a href="mailto:flennoy.bobby@gmail.com" className="hover:text-white transition-colors cursor-pointer py-1">Contact</a>
                        <a href="/dev-resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer py-1">Dev Resume</a>
                        <a href="/ux-resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer py-1">UX Resume</a>
                        <a href="https://linkedin.com/in/bobby-flennoy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer py-1">LinkedIn</a>
                    </div>
                </div>
            </div>

            {/* Big display name */}
            <div className="text-[clamp(3rem,12vw,10rem)] font-black leading-none tracking-tighter text-white opacity-90 -mx-2">
                Bobby Flennoy
            </div>

            {/* Bottom bar */}
            <div className="flex justify-between items-center mt-8 text-xs font-semibold tracking-wide text-white/40 uppercase">
                <div className="flex gap-4">
                    <a href="/#about" className="hover:text-white transition-colors cursor-pointer">About</a>
                    <a href="https://github.com/BobbyAl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
