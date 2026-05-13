import Marquee from "../components/ui/Marquee";
import TextType from "../components/libraries/TextType";
import ProfileImage from "../assets/img.webp"
import { Sparkles } from "lucide-react";

export default function AboutMe() {
    return (
        <div className="flex flex-col w-full gap-24 py-24">
            <div className="w-full opacity-60"><Marquee /></div>

            <div className="flex flex-col w-full max-w-6xl mx-auto gap-24 md:gap-48 px-6">

                {/* Punchy typed intro — short enough to resolve before the user scrolls past it */}
                <TextType
                    text={["I'm Bobby Flennoy. I research how people think — then I build for it."]}
                    typingSpeed={45}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="|"
                    loop={false}
                    className="flex-1 max-w-4xl text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white/90"
                />

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
                    <div className="flex flex-col gap-8 flex-1">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                                Most researchers find problems.<br />I find them, then ship the fix.
                            </h2>
                            <p className="text-lg md:text-xl leading-relaxed text-white/60 max-w-xl font-light">
                                My Cognitive Neuroscience background isn't a credential I'm carrying — it's how I think 
                                about building. I took the classes that explain why attention works, why cognitive load 
                                matters, and what actually drives behavior. That shows up in both directions: when I'm 
                                researching, I understand the human side of every data point. When I'm building 
                                full-stack applications, I think about the person on the other end of every interaction. 
                                I'm a developer who researches before building and a researcher who ships what they find — 
                                and the loop between those two is where I do my best work.
                            </p>
                        </div>
                        <button
                            onClick={() => document.getElementById('chooser')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 transition-colors px-6 py-3 rounded-full w-fit"
                        >
                            <Sparkles size={18} />
                            <span className="font-semibold">Explore My Work</span>
                        </button>
                    </div>

                    {/* Profile image — fixed gradient classes */}
                    <div className="relative group w-full max-w-xs md:max-w-md shrink-0">
                        <div className="absolute -inset-2 bg-gradient-to-br from-white/5 via-white/10 to-transparent rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
                        <div className="bg-[#111] border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden w-full h-full shadow-2xl relative z-10" style={{ aspectRatio: '3/4' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                            <img
                                src={ProfileImage}
                                className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}