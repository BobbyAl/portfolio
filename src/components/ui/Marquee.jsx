import {
    Code2, Terminal, GitBranch, Layers, Monitor,
    Pencil, Search, Users, BarChart2, FlaskConical, Sparkles
} from "lucide-react";

const icons = [
    { icon: Code2,        label: "Code" },
    { icon: Terminal,     label: "Terminal" },
    { icon: GitBranch,    label: "Git" },
    { icon: Layers,       label: "Design" },
    { icon: Monitor,      label: "Frontend" },
    { icon: Pencil,       label: "Sketch" },
    { icon: Search,       label: "Research" },
    { icon: Users,        label: "Users" },
    { icon: BarChart2,    label: "Data" },
    { icon: FlaskConical, label: "Testing" },
    { icon: Sparkles,     label: "Polish" },
];

function IconPill({ icon: Icon, label }) {
    return (
        <div className="flex flex-col items-center gap-1 mx-3">
            <div className="w-24 h-24 rounded-full border border-black bg-gray-300/10 backdrop-blur-sm flex items-center justify-center">
                <Icon size={24} strokeWidth={1.5} />
            </div>
        </div>
    );
}
export default function Marquee() {
    return (
        <div className="w-full overflow-hidden py-8">
            <div className="flex w-max animate-marquee">
                {[...icons, ...icons].map((item, i) => (
                    <div
                        key={i}
                        style={{
                            animation: `bob 3s ease-in-out infinite`,
                            animationDelay: `${(i % icons.length) * 0.15}s`,
                        }}
                    >
                        <IconPill icon={item.icon} label={item.label} />
                    </div>
                ))}
            </div>
        </div>
    );
}