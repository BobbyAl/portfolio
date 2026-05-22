import { MapPin } from "lucide-react";
import { useState } from "react";

function JobCard({ job }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative flex flex-col lg:flex-row w-full justify-between gap-10 group">
            {/* Timeline node */}
            <div
                className="hidden lg:block absolute top-2 z-20 transition-all duration-300"
                style={{
                    left: '-2rem',
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '2px solid #cccccc',
                    boxSizing: 'border-box',
                }}
                ref={el => {
                    if (el) {
                        el.closest('.group').addEventListener('mouseenter', () => {
                            el.style.borderColor = '#158EFF';
                            el.style.background = '#158EFF';
                        });
                        el.closest('.group').addEventListener('mouseleave', () => {
                            el.style.borderColor = '#cccccc';
                            el.style.background = '#ffffff';
                        });
                    }
                }}
            />

            {/* Left — date, org, location */}
            <div className="flex flex-col w-full lg:w-1/3 gap-1.5 z-10">
                <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: '#158EFF' }}
                >
                    {job.date}
                </span>
                <span
                    className="text-2xl lg:text-3xl font-bold tracking-tight"
                    style={{ color: '#111111' }}
                >
                    {job.org}
                </span>
                <div className="flex gap-2 items-center mt-0.5" style={{ color: '#999999' }}>
                    <MapPin size={11} />
                    <span className="text-sm">{job.location}</span>
                    <span style={{ color: '#dddddd' }}>|</span>
                    <span className="text-sm">{job.type}</span>
                </div>
            </div>

            {/* Right — title, bullets, skills */}
            <div className="flex flex-col w-full lg:w-2/3 gap-5">
                <span className="text-lg md:text-xl font-semibold" style={{ color: '#111111' }}>
                    {job.title}
                </span>

                <div className="flex flex-col gap-3">
                    {job.bullets.map((b, i) => (
                        <div
                            key={i}
                            className="px-5 py-4 text-sm leading-relaxed"
                            style={{
                                background: '#ffffff',
                                border: '1px solid #e5e2dc',
                                color: '#444444',
                                lineHeight: '1.7',
                            }}
                        >
                            {b}
                        </div>
                    ))}
                </div>

                <div>
                    <button
                        onClick={() => setOpen(o => !o)}
                        className="text-xs font-semibold uppercase tracking-wider px-4 py-2 transition-all cursor-pointer"
                        style={{
                            color: open ? '#158EFF' : '#888888',
                            background: 'transparent',
                            border: `1px solid ${open ? '#158EFF' : '#dddddd'}`,
                        }}
                    >
                        {open ? "Hide Skills" : "View Skills"}
                    </button>
                    {open && (
                        <div className="flex flex-wrap gap-2 pt-3">
                            {job.skills.map((s, i) => (
                                <span
                                    key={i}
                                    className="text-xs px-3 py-1.5"
                                    style={{
                                        background: '#f0f4ff',
                                        border: '1px solid #c8dbff',
                                        color: '#158EFF',
                                        fontWeight: 500,
                                    }}
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Experience() {

    const experience = [
        {
            title: "AI Research & Full-Stack Developer",
            org: "Pearl Discovery (Non-profit)",
            location: "Remote",
            type: "Part-Time",
            date: "Mar. 2026 — Present",
            bullets: [
                "Built a full-stack Next.js platform from the ground up, moving from problem-framing to production-ready code.",
                "To fix a significant cost bottleneck, I trained a small language model to handle routine tasks locally. It cut API overhead by 90% and made the entire system faster and more private.",
            ],
            skills: [
                "SLM Fine-Tuning",
                "Claude API",
                "Sentiment Analysis",
                "Next.js",
                "Typescript",
                "TailwindCSS",
                "Postgresql",
                "Supabase",
                "User Interviews",
                "Figma",
                "Research Planning",
                "Rapid Prototyping",
                "Vercel"
            ]
        },
        {
            title: "UX Research Intern",
            org: "CBRE",
            location: "Richardson, TX",
            type: "Internship",
            date: "Jun. 2025 – Aug. 2025",
            bullets: [
                "Feature prioritization was driven by gut feel, not evidence. I ran a heuristic evaluation, cross-referenced the findings against months of historical survey data using VADER sentiment analysis, and ran a MaxDiff survey with 500+ users to rank which friction points hurt most. The result landed in front of the Director of Product and VP of Digital & Technology.",
                "Instead of static mockups, I built functional Figma prototypes and tested them live during usability sessions, validating fixes with real users in the same cycle.",
            ],
            skills: [
                "Figma",
                "Figma Make",
                "Usability Testing",
                "Rapid Prototyping",
                "User Interviews",
                "Journey Mapping",
                "MaxDiff Analysis",
                "Likert Surveys",
                "Data Analysis",
            ]
        },
        {
            title: "HCI Researcher (Human-AI Co-creativity)",
            org: "Hybrid Atelier Lab — UT Arlington",
            location: "Arlington, TX",
            type: "Research Internship",
            date: "May 2024 – Aug. 2024",
            bullets: [
                "Investigated whether domain-specific AI actually performs better than a generic LLM for expert digital fabrication workflows, or whether the difference comes down to how much users trust it.",
                "Ran physical card sorting exercises with 5 fab lab experts to build a taxonomy of laser-cutting strategies. Encoded that taxonomy into a React AI assistant and ran a comparative trust study against a generic LLM. Preliminary results pointed to contextual grounding mattering more than raw capability.",
            ],
            skills: [
                "React",
                "Javascript",
                "TailwindCSS",
                "Card Sorting",
                "Ethnography",
                "User Interviews",
                "Ontology Design",
                "GPT-4 API",
                "Wireframing",
                "Presentation",
                "Research Planning",
            ]
        }
    ];

    return (
        <div
            className="flex flex-col w-full py-24"
            style={{ borderTop: '1px solid #e5e2dc' }}
        >
            <div className="flex flex-col w-full max-w-6xl mx-auto gap-16 px-6 md:px-12">

                {/* Section label */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div style={{ width: '32px', height: '3px', background: '#158EFF', flexShrink: 0 }} />
                        <span className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: '#158EFF' }}>
                            Experience
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: '#111111' }}>
                        Where I've worked
                    </h2>
                </div>

                {/* Timeline */}
                <div className="relative flex flex-col gap-20 lg:pl-8">
                    <div
                        className="hidden lg:block absolute top-4 bottom-0 w-px"
                        style={{ left: '-1.65rem', background: 'linear-gradient(to bottom, #e5e2dc, transparent)' }}
                    />
                    {experience.map((job) => (
                        <JobCard key={job.title} job={job} />
                    ))}
                </div>

            </div>
        </div>
    );
}
