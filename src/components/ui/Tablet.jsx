import { Terminal, Mic, ChevronDown, User, CirclePlay, Camera } from "lucide-react"

export default function Tablet() {
    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto gap-8">
            <div className="flex flex-col gap-2">
                <span className="text-3xl font-light">Hey, Stranger</span>
                <span className="text-5xl">Where should we begin?</span>
            </div>
            <div className="
                border border-black rounded-full
                bg-gray-300/10 backdrop-blur-sm"
            >
                <div className="flex justify-between p-8"> 
                    <div className="flex gap-4">
                        <Terminal/>
                        <span>I am Bobby Flennoy</span>
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
            <div className="flex gap-4">
                <button className="flex gap-2 px-8 py-4 border border-black rounded-full bg-gray-300/15 backdrop-blur-2xl">
                    <Camera />
                    <span>Photo Gallery</span>
                </button>
                <button className="flex gap-2 px-8 py-4 border border-black rounded-full bg-gray-300/15 backdrop-blur-2xl">
                    <CirclePlay />
                    <span>My Playlist</span>
                </button>

            </div>
        </div>
    )
}