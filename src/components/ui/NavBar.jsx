import ShinyText from "../libraries/ShinyText"
import { Command, AtSign } from "lucide-react"
import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";


export default function NavBar () {
    return (
        <div className="flex w-full items-center justify-between gap-12 px-16 py-4">
            <div className="flex items-center gap-2">
                <Command />
                <ShinyText
                    text="Bobby Flennoy"
                    speed={5}
                    color="#282828"
                    shineColor="#ffffff"
                    spread={120}
                    className="text-lg font-medium tracking-tight"
                />
            </div>
            <div>
                <ul className="flex gap-12 text-md text-black/75">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Skills</a></li>
                    <li><a href="#">Education</a></li>
                    <li><a href="#">Experience</a></li>
                    <li><a href="#">Projects</a></li>
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