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
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-white/90">{value}</span>
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
            <div className="flex flex-col gap-6 p-5 md:p-8 pb-6">
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
        title: "CBRE: Grounding a Roadmap in Real User Pain",
        tagline: "Replaced PM intuition with a multi-method research framework that put actual user pain points in front of the VP of Digital & Technology.",
        icon: <Users size={40} strokeWidth={1} />,
        methods: ["Heuristic Evaluation", "MaxDiff Survey", "VADER Sentiment Analysis", "Data Synthesis", "Usability Testing"],
        stats: [
            { value: "500+", label: "Users Surveyed" },
            { value: "40+", label: "Usability Issues Surfaced" },
            { value: "VP-Level", label: "Stakeholder Presentation" },
        ],
        problem:
            "Feature prioritization on the facility management platform was driven by PM intuition rather than user evidence. There was no structured way to know which problems were actually hurting users the most — or to make a case for fixing them over shipping new features.",
        thinking:
            "A single method wouldn't be convincing enough on its own. I needed a confirmation loop: find the pain points through a structured audit, then check whether real users had been reporting the same things for months. If the heuristic findings matched the historical data, the argument for fixing them becomes hard to dismiss.",
        steps: [
            {
                title: "Heuristic Evaluation",
                detail: "Audited the platform against Nielsen's 10 heuristics, surfacing 40+ issues organized into 11 tags. Built an Airtable template to document and triage findings so the team could run future evaluations without starting from scratch. Collaborated with design to label each issue as addressed, in progress, or unknown.",
            },
            {
                title: "Historical Data Synthesis",
                detail: "Used Python (Pandas + VADER sentiment analysis) to cross-reference HE findings against months of historical open-ended survey responses. Found that the issues I'd flagged — particularly search & filtering and information-dense table views — were the same things users had been reporting negatively for months. That overlap is what made the usability pillars credible, not just my opinion.",
            },
            {
                title: "MaxDiff Survey",
                detail: "Designed the survey from scratch using Alchemer, reading academic papers to ensure the question structure would produce statistically valid results at our sample size. Recruited 500+ internal facility managers and coordinators from an internal contact database and drafted the recruitment emails myself.",
            },
            {
                title: "Live Prototype Validation",
                detail: "Built functional Figma prototypes and ran live usability sessions, testing proposed fixes with real users and validating changes within the same research cycle — no need for a separate follow-up study.",
            },
        ],
        impact:
            "Delivered a research-backed presentation to the Director of Product and VP of Digital & Technology that gave the team a clear, evidence-based view of what to build next. The Q3/Q4 engineering roadmap was directly informed by the MaxDiff ranking. The team moved from prioritizing by instinct to prioritizing by data.",
    },
    {
        index: 2,
        tag: "EdTech · AI Systems",
        title: "Pearl Discovery: Closing the 60-Day Teacher Gap",
        tagline: "Discovery research uncovered how teachers really learn about students — and the finding reshaped the product roadmap.",
        icon: <FlaskConical size={40} strokeWidth={1} />,
        methods: ["Discovery Interviews", "Mental Model Mapping", "Affinity Mapping", "Dashboard Design", "HITL Interface Design"],
        stats: [
            { value: "7", label: "Participants Interviewed" },
            { value: "3", label: "User Types" },
            { value: "60-Day", label: "Gap Being Addressed" },
        ],
        problem:
            "Teachers and coaches typically spend the first 60 days of a semester just figuring out who their students are — their behavioral tendencies, learning styles, and how they respond to different situations. That's two months of guesswork before any informed coaching can happen. The platform aims to collapse that gap by surfacing behavioral insights early.",
        thinking:
            "Before designing anything, I needed to understand how teachers actually build that understanding — not the official answer, but the real one. If we built a tool around the wrong mental model, it wouldn't matter how good the AI was. Teachers wouldn't trust it or use it.",
        steps: [
            {
                title: "Discovery Interviews",
                detail: "Recruited and interviewed 7 participants across three user types: teachers, coaches, and parents. The goal was to map how each group actually learns about a student's behavioral patterns — not how they're supposed to, but how it really happens.",
            },
            {
                title: "Key Finding",
                detail: "The moment a teacher genuinely understands a student is almost never the result of a process. It's situational — it usually surfaces during peer collaboration, when students are working alongside others and their real behavioral qualities come out naturally. That's not something any existing tool was designed around.",
            },
            {
                title: "Roadmap Impact",
                detail: "That finding directly shaped the product. We added a planned feature to analyze how students' behavioral pillar profiles interact with each other in group settings — because that's when the signal actually appears.",
            },
            {
                title: "Dashboard Design",
                detail: "Used interview insights to design the coaching interface. Teachers wanted two things: an at-a-glance profile for each individual student, and a picture of how the whole class is trending. Both levels of view came directly from what people said in interviews, not from assumptions.",
            },
        ],
        impact:
            "The discovery research changed what we're building, not just how we're presenting it. A feature that didn't exist before the interviews — peer interaction analysis — is now on the roadmap because of a finding about how behavioral understanding actually works in practice. The platform is currently in development, with coach usability testing planned for the next phase.",
    },
    {
        index: 3,
        tag: "HCI Research · AI Tooling",
        title: "AI-Augmented Digital Fabrication",
        tagline: "Built a domain-specific AI assistant grounded in expert knowledge — and tested whether that grounding actually changed how much users trusted it.",
        icon: <Cpu size={40} strokeWidth={1} />,
        methods: ["Contextual Inquiry", "Physical Card Sorting", "Taxonomy Construction", "React Prototyping", "Likert Trust Survey"],
        stats: [
            { value: "5", label: "Domain Experts" },
            { value: "2", label: "AI Systems Compared" },
            { value: "↑ Trust", label: "Directional Finding" },
        ],
        problem:
            "Generic AI tools don't understand the physical constraints and expert strategies that come with something like laser cutting. They produce plausible-sounding output that doesn't hold up when an actual expert tries to use it — which means the tool gets dismissed, not adopted.",
        thinking:
            "The output quality of an AI system is only as good as the knowledge it's grounded in. If I could encode how actual domain experts think about fabrication strategies — their vocabulary, their hierarchy of decisions — the system would be able to reason within those constraints instead of pattern-matching from general text.",
        steps: [
            {
                title: "Contextual Inquiry",
                detail: "Visited an active fabrication lab to interview and observe 5 digital fabrication experts in their actual working environment. The goal was to understand how they think about laser-cutting strategies, not how they'd describe them in a vacuum.",
            },
            {
                title: "Physical Card Sorting",
                detail: "Ran card sorting exercises using physical printed cards — a deliberate methodological choice. These are hands-first people who work in a fabrication lab every day. A screen-based tool would have felt foreign to how they actually think. Designed and printed the cards, brought them to the lab, and had participants build the hierarchy by hand. Piloted the exercise with fellow researchers using Optimal Workshop before committing to the physical format.",
            },
            {
                title: "Taxonomy Construction",
                detail: "Used the physical sort results to build a structured taxonomy of laser-cutting strategies — mapping the relationships between techniques, material constraints, and fabrication decisions in the way experts actually organize that knowledge.",
            },
            {
                title: "React Prototype & Trust Evaluation",
                detail: "Built a React-based AI assistant constrained by the taxonomy, designed to help users generate their own ideas rather than just produce outputs. Tested it against a generic LLM using a Likert trust survey with the same 5 participants. Preliminary results showed higher trust ratings for the domain-specific system.",
            },
        ],
        impact:
            "Preliminary results pointed toward contextual grounding mattering more than raw model capability for specialist users — they trusted the tool that spoke their language over the one that just sounded confident. With only 5 participants this is a directional finding, not a definitive one, but it's a strong enough signal to warrant a larger follow-up study.",
    },
];

export default function UXPage() {
    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-32 gap-12 md:gap-20">

            {/* Page header */}
            <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">UX Research Portfolio</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-2xl">
                    Case Studies
                </h1>
                <p className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed">
                    I find the problem, build the case for solving it, and ship the fix. Here's how that actually looks.
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