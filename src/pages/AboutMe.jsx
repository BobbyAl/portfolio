import { ArrowBigRightIcon } from "lucide-react";
import Card from "../components/ui/Card";
import LogoLoop from "../components/libraries/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';


const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

export default function AboutMe () {
    return (
       <div className="flex w-full max-w-5xl">
            <Card />
            <section >
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-6xl">Transforming Your Ideas into Reality</h1>
                        <p className="text-2xl">Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.</p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <div className="flex flex-col max-w-3xs">
                                <span className="text-6xl font-bold">12+</span>
                                <span className="text-2xl uppercase">Years of Experience</span>
                            </div>
                            <div className="flex flex-col max-w-3xs">
                                <span className="text-6xl font-bold">46+</span>
                                <span className="text-2xl uppercase">Projects Completed</span>
                            </div>
                            <div className="flex flex-col max-w-3xs">
                                <span className="text-6xl font-bold">20+</span>
                                <span className="text-2xl uppercase">Worldwide Clients</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-[#148EFF] text-white px-16 py-3 rounded-xl">Let's Talk</button>
                        <button className="flex ">
                            <span>My Work</span>
                            <ArrowBigRightIcon />
                        </button>
                    </div>
                    <div>
                        <span>Tech stack used throughout projects</span>
                        <div className="max-w-xl h-12 relative overflow-hidden">
                            <LogoLoop
                                logos={techLogos}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}