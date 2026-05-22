import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CASE_STUDIES = [
    {
        id: "mavgrades",
        index: "01",
        tag: "Student Tool Redesign",
        title: "MavGrades: Fixing What We Shipped",
        tagline: "I helped build MavGrades. Then I came back and redesigned it.",
        methods: ["Usability Testing", "Heuristic Evaluation", "Information Architecture", "Responsive Design"],
        stats: [
            { value: "3", label: "Interactions Redesigned" },
            { value: "5+", label: "Students Interviewed" },
            { value: "40+", label: "Heuristic Issues" },
        ],
    },
    {
        id: "cbre",
        index: "02",
        tag: "Enterprise UX",
        title: "CBRE: Grounding a Roadmap in Real User Pain",
        tagline: "Replaced PM intuition with a multi-method research framework that put actual user pain points in front of the VP of Digital & Technology.",
        methods: ["Heuristic Evaluation", "MaxDiff Survey", "VADER Sentiment Analysis", "Usability Testing"],
        stats: [
            { value: "500+", label: "Users Surveyed" },
            { value: "40+", label: "Issues Surfaced" },
            { value: "VP-Level", label: "Presentation" },
        ],
    },
    {
        id: "pearl",
        index: "03",
        tag: "EdTech · AI Systems",
        title: "Pearl Discovery: Closing the 60-Day Teacher Gap",
        tagline: "Discovery research uncovered how teachers really learn about students — and the finding reshaped the product roadmap.",
        methods: ["Discovery Interviews", "Mental Model Mapping", "Affinity Mapping", "Dashboard Design"],
        stats: [
            { value: "7", label: "Participants" },
            { value: "3", label: "User Types" },
            { value: "60-Day", label: "Gap Addressed" },
        ],
    },
    {
        id: "hci",
        index: "04",
        tag: "HCI Research · AI Tooling",
        title: "AI-Augmented Digital Fabrication",
        tagline: "Built a domain-specific AI assistant grounded in expert knowledge — and tested whether that grounding actually changed how much users trusted it.",
        methods: ["Contextual Inquiry", "Card Sorting", "Taxonomy Construction", "React Prototyping"],
        stats: [
            { value: "5", label: "Domain Experts" },
            { value: "2", label: "AI Systems Compared" },
            { value: "↑ Trust", label: "Key Finding" },
        ],
    },
];

export default function UXGallery() {
    const navigate = useNavigate();

    return (
        <div style={{ paddingTop: '88px', minHeight: '100vh', background: '#f8f7f4' }}>

            {/* Page header */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '72px 48px 64px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                    <div style={{ width: '32px', height: '3px', background: '#158EFF', flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#158EFF', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                        UX Research Portfolio
                    </span>
                </div>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900,
                    color: '#111111', letterSpacing: '-0.03em', lineHeight: 1.02,
                    margin: '0 0 20px',
                }}>
                    Case Studies
                </h1>
                <p style={{ fontSize: '18px', color: '#777777', maxWidth: '480px', lineHeight: 1.65, margin: 0 }}>
                    Research that changed what got built, not just how it was presented.
                </p>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #e5e2dc' }} />

            {/* Case study list */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px' }}>
                {CASE_STUDIES.map((cs, i) => (
                    <button
                        key={cs.id}
                        onClick={() => navigate(`/ux/${cs.id}`)}
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
                        className="group"
                        onMouseEnter={e => e.currentTarget.querySelector('.cs-title').style.color = '#158EFF'}
                        onMouseLeave={e => e.currentTarget.querySelector('.cs-title').style.color = '#111111'}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

                            {/* Index + tag row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span style={{
                                    fontSize: '11px', fontWeight: 800, color: '#158EFF',
                                    letterSpacing: '0.15em', textTransform: 'uppercase',
                                    fontVariantNumeric: 'tabular-nums',
                                }}>
                                    {cs.index}
                                </span>
                                <span style={{ width: '20px', height: '1px', background: '#cccccc', flexShrink: 0 }} />
                                <span style={{
                                    fontSize: '11px', fontWeight: 600, color: '#999999',
                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                }}>
                                    {cs.tag}
                                </span>
                            </div>

                            {/* Title + arrow */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px' }}>
                                <h2
                                    className="cs-title"
                                    style={{
                                        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900,
                                        color: '#111111', letterSpacing: '-0.02em', lineHeight: 1.1,
                                        margin: 0, transition: 'color 0.15s', flex: 1,
                                    }}
                                >
                                    {cs.title}
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
                                {cs.tagline}
                            </p>

                            {/* Stats + methods row */}
                            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                                {/* Stats */}
                                <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}>
                                    {cs.stats.map(s => (
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

                                {/* Methods — plain text, no pill borders */}
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    {cs.methods.map((m, mi) => (
                                        <span key={m} style={{
                                            fontSize: '11px', fontWeight: 600,
                                            color: '#158EFF', letterSpacing: '0.02em',
                                        }}>
                                            {m}{mi < cs.methods.length - 1 && <span style={{ color: '#cccccc', marginLeft: '6px' }}>·</span>}
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
