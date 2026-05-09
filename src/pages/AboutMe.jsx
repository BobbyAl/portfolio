import Marquee from "../components/ui/Marquee";
import TextType from "../components/libraries/TextType";
import ProfileImage from "../assets/img.webp"


import { Sparkles } from "lucide-react";



export default function AboutMe () {
    return (
        
        <div className="flex flex-col w-full gap-24 py-24">
            <div className="w-full opacity-60"><Marquee /></div>
            <div className="flex flex-col w-full max-w-6xl mx-auto gap-24 md:gap-48 px-6">
                <TextType
                    text={["I’m Bobby Flennoy. I spend my time at the messy intersection of code and cognition—building things that actually make sense to the human brain."]}
                    typingSpeed={50}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="|"
                    loop={false}
                    className="flex-1 max-w-4xl text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white/90"
                
                >    
                </TextType>

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
                    <div className="flex flex-col gap-8 flex-1">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                                AI should be an extension, not a replacement.
                            </h2>
                            <p className="text-lg md:text-xl leading-relaxed text-white/60 max-w-xl font-light">
                                As a CS and Neuroscience student, I’m not interested in building machines that force us to change how we think. My goal is to design interactions where the AI adapts to our nuances—complementing our creativity and making the tech feel like a seamless partner instead of just another tool we have to learn.
                            </p>
                        </div>
                        <button
                            onClick={() => document.getElementById('chooser')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 transition-colors px-6 py-3 rounded-full w-fit"
                        >
                            <Sparkles size={18}/>
                            <span className="font-semibold">Explore My Work</span>
                        </button>
                    </div>
                    <div className="relative group w-full max-w-xs md:max-w-md shrink-0">
                        <div className="absolute -inset-2  from-white/5 via-white/10 to-transparent rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
                        <div className="bg-[#111] border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden w-full h-full shadow-2xl relative z-10" style={{ aspectRatio: '3/4' }}>
                            <div className="absolute inset-0  from-black/80 via-black/20 to-transparent z-10"></div>
                            <img src={ProfileImage} className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                        </div>
                    </div>
                </div>
                

            </div>
            
        </div>
    );
}
