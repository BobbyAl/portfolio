import { Terminal, Mic, ChevronDown, Component, Code, Target } from "lucide-react"
import ScrambledText from "../components/libraries/ScrambledText";
import { useState } from "react";
import TextType from "../components/libraries/TextType";

export default function Hero() {

    const [search, setSearch] = useState("");

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto gap-8">
            <div className="flex flex-col gap-2 items-center">
                
                <span className="text-3xl font-light text-black/50">Hey, Stranger</span>
                <TextType
                    text={["Where should we begin?", "What do you want to know?", "Ask me anything"]}
                    typingSpeed={100}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="|"
                    className="text-5xl"
                >

                </TextType>
            </div>
            <div className="
                border border-black rounded-full
                bg-gray-300/10 backdrop-blur-sm"
            >
                <div className="flex justify-between p-6"> 
                    <div className="flex gap-4 flex-1">
                        <Terminal/>
                        <input
                            type="text"
                            placeholder="Hi, I'm Bobby, ask about my projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 bg-transparent outline-none"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex gap-1">
                            Thinking 
                            <ChevronDown />
                        </div>
                        <Mic/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <span className="uppercase text-lg text-black font-bold">Choose a Path...</span>
               <div className="flex gap-2 justify-center">
                    <button className="flex gap-2 px-6 py-2 text-md border border-black rounded-full bg-gray-300/15 backdrop-blur-sm">
                        <Component />
                        <span>UX Research</span>
                    </button>
                    <button className="flex gap-2 px-6 py-2 text-md border border-black rounded-full bg-gray-300/15 backdrop-blur-sm">
                        <Code />
                        <span>Software</span>
                    </button>
                    <button className="flex gap-2 px-6 py-2 text-md border border-black rounded-full bg-gray-300/15 backdrop-blur-sm">
                        <Target />
                        <span>Product</span>
                    </button>
               </div>

            </div>
        </div>
    )
}