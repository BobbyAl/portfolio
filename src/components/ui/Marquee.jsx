

import {
    FaReact, FaFigma, FaHtml5, FaCss3
} from "react-icons/fa";

import {
    SiTailwindcss, SiNextdotjs, SiSupabase, SiPostgresql, SiJavascript, SiTypescript, SiSurveymonkey
} from "react-icons/si";
    
    

/* React, Tailwind, Next.js, Supabase, Postgresql, Figma, HTML, CSS, Javascript, Typescript, Qualtrics*/

const icons = [
    { icon: FaReact,        label: "React" },
    { icon: SiTailwindcss,     label: "Tailwind" },
    { icon: SiNextdotjs,    label: "Next" },
    { icon: SiSupabase,       label: "Supabase" },
    { icon: SiPostgresql,      label: "Postgresql" },
    { icon: FaFigma,       label: "Figma" },
    { icon: FaHtml5,       label: "HTML" },
    { icon: FaCss3,        label: "CSS" },
    { icon: SiJavascript,    label: "Javascript" },
    { icon: SiTypescript, label: "Typescript" },
    { icon: SiSurveymonkey,     label: "SurveyMonkey" },
];

function IconPill({ icon: Icon, label }) {
    return (
        <div className="flex flex-col items-center gap-2 mx-4">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center">
                <Icon size={22} />
            </div>
            <span className="text-xs font-medium text-white/40">{label}</span>
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