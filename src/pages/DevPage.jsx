import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb, AlertCircle, Rocket, Database, Activity, Server, Workflow } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const SECTION_STYLES = {
    problem:  { color: "text-rose-400",   border: "border-rose-400/20",   bg: "bg-rose-400/5",   label: "The Problem"   },
    thinking: { color: "text-violet-400", border: "border-violet-400/20", bg: "bg-violet-400/5", label: "My Thinking"   },
    plan:     { color: "text-sky-400",    border: "border-sky-400/20",    bg: "bg-sky-400/5",    label: "The Plan"      },
    result:   { color: "text-emerald-400",border: "border-emerald-400/20",bg: "bg-emerald-400/5",label: "The Result"    },
};

const SECTION_ICONS = {
    problem:  <AlertCircle size={16} />,
    thinking: <Lightbulb size={16} />,
    plan:     <Workflow size={16} />,
    result:   <Rocket size={16} />,
};

function StackTag({ label }) {
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

function ProjectCard({ index, tag, title, tagline, stack, stats, problem, thinking, steps, result, icon, github }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col border border-white/10 shadow-2xl rounded-3xl bg-[#111111]/80 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20 group">

            {/* Header row */}
            <div className="flex flex-col gap-6 p-8 pb-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                                System {String(index).padStart(2, "0")}
                            </span>
                            <span className="px-3 py-1 text-xs font-semibold border border-white/10 rounded-full bg-white/5 text-white/70">
                                {tag}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white/90">{title}</h2>
                        <p className="text-white/60 text-base max-w-xl font-light leading-relaxed">{tagline}</p>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                        <div className="text-white/20 group-hover:text-white/40 transition-colors shrink-0">{icon}</div>
                        {github && (
                            <a 
                                href={github} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-semibold text-white/80 hover:text-white transition-colors"
                            >
                                <FaGithub size={14} />
                                Source Code
                            </a>
                        )}
                    </div>
                </div>

                {/* Tech Stack tags */}
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-white/30 uppercase tracking-widest">The Tech Stack</span>
                    <div className="flex flex-wrap gap-2">
                        {stack.map((s) => <StackTag key={s} label={s} />)}
                    </div>
                </div>

                {/* Key Metrics */}
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
                {open ? <><ChevronUp size={16} /> Hide Architecture Details</> : <><ChevronDown size={16} /> Read Architecture Details</>}
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

                    <SectionBlock type="plan">
                        <StepList steps={steps} />
                    </SectionBlock>

                    <SectionBlock type="result">
                        <p className="text-base text-white/70 font-light leading-relaxed">{result}</p>
                    </SectionBlock>
                </div>
            )}
        </div>
    );
}

const PROJECTS = [
    {
        index: 1,
        tag: "Full-Stack · Data Integrity",
        title: "TeachTrack: Academic Analytics",
        tagline: "A learning management system built around strict data privacy and clear accreditation metrics.",
        icon: <Database size={40} strokeWidth={1} />,
        github: "https://github.com/BobbyAl",
        stack: ["Supabase (Postgres)", "React", "Next.js", "TailwindCSS", "Node.js", "JWT", "Redis"],
        stats: [
            { value: "JWT", label: "Secure Auth" },
            { value: "FERPA", label: "Compliant" },
            { value: "Redis", label: "Caching" },
        ],
        problem:
            "Most LMS platforms focus on student satisfaction instead of actual learning outcomes. This makes it really hard for departments to get the clean data they need for accreditation.",
        thinking:
            "We needed a way to keep data private for each professor, while automatically turning qualitative feedback into the quantitative metrics the university actually tracks.",
        steps: [
            { title: "Database Architecture", detail: "Built a relational schema in Postgres to map raw feedback directly to specific Student Learning Outcomes (SLOs)." },
            { title: "Security First", detail: "Set up a JWT-based invite system so all student data stays private and FERPA-compliant." },
            { title: "Scalability", detail: "Added Redis for caching and set up load balancing so the system wouldn't crash during the end-of-semester evaluation rush." },
        ],
        result:
            "Shipped a platform that gives coordinators real-time, outcome-focused metrics across their entire departments.",
    },
    {
        index: 2,
        tag: "Cloud Architecture · IoT",
        title: "SmartDash: Event-Driven IoT",
        tagline: "A cloud-native pipeline built to process high-frequency hardware telemetry for predictive maintenance.",
        icon: <Activity size={40} strokeWidth={1} />,
        github: null,
        stack: ["Google Cloud Platform", "Pub/Sub", "Cloud Functions", "BigQuery", "Firestore", "Python"],
        stats: [
            { value: "1Hz", label: "Telemetry Rate" },
            { value: "1000s", label: "Device Streams" },
            { value: "Serverless", label: "Infrastructure" },
        ],
        problem:
            "Facility managers usually react to equipment failures after they happen, which leads to expensive downtime and a lot of manual logging.",
        thinking:
            "I wanted to build a 'fire-and-forget' pipeline that could handle fast telemetry (1Hz) and store it so we could eventually predict failures before they happen.",
        steps: [
            { title: "Pipeline Construction", detail: "Built a serverless pipeline with GCP Pub/Sub to ingest 1Hz telemetry from simulated hardware." },
            { title: "Data Storage", detail: "Pushed real-time state to Firestore for a live dashboard, and stored historical logs in BigQuery for trend analysis." },
            { title: "Future Autonomy", detail: "Designed the system so it could eventually move from basic alerts to an autonomous 'reasoning layer' that predicts failures using historical logs." },
        ],
        result:
            "Successfully built a scalable, cloud-native system that can handle thousands of device streams at once.",
    },
    {
        index: 3,
        tag: "Algorithms · iOS/Web",
        title: "TaskFlow: Datacenter Engine",
        tagline: "Pathfinding algorithms and an AR interface built to speed up technician response times in massive 400MW facilities.",
        icon: <Server size={40} strokeWidth={1} />,
        github: "https://github.com/BobbyAl",
        stack: ["React", "Python", "Swift (ARKit)", "A* Algorithm", "BFS Algorithm"],
        stats: [
            { value: "1st Place", label: "HackUTD" },
            { value: "A* & BFS", label: "Path Routing" },
            { value: "ARKit", label: "Hardware Scanning" },
        ],
        problem:
            "Technicians in giant 400MW datacenters lose a ton of time manually prioritizing work orders and navigating complex server clusters.",
        thinking:
            "This wasn't just a UI problem, it was an optimization problem. I needed to combine search algorithms with a mobile app to actually speed up on-site response times.",
        steps: [
            { title: "The Engine", detail: "Wrote a routing engine using A* and BFS to calculate the fastest path through the facility based on ticket priority." },
            { title: "The Interface", detail: "Built a web dashboard for management and an iOS AR app that lets technicians scan a server rack to instantly find the broken hardware." },
        ],
        result:
            "Won 1st place at HackUTD by proving the system significantly reduced technician response times and manual errors.",
    },
];

export default function DevPage() {
    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto px-6 py-32 gap-20">

            {/* Page header */}
            <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Software Engineering Portfolio</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-2xl">
                    Systems that Scale
                </h1>
                <p className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed">
                    Building high-frequency data pipelines, secure cloud architecture, and algorithms that solve real-world problems.
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

            {/* Projects */}
            <div className="flex flex-col gap-6">
                {PROJECTS.map((proj) => (
                    <ProjectCard key={proj.index} {...proj} />
                ))}
            </div>
        </div>
    );
}