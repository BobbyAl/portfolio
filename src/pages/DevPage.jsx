import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function Tag({ children }) {
    return (
        <span style={{
            background: 'rgba(21,142,255,0.12)',
            border: '1px solid rgba(21,142,255,0.25)',
            color: '#158EFF',
            fontSize: '11px',
            fontWeight: 600,
            padding: '3px 10px',
            letterSpacing: '0.03em',
        }}>
            {children}
        </span>
    );
}

function Stat({ value, label }) {
    return (
        <div className="flex flex-col gap-1">
            <span style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#158EFF', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {value}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {label}
            </span>
        </div>
    );
}

function StepGrid({ steps }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {steps.map((step, i) => (
                <div key={i} style={{ background: '#f8f7f4', border: '1px solid #e5e2dc', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <span style={{
                            width: '24px', height: '24px', borderRadius: '50%',
                            background: '#158EFF', color: '#fff',
                            fontSize: '11px', fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                        }}>{i + 1}</span>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: '#111111' }}>{step.title}</span>
                    </div>
                    {step.detail && (
                        <p style={{ fontSize: '13px', color: '#555555', lineHeight: 1.65, margin: 0 }}>{step.detail}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

function Project({ tag, title, tagline, stack, stats, github, sections, onBack }) {
    return (
        <article>
            {/* Hero banner */}
            <div style={{ background: '#158EFF', padding: '64px 48px' }}>
                <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <button
                        onClick={onBack}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 600,
                            letterSpacing: '0.05em', padding: 0, marginBottom: '8px',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    >
                        <ArrowLeft size={13} /> All Projects
                    </button>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                            Software Engineering
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.35)' }}>·</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                            {tag}
                        </span>
                        {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    marginLeft: 'auto',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: 'rgba(255,255,255,0.85)',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255,255,255,0.35)',
                                    padding: '5px 12px',
                                    background: 'rgba(255,255,255,0.1)',
                                }}
                            >
                                <FaGithub size={13} /> Source Code
                            </a>
                        )}
                    </div>
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
                        {title}
                    </h1>
                    <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', lineHeight: 1.6, margin: 0 }}>
                        {tagline}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '8px' }}>
                        {stack.map(s => <Tag key={s}>{s}</Tag>)}
                    </div>
                </div>
            </div>

            {/* Stats bar */}
            {stats.length > 0 && (
                <div style={{ background: '#111111', padding: '32px 48px' }}>
                    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
                        {stats.map(s => <Stat key={s.label} {...s} />)}
                    </div>
                </div>
            )}

            {/* Sections */}
            <div>
                {sections.map((section, i) => (
                    <div
                        key={i}
                        style={{
                            background: section.dark ? '#111111' : '#ffffff',
                            borderBottom: '1px solid #e5e2dc',
                        }}
                    >
                        <div style={{
                            maxWidth: '960px',
                            margin: '0 auto',
                            padding: '56px 48px',
                            display: 'flex',
                            flexDirection: section.layout === 'split' ? 'row' : 'column',
                            gap: '48px',
                            alignItems: section.layout === 'split' ? 'flex-start' : undefined,
                            flexWrap: 'wrap',
                        }}>
                            {section.layout === 'split' ? (
                                <>
                                    <div style={{ flex: '0 0 220px' }}>
                                        <span style={{
                                            fontSize: '11px', fontWeight: 700,
                                            letterSpacing: '0.15em', textTransform: 'uppercase',
                                            color: section.dark ? 'rgba(255,255,255,0.35)' : '#aaaaaa',
                                        }}>
                                            {section.label}
                                        </span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: '260px' }}>
                                        <p style={{ fontSize: '16px', lineHeight: 1.8, color: section.dark ? 'rgba(255,255,255,0.75)' : '#333333', margin: 0 }}>
                                            {section.content}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 700,
                                        letterSpacing: '0.15em', textTransform: 'uppercase',
                                        color: section.dark ? 'rgba(255,255,255,0.35)' : '#aaaaaa',
                                    }}>
                                        {section.label}
                                    </span>
                                    {typeof section.content === 'string' ? (
                                        <p style={{ fontSize: '16px', lineHeight: 1.8, color: section.dark ? 'rgba(255,255,255,0.75)' : '#333333', margin: 0, maxWidth: '680px' }}>
                                            {section.content}
                                        </p>
                                    ) : section.content}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}

const PROJECTS = {
    teachtrack: {
        tag: "Full-Stack · Data Integrity",
        title: "TeachTrack: Academic Analytics",
        tagline: "A learning management system built around strict data privacy and clear accreditation metrics.",
        github: "https://github.com/BobbyAl",
        stack: ["Supabase (Postgres)", "React", "Next.js", "TailwindCSS", "Node.js", "JWT", "Redis"],
        stats: [
            { value: "JWT", label: "Secure Auth" },
            { value: "FERPA", label: "Compliant" },
            { value: "Redis", label: "Caching Layer" },
        ],
        sections: [
            {
                label: "The Problem",
                layout: "split",
                content: "Most LMS platforms focus on student satisfaction instead of actual learning outcomes. This makes it hard for departments to get clean data they need for accreditation.",
            },
            {
                label: "My Thinking",
                layout: "split",
                dark: true,
                content: "The core challenge was keeping data private per professor while automatically converting qualitative feedback into the quantitative metrics universities actually track for accreditation.",
            },
            {
                label: "How It Was Built",
                layout: "full",
                content: <StepGrid steps={[
                    { title: "Database Architecture", detail: "Built a relational schema in Postgres to map raw feedback directly to specific Student Learning Outcomes (SLOs)." },
                    { title: "Security First", detail: "Set up a JWT-based invite system so all student data stays private and FERPA-compliant by design." },
                    { title: "Scalability", detail: "Added Redis caching and load balancing so the system handles the end-of-semester evaluation rush without degrading." },
                ]} />,
            },
            {
                label: "The Result",
                layout: "split",
                content: "Shipped a platform that gives coordinators real-time, outcome-focused metrics across their entire departments — replacing manual spreadsheet audits.",
            },
        ],
    },
    smartdash: {
        tag: "Cloud Architecture · IoT",
        title: "SmartDash: Event-Driven IoT",
        tagline: "A cloud-native pipeline built to process high-frequency hardware telemetry for predictive maintenance.",
        github: null,
        stack: ["Google Cloud Platform", "Pub/Sub", "Cloud Functions", "BigQuery", "Firestore", "Python"],
        stats: [
            { value: "1Hz", label: "Telemetry Rate" },
            { value: "1000s", label: "Device Streams" },
            { value: "Serverless", label: "Infrastructure" },
        ],
        sections: [
            {
                label: "The Problem",
                layout: "split",
                content: "Facility managers typically react to equipment failures after they happen — expensive downtime, manual logging, no way to get ahead of it.",
            },
            {
                label: "My Thinking",
                layout: "split",
                dark: true,
                content: "I wanted a fire-and-forget pipeline that could handle fast telemetry at 1Hz and store it in a way that would support failure prediction down the line — not just alerting.",
            },
            {
                label: "How It Was Built",
                layout: "full",
                content: <StepGrid steps={[
                    { title: "Pipeline Construction", detail: "Built a serverless pipeline with GCP Pub/Sub to ingest 1Hz telemetry from simulated hardware devices." },
                    { title: "Dual Storage Strategy", detail: "Pushed real-time state to Firestore for a live dashboard, and stored historical logs in BigQuery for trend analysis." },
                    { title: "Designed for Autonomy", detail: "Structured the system so it can eventually move from basic threshold alerts to a reasoning layer that predicts failures from historical patterns." },
                ]} />,
            },
            {
                label: "The Result",
                layout: "split",
                content: "Built a scalable cloud-native system capable of handling thousands of concurrent device streams — a foundation for predictive maintenance rather than reactive response.",
            },
        ],
    },
    taskflow: {
        tag: "Algorithms · iOS/Web",
        title: "TaskFlow: Datacenter Engine",
        tagline: "Pathfinding algorithms and an AR interface built to speed up technician response times in 400MW facilities.",
        github: "https://github.com/BobbyAl",
        stack: ["React", "Python", "Swift (ARKit)", "A* Algorithm", "BFS Algorithm"],
        stats: [
            { value: "1st", label: "Place at HackUTD" },
            { value: "A* + BFS", label: "Path Routing" },
            { value: "ARKit", label: "Hardware Scanning" },
        ],
        sections: [
            {
                label: "The Problem",
                layout: "split",
                content: "Technicians in 400MW datacenters lose significant time manually prioritizing work orders and navigating complex server clusters — no tooling, just memory and paper.",
            },
            {
                label: "My Thinking",
                layout: "split",
                dark: true,
                content: "This wasn't just a UI problem — it was an optimization problem. The only way to actually reduce response time was to combine search algorithms with a mobile interface built for how technicians move through a facility.",
            },
            {
                label: "How It Was Built",
                layout: "full",
                content: <StepGrid steps={[
                    { title: "Routing Engine", detail: "Wrote a routing engine using A* and BFS to calculate the fastest path through the facility based on ticket priority and physical layout." },
                    { title: "Web Dashboard", detail: "Built a management-facing web dashboard for dispatching and monitoring active tickets across the floor." },
                    { title: "iOS AR Interface", detail: "Built an iOS AR app using ARKit that lets technicians scan a server rack to instantly identify the failed hardware." },
                ]} />,
            },
            {
                label: "The Result",
                layout: "split",
                content: "Won 1st place at HackUTD by proving the system significantly reduced technician response times and manual errors against a panel of Fortune 500 judges.",
            },
        ],
    },
};

export default function DevPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const proj = PROJECTS[id];

    if (!proj) {
        navigate("/dev");
        return null;
    }

    return (
        <div style={{ paddingTop: '88px' }}>
            <Project {...proj} onBack={() => navigate("/dev")} />
        </div>
    );
}
