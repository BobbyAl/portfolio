import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb, Search, Cpu, TrendingUp, Users, FlaskConical, Layers } from "lucide-react";

const SECTION_STYLES = {
    problem:   { color: "text-rose-400",   border: "border-rose-400/20",   bg: "bg-rose-400/5",   label: "The Problem"   },
    thinking:  { color: "text-violet-400", border: "border-violet-400/20", bg: "bg-violet-400/5", label: "My Thinking"   },
    execution: { color: "text-sky-400",    border: "border-sky-400/20",    bg: "bg-sky-400/5",    label: "The Execution" },
    impact:    { color: "text-emerald-400",border: "border-emerald-400/20",bg: "bg-emerald-400/5",label: "The Impact"    },
};

const SECTION_ICONS = {
    problem:   <Search size={16} />,
    thinking:  <Lightbulb size={16} />,
    execution: <Layers size={16} />,
    impact:    <TrendingUp size={16} />,
};

function MethodTag({ label }) {
    return (
        <span className="px-4 py-1.5 text-xs font-medium border border-white/10 rounded-full bg-white/5 backdrop-blur-md text-white/70">
            {label}
        </span>
    );
}

function ImpactStat({ value, label }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold tracking-tight text-white/90">{value}</span>
            <span className="text-xs font-semibold text-white/40 uppercase tracking-widest mt-1">{label}</span>
        </div>
    );
}

function SectionBlock({ type, children }) {
    const s = SECTION_STYLES[type];
    return (
        <div className={`flex flex-col gap-4 p-6 rounded-3xl border ${s.border} ${s.bg} shadow-lg backdrop-blur-sm`}>
            <div className={`flex items-center gap-2 ${s.color} font-semibold text-xs uppercase tracking-widest`}>
                {SECTION_ICONS[type]}
                {s.label}
            </div>
            {children}
        </div>
    );
}

function StepList({ steps }) {
    return (
        <ol className="flex flex-col gap-3">
            {steps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                    <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-400 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                    </span>
                    <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-base text-white/90">{step.title}</span>
                        {step.detail && <span className="text-sm font-light text-white/60 leading-relaxed">{step.detail}</span>}
                    </div>
                </li>
            ))}
        </ol>
    );
}

function CaseStudy({ index, tag, title, tagline, methods, stats, problem, thinking, steps, impact, icon }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col border border-white/10 shadow-2xl rounded-3xl bg-[#111111]/80 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20 group">

            {/* Header row — always visible, skimmable */}
            <div className="flex flex-col gap-6 p-8 pb-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                                Case Study {String(index).padStart(2, "0")}
                            </span>
                            <span className="px-3 py-1 text-xs font-semibold border border-white/10 rounded-full bg-white/5 text-white/70">
                                {tag}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white/90">{title}</h2>
                        <p className="text-white/60 text-base max-w-xl font-light leading-relaxed">{tagline}</p>
                    </div>
                    <div className="text-white/20 group-hover:text-white/40 transition-colors shrink-0">{icon}</div>
                </div>

                {/* Method tags */}
                <div className="flex flex-wrap gap-2">
                    {methods.map((m) => <MethodTag key={m} label={m} />)}
                </div>

                {/* Impact stats — the recruiter skim hook */}
                {stats.length > 0 && (
                    <div className="flex gap-12 pt-6 mt-2 border-t border-white/10 flex-wrap">
                        {stats.map((s) => <ImpactStat key={s.label} {...s} />)}
                    </div>
                )}
            </div>

            {/* Expand toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center gap-2 w-full py-4 border-t border-white/10 text-xs font-semibold text-white/50 uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
            >
                {open ? <><ChevronUp size={16} /> Hide Case Details</> : <><ChevronDown size={16} /> Read Full Case Study</>}
            </button>

            {/* Full detail — expandable */}
            {open && (
                <div className="flex flex-col gap-6 p-8 pt-6 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SectionBlock type="problem">
                            <p className="text-base text-white/70 font-light leading-relaxed">{problem}</p>
                        </SectionBlock>

                        <SectionBlock type="thinking">
                            <p className="text-base text-white/70 font-light leading-relaxed">{thinking}</p>
                        </SectionBlock>
                    </div>

                    <SectionBlock type="execution">
                        <StepList steps={steps} />
                    </SectionBlock>

                    <SectionBlock type="impact">
                        <p className="text-base text-white/70 font-light leading-relaxed">{impact}</p>
                    </SectionBlock>
                </div>
            )}
        </div>
    );
}

