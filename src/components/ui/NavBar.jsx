import { Command, AtSign } from "lucide-react"
import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";
import ScrambledText from "../libraries/ScrambledText";


export default function NavBar () {
    return (
        <div className="flex w-full items-baseline justify-between gap-12 px-16 py-4">
            <div className="flex items-baseline gap-16">
                <div className="flex items-center gap-2">
                    <Command size={14} />
                    <ScrambledText
                        radius={15}
                        duration={2}
                        speed={2}
                        scrambleChars=".:" 
                        className="font-medium text-lg"
                    >
                        Bobby Flennoy
                    </ScrambledText>
                </div>
                <div>
                    <ul className="flex gap-8 text-md text-black/50">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Resume</a></li>
                        <li><a href="#">Extracurriculars</a></li>
                    </ul>
                </div>
            </div>
                    
            <div className="flex gap-12">
                <a href="#" className="flex flex-col items-center text-[#148EFF]">
                    <FaMailBulk />
                    <span className="text-xs">Email</span>
                </a>
                <a href="#" className="flex flex-col items-center text-[#148EFF]">
                    <FaLinkedin />
                    <span className="text-xs">Linkedin</span>
                </a>
                <a href="#" className="flex flex-col items-center text-[#148EFF]">
                    <FaGithub />
                    <span className="text-xs">GitHub</span>
                </a>
            </div>
        </div>
    )
}