import {
    FaReact, FaFigma, FaHtml5, FaCss3
} from "react-icons/fa";

import {
    SiTailwindcss, SiNextdotjs, SiSupabase, SiPostgresql, SiJavascript, SiTypescript, SiSurveymonkey
} from "react-icons/si";

const icons = [
    { icon: FaReact,        label: "React" },
    { icon: SiTailwindcss,  label: "Tailwind" },
    { icon: SiNextdotjs,    label: "Next.js" },
    { icon: SiSupabase,     label: "Supabase" },
    { icon: SiPostgresql,   label: "PostgreSQL" },
    { icon: FaFigma,        label: "Figma" },
    { icon: FaHtml5,        label: "HTML" },
    { icon: FaCss3,         label: "CSS" },
    { icon: SiJavascript,   label: "JavaScript" },
    { icon: SiTypescript,   label: "TypeScript" },
    { icon: SiSurveymonkey, label: "SurveyMonkey" },
];

function IconPill({ icon: Icon, label }) {
    return (
        <div className="mx-5 flex items-center gap-2" style={{ color: '#888888' }}>
            <Icon size={18} />
            <span style={{ fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</span>
        </div>
    );
}

export default function Marquee() {
    return (
        <div className="w-full overflow-hidden py-4" style={{ borderTop: '1px solid #e5e2dc', borderBottom: '1px solid #e5e2dc' }}>
            <div className="flex w-max animate-marquee">
                {[...icons, ...icons].map((item, i) => (
                    <div
                        key={i}
                        style={{
                            animation: `bob 4s ease-in-out infinite`,
                            animationDelay: `${(i % icons.length) * 0.2}s`,
                        }}
                    >
                        <IconPill icon={item.icon} label={item.label} />
                    </div>
                ))}
            </div>
        </div>
    );
}
