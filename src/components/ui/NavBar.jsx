import { Command, AtSign } from "lucide-react"
import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";
import ScrambledText from "../libraries/ScrambledText";


export default function NavBar () {
    return (
        <div className="flex w-full items-center justify-between gap-12 px-16 py-4">
            <div className="flex items-center gap-2">
                <Command />
                <ScrambledText
                    radius={15}
                    duration={2}
                    speed={2}
                    scrambleChars=".:" 
                    className="font-medium text-xl"
                >
                    Bobby Flennoy
                </ScrambledText>
            </div>
            <div>
                <ul className="flex gap-12 text-md text-black/75">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Education</a></li>
                    <li><a href="#">Extracurriculars</a></li>
                </ul>
            </div>
            <div className="flex gap-12">
                <div className="flex flex-col items-center">
                    <a href="#"><FaMailBulk /></a>
                    <span className="text-xs">Email</span>
                </div>
                <div className="flex flex-col items-center">
                    <a href="#"><FaLinkedin /></a>
                    <span className="text-xs">Linkedin</span>
                </div>
                <div className="flex flex-col items-center">
                    <a href="#"><FaGithub /></a>
                    <span className="text-xs">GitHub</span>
                </div>
            </div>
        </div>
    )
}