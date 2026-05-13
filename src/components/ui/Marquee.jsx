import {
    FaReact, FaFigma, FaHtml5, FaCss3
} from "react-icons/fa";

import {
    SiTailwindcss, SiNextdotjs, SiSupabase, SiPostgresql, SiJavascript, SiTypescript, SiSurveymonkey
} from "react-icons/si";

const icons = [
    { icon: FaReact,        label: "React" },
    { icon: SiTailwindcss,  label: "Tailwind" },
    { icon: SiNextdotjs,    label: "Next" },
    { icon: SiSupabase,     label: "Supabase" },
    { icon: SiPostgresql,   label: "PostgreSQL" },
    { icon: FaFigma,        label: "Figma" },
    { icon: FaHtml5,        label: "HTML" },
    { icon: FaCss3,         label: "CSS" },
    { icon: SiJavascript,   label: "JavaScript" },
    { icon: SiTypescript,   label: "TypeScript" },
    { icon: SiSurveymonkey, label: "SurveyMonkey" },
];

function IconPill({ icon: Icon }) {
    return (
        <div className="mx-4 md:mx-5 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
            <Icon size={28} />
        </div>
    );
}

export default function Marquee() {
    return (
        <div className="w-full overflow-hidden py-6">
            <div className="flex w-max animate-marquee">
                {[...icons, ...icons].map((item, i) => (
                    <div
                        key={i}
                        style={{
                            animation: `bob 4s ease-in-out infinite`,
                            animationDelay: `${(i % icons.length) * 0.2}s`,
                        }}
                    >
                        <IconPill icon={item.icon} />
                    </div>
                ))}
            </div>
        </div>
    );
}
