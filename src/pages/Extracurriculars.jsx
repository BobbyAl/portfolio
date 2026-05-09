import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const tabs = [
    {
        id: "acm",
        label: "ACM at UTA",
        role: "President & Student Advisor",
        dates: "2023 – Present",
        bullets: [
            "Lead the largest CS organization on campus with 200+ active members",
            "Organized workshops, panels, and networking events with industry partners",
            "Mentored student officers and managed a cross-functional team",
            "Drove a 3× increase in membership engagement over two semesters",
        ],
    },
    {
        id: "hackuta",
        label: "HackUTA",
        role: "Creative Director",
        dates: "2023 – 2025",
        bullets: [
            "Owned all visual identity, branding, and creative direction for UTA's flagship hackathon",
            "Designed the end-to-end attendee experience across digital and physical touchpoints",
            "Coordinated a creative team of 8 across motion, print, and web deliverables",
            "Scaled the event brand to support 600+ participants across two years",
        ],
    },
    {
        id: "wehacks",
        label: "WeHacks",
        role: "Speaker",
        dates: "2024",
        bullets: [
            "Invited to speak on AI-native design and human-centered technology",
            "Presented to an audience of 300+ students and industry professionals",
            "Facilitated a live Q&A session on the intersection of CS and design",
        ],
    },
    {
        id: "hackutd",
        label: "HackUTD",
        role: "1st Place Winner",
        dates: "2025",
        bullets: [
            "Won first place competing against 400+ participants across 80+ teams",
            "Built an AI-driven product from zero to demo in 24 hours",
            "Pitched to a panel of industry judges from Fortune 500 companies",
        ],
    },
];

export default function Extracurriculars() {
    const [active, setActive] = useState(tabs[0].id);
    const tab = tabs.find(t => t.id === active);

    return (
        <div className="flex flex-col w-full gap-12 py-20 md:py-32 max-w-7xl mx-auto">
            {/* Header */}
            <div className="px-4 md:px-[5vw]">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Extracurriculars</h1>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 px-4 md:px-[5vw]">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setActive(t.id)}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border cursor-pointer
                            ${active === t.id
                                ? "bg-white text-black border-white shadow-lg"
                                : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:bg-white/10 hover:text-white"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Info block */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={active + "-info"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
                    className="flex flex-col gap-6 px-4 md:px-[5vw]"
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="text-3xl font-bold text-white/90">{tab.role}</span>
                            <span className="text-xs font-semibold text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">{tab.dates}</span>
                        </div>
                        <span className="text-sm font-medium text-white/60 uppercase tracking-widest">{tab.label}</span>
                    </div>

                    <ul className="flex flex-col gap-3 max-w-3xl">
                        {tab.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                                <span className="text-base text-white/70 leading-relaxed font-light">{b}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
