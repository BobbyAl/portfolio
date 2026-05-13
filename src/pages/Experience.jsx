import { MapPin } from "lucide-react";
import { useState } from "react";

function JobCard({ job }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative flex flex-col lg:flex-row w-full justify-between gap-12 group">
            {/* Timeline node */}
            <div className="hidden lg:block absolute left-[-2rem] top-2 w-3 h-3 rounded-full bg-[#050505] border-2 border-white/30 group-hover:border-white group-hover:bg-white/20 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20"></div>
            <div className="flex flex-col w-full lg:w-1/3 gap-2 z-10">
                <span className="uppercase tracking-widest text-xs font-semibold text-white/40">{job.date}</span>
                <span className="text-3xl lg:text-4xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">{job.org}</span>
                <div className="flex gap-2 items-center text-white/50 mt-1">
                    <MapPin size={12} />
                    <div className="flex gap-2 text-sm font-medium">
                        <span>{job.location}</span>
                        <span className="text-white/20">|</span>
                        <span>{job.type}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full lg:w-2/3 gap-6">
                <div className="flex flex-col max-w-xl items-start gap-4">
                    <span className="text-xl md:text-2xl font-semibold text-left max-w-md self-start text-white/90">{job.title}</span>
                    {job.bullets.map((b, i) => (
                        <div key={i} className="flex gap-3 items-start bg-white/5 hover:bg-white/10 transition-colors shadow-lg border border-white/10 rounded-2xl px-4 py-4 md:px-6 md:py-5 w-full">
                            <span className="text-white/70 leading-relaxed font-light text-base">{b}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-2 max-w-xl">
                    <button
                        onClick={() => setOpen(o => !o)}
                        className="text-xs font-medium uppercase tracking-wider text-white/60 bg-transparent border border-white/20 rounded-full px-5 py-2 hover:bg-white/10 hover:text-white cursor-pointer transition-all"
                    >
                        {open ? "Hide Skills" : "View Skills"}
                    </button>
                    {open && (
                        <div className="flex flex-wrap gap-2 pt-3">
                            {job.skills.map((s, i) => (
                                <span key={i} className="text-xs text-white/80 bg-white/10 border border-white/5 rounded-full px-4 py-1.5 cursor-default">{s}</span>
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
                "I built a full-stack Next.js platform from the ground up, moving from messy problem-framing to production-ready code.",
                "To fix a massive cost bottleneck, I trained a small language model to handle routine tasks locally. It cut our API overhead by 90% and made the entire system faster and more private.",
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
                "Feature prioritization was driven by gut feel, not evidence. I ran a heuristic evaluation, cross-referenced the findings against months of historical survey data using VADER sentiment analysis, and then ran a MaxDiff survey with 500+ users to rank which friction points hurt the most. The result landed in front of the Director of Product and VP of Digital & Technology.",
                "Instead of static mockups, I built functional Figma prototypes and tested them live during usability sessions — validating fixes with real users in the same cycle, no follow-up study needed.",
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
                "I investigated whether domain-specific AI actually performs better than a generic LLM for expert digital fabrication workflows — or if the difference is just in how much users trust it.",
                "I ran physical card sorting exercises with 5 fab lab experts (physical cards, their lab, deliberate choice — these are hands-first people) to build a taxonomy of laser-cutting strategies. I encoded that taxonomy into a React AI assistant and ran a comparative trust study against a generic LLM. Preliminary results pointed to contextual grounding mattering more than raw capability.",
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
    ]

    return (
        <div className="flex flex-col w-full max-w-6xl gap-16 py-20 md:py-32 px-6 mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Experience</h1>
            <div className="relative flex flex-col gap-24 lg:pl-8">
                {/* Timeline vertical line */}
                <div className="hidden lg:block absolute left-[-1.65rem] top-4 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent z-0"></div>
                {experience.map((job) => (
                    <JobCard key={job.title} job={job} />
                ))}
            </div>
        </div>
    );
}