import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PROJECTS = [
    {
        id: "teachtrack",
        index: "01",
        tag: "Full-Stack · Data Integrity",
        title: "TeachTrack: Academic Analytics",
        tagline: "A learning management system built around strict data privacy and clear accreditation metrics.",
        stack: ["Supabase (Postgres)", "React", "Next.js", "Node.js", "JWT", "Redis"],
        stats: [
            { value: "JWT", label: "Secure Auth" },
            { value: "FERPA", label: "Compliant" },
            { value: "Redis", label: "Caching Layer" },
        ],
    },
    {
        id: "smartdash",
        index: "02",
        tag: "Cloud Architecture · IoT",
        title: "SmartDash: Event-Driven IoT",
        tagline: "A cloud-native pipeline built to process high-frequency hardware telemetry for predictive maintenance.",
        stack: ["Google Cloud Platform", "Pub/Sub", "BigQuery", "Firestore", "Python"],
        stats: [
            { value: "1Hz", label: "Telemetry Rate" },
            { value: "1000s", label: "Device Streams" },
            { value: "Serverless", label: "Infrastructure" },
        ],
    },
    {
        id: "taskflow",
        index: "03",
        tag: "Algorithms · iOS/Web",
        title: "TaskFlow: Datacenter Engine",
        tagline: "Pathfinding algorithms and an AR interface built to speed up technician response times in 400MW facilities.",
        stack: ["React", "Python", "Swift (ARKit)", "A* Algorithm", "BFS"],
        stats: [
            { value: "1st", label: "Place at HackUTD" },
            { value: "A* + BFS", label: "Path Routing" },
            { value: "ARKit", label: "Hardware Scanning" },
        ],
    },
];

export default function DevGallery() {
    const navigate = useNavigate();

    return (
        <div style={{ paddingTop: '88px', minHeight: '100vh', background: '#f8f7f4' }}>

            {/* Page header */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '72px 48px 64px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                    <div style={{ width: '32px', height: '3px', background: '#158EFF', flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#158EFF', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                        Software Engineering Portfolio
                    </span>
                </div>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900,
                    color: '#111111', letterSpacing: '-0.03em', lineHeight: 1.02,
                    margin: '0 0 20px',
                }}>
                    Projects
                </h1>
                <p style={{ fontSize: '18px', color: '#777777', maxWidth: '480px', lineHeight: 1.65, margin: 0 }}>
                    High-frequency data pipelines, secure cloud architecture, and algorithms that solve real problems.
                </p>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #e5e2dc' }} />

            {/* Project list */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px' }}>
                {PROJECTS.map((proj) => (
                    <button
                        key={proj.id}
                        onClick={() => navigate(`/dev/${proj.id}`)}
                        style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid #e5e2dc',
                            padding: '56px 0',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => e.currentTarget.querySelector('.proj-title').style.color = '#158EFF'}
                        onMouseLeave={e => e.currentTarget.querySelector('.proj-title').style.color = '#111111'}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

                            {/* Index + tag row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span style={{
                                    fontSize: '11px', fontWeight: 800, color: '#158EFF',
                                    letterSpacing: '0.15em', textTransform: 'uppercase',
                                }}>
                                    {proj.index}
                                </span>
                                <span style={{ width: '20px', height: '1px', background: '#cccccc', flexShrink: 0 }} />
                                <span style={{
                                    fontSize: '11px', fontWeight: 600, color: '#999999',
                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                }}>
                                    {proj.tag}
                                </span>
                            </div>

                            {/* Title + arrow */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px' }}>
                                <h2
                                    className="proj-title"
                                    style={{
                                        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900,
                                        color: '#111111', letterSpacing: '-0.02em', lineHeight: 1.1,
                                        margin: 0, transition: 'color 0.15s', flex: 1,
                                    }}
                                >
                                    {proj.title}
                                </h2>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    border: '1px solid #e5e2dc', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px',
                                }}>
                                    <ArrowRight size={16} color="#158EFF" />
                                </div>
                            </div>

                            {/* Tagline */}
                            <p style={{
                                fontSize: '15px', color: '#666666', lineHeight: 1.7,
                                margin: 0, maxWidth: '620px',
                            }}>
                                {proj.tagline}
                            </p>

                            {/* Stats + stack row */}
                            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                                {/* Stats */}
                                <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}>
                                    {proj.stats.map(s => (
                                        <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <span style={{
                                                fontSize: '1.35rem', fontWeight: 900,
                                                color: '#158EFF', lineHeight: 1, letterSpacing: '-0.02em',
                                            }}>
                                                {s.value}
                                            </span>
                                            <span style={{
                                                fontSize: '10px', fontWeight: 600, color: '#aaaaaa',
                                                textTransform: 'uppercase', letterSpacing: '0.1em',
                                            }}>
                                                {s.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Stack — dot-separated, no pill borders */}
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    {proj.stack.map((s, si) => (
                                        <span key={s} style={{
                                            fontSize: '11px', fontWeight: 600,
                                            color: '#158EFF', letterSpacing: '0.02em',
                                        }}>
                                            {s}{si < proj.stack.length - 1 && <span style={{ color: '#cccccc', marginLeft: '6px' }}>·</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </button>
                ))}
            </div>

            <div style={{ height: '96px' }} />
        </div>
    );
}