const CASE_STUDIES = [
    {
        index: 1,
        tag: "Enterprise UX",
        title: "CBRE: Optimizing Facility Management",
        tagline: "Replaced gut-driven roadmaps with a data-backed prioritization framework for over 500 enterprise users.",
        icon: <Users size={40} strokeWidth={1} />,
        methods: ["Heuristic Evaluation", "MaxDiff Survey", "Generative Prototyping", "Figma Make", "Data Synthesis"],
        stats: [
            { value: "500+", label: "Survey Respondents" },
            { value: "4", label: "Research Methods" },
            { value: "1 Deck", label: "Delivered to Leadership" },
        ],
        problem:
            "Internal digital platforms had really fragmented usage. Feature prioritization was driven by PM intuition instead of actual user pain points, creating a big gap between what was being built and what users actually needed.",
        thinking:
            "I needed to validate these gut feelings with actual data. By cross-referencing a heuristic audit with months of survey data, I isolated the usability issues that were both widely reported and impactful to the business.",
        steps: [
            { title: "System Audit", detail: "Performed a heuristic evaluation to map out the system and find the main friction points." },
            { title: "Data Synthesis", detail: "Cross-referenced those audit findings with old survey data to find recurring themes." },
            { title: "MaxDiff Analysis", detail: "Sent a MaxDiff survey to over 500 users to get hard numbers on which interactions were the most painful." },
            { title: "Generative Prototyping", detail: "Ran usability tests using Figma Make. Participants suggested UI changes in real-time, I updated the design instantly, and we tracked how their perception shifted." },
        ],
        impact:
            "Delivered a data-backed presentation to management that gave everyone confidence in the roadmap. We directly addressed the worst friction points and shifted the team from guessing to actually knowing what to build.",
    },
    {
        index: 2,
        tag: "EdTech · AI Systems",
        title: "Pearl Discovery: Closing the 60-Day Teacher Gap",
        tagline: "Designed a system that gets student behavioral insights to educators on day one of the semester.",
        icon: <FlaskConical size={40} strokeWidth={1} />,
        methods: ["Semi-Structured Interviews", "User Recruitment", "HITL Design", "Mental Model Mapping", "Cognitive Load Testing"],
        stats: [
            { value: "7+", label: "Participants Interviewed" },
            { value: "20%", label: "Potential Academic Year Recovered" },
            { value: "60 days", label: "Learning Curve Eliminated" },
        ],
        problem:
            "Teachers and coaches face a 60-day gap at the start of every semester where they don't know their students' behavior traits or learning styles. They lose two months of potential growth just trying to figure everyone out.",
        thinking:
            "If we could capture the 'student outlook' early and give it to the teacher on day one, we could eliminate that learning curve. My goal was to figure out how teachers categorize student behavior so we could build a system that actually speaks their language.",
        steps: [
            { title: "User Recruitment", detail: "Recruited 7 teachers and coaches for deep-dive qualitative interviews." },
            { title: "Semi-Structured Interviews", detail: "Mapped out how educators currently learn about their students and where that information pipeline usually breaks down." },
            { title: "HITL Interface Design", detail: "Built an interface to test the best way to present behavioral insights so it was easy to read and actually trusted by the teachers." },
        ],
        impact:
            "Designed a tool that gives behavioral insights to teachers right at the start of the semester. This potentially reclaims 20% of the academic year for actual teaching and creates a much more responsive classroom from day one.",
    },
    {
        index: 3,
        tag: "HCI Research · AI Tooling",
        title: "AI-Augmented Digital Fabrication",
        tagline: "Built a domain-specific ontology and React prototype that outperformed generic LLM prompts for expert fabrication workflows.",
        icon: <Cpu size={40} strokeWidth={1} />,
        methods: ["Ethnographic Research", "Card Sorting", "Ontology Construction", "React Prototyping", "Expert Usability Testing"],
        stats: [
            { value: "1 Ontology", label: "Formal Knowledge Structure Built" },
            { value: "FabLab", label: "Field Research Setting" },
            { value: "↑ Trust", label: "vs. Generic AI Prompts" },
        ],
        problem:
            "Most AI tools are too broad. They don't understand the mechanical constraints and expert strategies needed for things like laser cutting. Generic prompts just produce generic, unusable output for actual experts.",
        thinking:
            "To build a better tool, I had to give it a better brain. A structured knowledge ontology based on expert behavior gives the system the vocabulary it needs to reason about fabrication strategies, instead of just pattern-matching general text.",
        steps: [
            { title: "Field Research", detail: "Conducted interviews and lab observations at an active FabLab with real digital fabrication experts." },
            { title: "Card Sorting", detail: "Ran card-sorting exercises to organize these expert workflows into a structured hierarchy." },
            { title: "Ontology Construction", detail: "Used the card-sort results to build a formal ontology that maps out viable laser-cutting strategies and their physical constraints." },
            { title: "AI Prototype", detail: "Built a React-based prototype using the ontology as its knowledge backbone. It acted as a brainstorming partner that gave technically accurate and trustworthy suggestions." },
        ],
        impact:
            "Proved that domain-specific knowledge structures (ontologies) significantly improve output quality and trust in human-AI workflows. This established a repeatable framework for grounding these tools in actual expert knowledge.",
    },
];

export default function UXPage() {
    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto px-6 py-32 gap-20">

            {/* Page header */}
            <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">UX Research Portfolio</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-2xl">
                    Case Studies
                </h1>
                <p className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed">
                    Technical UXR: I don't just find problems. I build the ontologies and prototypes needed to solve them.
                </p>

                {/* Legend */}
                <div className="flex gap-4 flex-wrap pt-2">
                    {Object.entries(SECTION_STYLES).map(([key, s]) => (
                        <div key={key} className={`flex items-center gap-1.5 text-xs font-medium ${s.color}`}>
                            {SECTION_ICONS[key]}
                            <span>{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Case studies */}
            <div className="flex flex-col gap-6">
                {CASE_STUDIES.map((cs) => (
                    <CaseStudy key={cs.index} {...cs} />
                ))}
            </div>
        </div>
    );
}