import Marquee from "../components/ui/Marquee";
import ProfileImage from "../assets/profile-no-bg.png"

import { Sparkles } from "lucide-react";



export default function AboutMe () {
    return (
        
        <div className="flex flex-col w-full gap-32">
            <Marquee />
            <div className="flex flex-col w-full max-w-7xl mx-auto gap-64">
                <h1 className="font-semibold text-6xl max-w-3xl flex-1">
                    My name is Bobby Flennoy. I am a CS/Neuro major @ The University of Texas at Arlington.
                </h1>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-5xl font-medium max-w-xl">
                            Human-Centered AI
                        </h2>
                        <p className="text-xl tracking-wide text-gray-600 max-w-xl">
                            Currently a senior at UTA, I have an interest in HCAI (Human-Centered AI) and Affective Computing. 
                            My work focuses on how AI can be better aligned with human cognition to solve real-world problems.
                        </p>
                        <button className="flex items-center justify-center gap-2 bg-gray-300/10 border border-black px-5 py-3 rounded-full max-w-3xs">
                            <Sparkles size={16}/>
                            <span className="font-semibold">Explore AI Projects</span>
                        </button>
                    </div>
                    <div className="border border-black bg-gray-300/10 backdrop-blur-sm rounded-4xl overflow-hidden w-lg shrink-0" style={{ aspectRatio: '3/4' }}>
                        <img src={ProfileImage} className="w-full h-full object-cover object-top rounded-sm" />
                    </div>
                </div>
                

            </div>
            
        </div>
    );
}