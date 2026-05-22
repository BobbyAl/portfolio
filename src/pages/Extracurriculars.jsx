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
        <div
            className="flex flex-col w-full py-24"
            style={{ borderTop: '1px solid #e5e2dc' }}
        >
            <div className="flex flex-col w-full max-w-6xl mx-auto gap-12 px-6 md:px-12">

                {/* Section label */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div style={{ width: '32px', height: '3px', background: '#158EFF', flexShrink: 0 }} />
                        <span className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: '#158EFF' }}>
                            Extracurriculars
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: '#111111' }}>
                        Outside the classroom
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setActive(t.id)}
                            className="px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer"
                            style={{
                                background: active === t.id ? '#158EFF' : 'transparent',
                                color: active === t.id ? '#ffffff' : '#888888',
                                border: `1px solid ${active === t.id ? '#158EFF' : '#dddddd'}`,
                            }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-2xl md:text-3xl font-bold" style={{ color: '#111111' }}>
                                    {tab.role}
                                </span>
                                <span
                                    className="text-xs font-semibold uppercase tracking-widest px-3 py-1"
                                    style={{ background: '#f0f4ff', color: '#158EFF', border: '1px solid #c8dbff' }}
                                >
                                    {tab.dates}
                                </span>
                            </div>
                            <span className="text-sm font-medium uppercase tracking-widest" style={{ color: '#999999' }}>
                                {tab.label}
                            </span>
                        </div>

                        <ul className="flex flex-col gap-3 max-w-2xl">
                            {tab.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span
                                        className="mt-2 shrink-0"
                                        style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#158EFF', flexShrink: 0 }}
                                    />
                                    <span className="text-base leading-relaxed" style={{ color: '#444444' }}>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    );
}
