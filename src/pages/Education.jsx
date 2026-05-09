import { Binary, Bot, Layers, Database, MousePointer, FolderKanban, Network, Cpu, Scale, Microscope, Brain, Zap, Dna, Code } from "lucide-react";

const blocks = [
    {
        title: "Computer Science",
        subtitle: "Bachelors of Science",
        icon: <Code size={32} strokeWidth={3} />,
        items: [
            { icon: <Binary size={16} />,       label: "Algorithms & Data Structures" },
            { icon: <Bot size={16} />,           label: "Artificial Intelligence" },
            { icon: <Layers size={16} />,        label: "Object-Oriented Programming" },
            { icon: <Database size={16} />,      label: "Databases" },
            { icon: <MousePointer size={16} />,  label: "Human-Computer Interaction" },
            { icon: <FolderKanban size={16} />,  label: "Software Project Management" },
        ],
    },
    {
        title: "Neuroscience",
        subtitle: "Minor",
        icon: <Brain size={32} strokeWidth={3}/>,
        items: [
            { icon: <Microscope size={16} />, label: "Cognitive Processes" },
            { icon: <Brain size={16} />,      label: "Brain & Behavior" },
            { icon: <Zap size={16} />,        label: "Behavior & Motivation" },
            { icon: <Dna size={16} />,        label: "Principles of Neuroscience" },
            { icon: <Network size={16} />,    label: "Behavioral Genetics" },
            { icon: <Scale size={16} />,      label: "Intro to Psychology" },
        ],
    },
];

function Block({ title, subtitle, icon, items }) {
    return (
        <div className="flex flex-col rounded-3xl bg-white/5 shadow-2xl border border-white/10 w-full hover:border-white/20 transition-colors">
            <div className="flex justify-between px-8 pt-8 pb-6 gap-1">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white/90 tracking-tight">{title}</span>
                    <span className="text-xs text-white/50 uppercase tracking-widest font-semibold mt-1">{subtitle}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                    {icon}
                </div>
            </div>
            <div className="border-t border-white/10 mx-8" />
            <div className="flex flex-col px-5 py-4">
                {items.map((item) => (
                    <div key={item.label} className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/10 transition-colors duration-200 group cursor-default">
                        <span className="text-white/40 group-hover:text-white transition-colors duration-200 shrink-0">{item.icon}</span>
                        <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Education() {
    return (
        <div className="flex flex-col w-full max-w-6xl items-center gap-20 py-32 px-6 mx-auto">
            <div className="flex flex-col items-center gap-1">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Education</h1>
                <h2 className="text-xl md:text-2xl font-medium text-white/70">University of Texas at Arlington</h2>
                <div className="flex flex-wrap justify-center items-center gap-3 mt-3">
                    <span className="uppercase tracking-widest text-xs font-semibold text-white/50">B.S. Computer Science</span>
                    <span className="text-white/20 hidden md:block">·</span>
                    <span className="uppercase tracking-widest text-xs font-semibold text-white/50">Neuroscience Minor</span>
                    <span className="text-white/20 hidden md:block">·</span>
                    <span className="uppercase tracking-widest text-xs font-semibold text-white/40">Expected Aug. 2026</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start w-full">
                {blocks.map((block) => (
                    <Block key={block.title} {...block} />
                ))}
            </div>
        </div>
    );
}
