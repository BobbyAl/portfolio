import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// ─── Primitives ───────────────────────────────────────────────────────────────

function MethodTag({ children }) {
    return (
        <span style={{
            display: "inline-block",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "rgba(255,255,255,0.85)",
            fontSize: "10px", fontWeight: 700,
            padding: "4px 12px",
            letterSpacing: "0.1em", textTransform: "uppercase",
        }}>{children}</span>
    );
}

function StatItem({ value, label }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 900, color: "#158EFF", lineHeight: 1, letterSpacing: "-0.03em" }}>
                {value}
            </span>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                {label}
            </span>
        </div>
    );
}

// ─── Image Placeholder ────────────────────────────────────────────────────────

function Placeholder({ label, aspect = "16/9", light }) {
    return (
        <div style={{
            aspectRatio: aspect,
            background: light ? "#f0ede8" : "rgba(255,255,255,0.03)",
            border: `1.5px dashed ${light ? "#d9d5ce" : "rgba(255,255,255,0.1)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: "8px",
        }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: light ? "#e0dcd6" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={light ? "#aaa" : "rgba(255,255,255,0.25)"} strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                </svg>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 600, color: light ? "#aaa" : "rgba(255,255,255,0.2)", letterSpacing: "0.05em", textAlign: "center", padding: "0 16px" }}>{label}</span>
        </div>
    );
}

// ─── Section building blocks ──────────────────────────────────────────────────

function SectionLabel({ children, light }) {
    return (
        <p style={{ fontWeight: 900, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: light ? "#bbbbbb" : "rgba(255,255,255,0.3)", margin: "0 0 24px" }}>
            {children}
        </p>
    );
}

function BigHeading({ children, light }) {
    return (
        <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.1, color: light ? "#111111" : "#ffffff", margin: "0 0 24px", maxWidth: "720px" }}>
            {children}
        </h2>
    );
}

function BodyText({ children, light, style }) {
    return (
        <p style={{ fontSize: "16px", lineHeight: 1.85, color: light ? "#444444" : "rgba(255,255,255,0.65)", margin: 0, maxWidth: "660px", ...style }}>
            {children}
        </p>
    );
}

function InsightCard({ title, body, light }) {
    return (
        <div style={{
            background: light ? "#ffffff" : "rgba(255,255,255,0.04)",
            border: `1px solid ${light ? "#e5e2dc" : "rgba(255,255,255,0.08)"}`,
            borderTop: "3px solid #158EFF",
            padding: "24px",
        }}>
            <p style={{ fontWeight: 800, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px", color: light ? "#111111" : "#ffffff" }}>{title}</p>
            <p style={{ fontSize: "14px", color: light ? "#555555" : "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>{body}</p>
        </div>
    );
}

function HeuristicBadge({ violated, principle, light }) {
    return (
        <div style={{
            display: "flex", gap: "12px", alignItems: "flex-start",
            padding: "16px",
            background: light ? "#f8f7f4" : "rgba(255,255,255,0.03)",
            border: `1px solid ${light ? "#e5e2dc" : "rgba(255,255,255,0.07)"}`,
        }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#158EFF", flexShrink: 0, marginTop: "6px" }} />
            <div>
                <p style={{ fontWeight: 700, fontSize: "13px", color: light ? "#111111" : "#ffffff", margin: "0 0 3px" }}>{violated}</p>
                <p style={{ fontSize: "11px", color: light ? "#888888" : "rgba(255,255,255,0.4)", margin: 0, fontStyle: "italic" }}>{principle}</p>
            </div>
        </div>
    );
}

function BeforeAfterPair({ label, reasoning, light }) {
    return (
        <div style={{ marginBottom: "48px" }}>
            <p style={{ fontWeight: 800, fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase", color: light ? "#111111" : "#ffffff", marginBottom: "8px" }}>{label}</p>
            <p style={{ fontSize: "14px", lineHeight: 1.75, color: light ? "#555555" : "rgba(255,255,255,0.6)", marginBottom: "20px" }}>{reasoning}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#888888" }}>Before</span>
                    <Placeholder label={`Before: ${label}`} aspect="4/3" light={light} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#158EFF" }}>After</span>
                    <Placeholder label={`After: ${label}`} aspect="4/3" light={light} />
                </div>
            </div>
        </div>
    );
}

function StepGrid({ steps }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
            {steps.map((step, i) => (
                <div key={i} style={{ background: "#ffffff", border: "1px solid #e5e2dc", padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                        <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#158EFF", color: "#fff", fontSize: "10px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontWeight: 800, fontSize: "12px", color: "#111111", letterSpacing: "0.01em" }}>{step.title}</span>
                    </div>
                    {step.detail && <p style={{ fontSize: "13px", color: "#666666", lineHeight: 1.7, margin: 0 }}>{step.detail}</p>}
                </div>
            ))}
        </div>
    );
}

// ─── Section wrappers ─────────────────────────────────────────────────────────

function NarrativeSection({ label, heading, body, dark }) {
    return (
        <div style={{ background: dark ? "#111111" : "#ffffff", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "#e5e2dc"}` }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 48px" }}>
                <SectionLabel light={!dark}>{label}</SectionLabel>
                {heading && <BigHeading light={!dark}>{heading}</BigHeading>}
                <BodyText light={!dark}>{body}</BodyText>
            </div>
        </div>
    );
}

function SplitSection({ label, dark, accentBg, children }) {
    const light = !dark;
    let bg = light ? (accentBg || "#f8f7f4") : "#111111";
    return (
        <div style={{ background: bg, borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "#e5e2dc"}` }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "72px 48px", display: "flex", gap: "64px", alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 200px" }}>
                    <SectionLabel light={light}>{label}</SectionLabel>
                </div>
                <div style={{ flex: 1, minWidth: "280px" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

function ContentSection({ label, bg, dark, children }) {
    return (
        <div style={{ background: dark ? "#111111" : (bg || "#f8f7f4"), borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "#e5e2dc"}` }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "72px 48px" }}>
                <SectionLabel light={!dark}>{label}</SectionLabel>
                {children}
            </div>
        </div>
    );
}

// ─── Case Study Hero ──────────────────────────────────────────────────────────

function CaseHero({ tag, title, tagline, methods, stats, onBack }) {
    return (
        <>
            <div style={{ background: "#158EFF", padding: "72px 48px 64px" }}>
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <button
                        onClick={onBack}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            background: "none", border: "none", cursor: "pointer",
                            color: "rgba(255,255,255,0.6)", fontSize: "11px", fontWeight: 700,
                            letterSpacing: "0.1em", textTransform: "uppercase", padding: 0, marginBottom: "44px",
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                    >
                        <ArrowLeft size={12} /> All Case Studies
                    </button>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "24px", alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase" }}>UX Research</span>
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{tag}</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.02, margin: "0 0 24px", maxWidth: "820px" }}>
                        {title}
                    </h1>
                    <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", maxWidth: "560px", lineHeight: 1.65, margin: "0 0 36px" }}>
                        {tagline}
                    </p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {methods.map(m => <MethodTag key={m}>{m}</MethodTag>)}
                    </div>
                </div>
            </div>
            {stats.length > 0 && (
                <div style={{ background: "#111111", padding: "40px 48px" }}>
                    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", gap: "64px", flexWrap: "wrap" }}>
                        {stats.map(s => <StatItem key={s.label} {...s} />)}
                    </div>
                </div>
            )}
        </>
    );
}

// ─── MavGrades ────────────────────────────────────────────────────────────────

function MavGradesCaseStudy({ onBack }) {
    return (
        <article>
            <CaseHero
                tag="Student Tool Redesign"
                title="MavGrades: Fixing What We Shipped"
                tagline="I helped build MavGrades. Then I came back and redesigned it."
                methods={["Usability Testing", "Heuristic Evaluation", "Information Architecture", "Responsive Design"]}
                stats={[
                    { value: "3", label: "Core Interactions Redesigned" },
                    { value: "5+", label: "Students Interviewed" },
                    { value: "40+", label: "Heuristic Issues Surfaced" },
                ]}
                onBack={onBack}
            />

            <SplitSection label="The Context">
                <BigHeading light>I didn't pick a random app to redesign.</BigHeading>
                <BodyText light>As president of UTA's ACM chapter, I founded ACM Development — the student engineering team that built MavGrades from scratch. I wasn't the designer on the original build. When I came back as a student advisor and watched students actually use it, I realized we had shipped something with real problems. This is what happened when I went back and fixed what we got wrong the first time.</BodyText>
            </SplitSection>

            <SplitSection label="The Problem" accentBg="#ffffff">
                <BigHeading light>Students are trying to make a decision under time pressure. Every second of friction is a second they might give up.</BigHeading>
                <BodyText light>The original design had three compounding problems. On desktop, students landed on a results page with an empty panel and a text instruction pointing nowhere. Once they clicked, they hit a cascade of three dropdowns before a single number appeared. And on mobile, the entire layout collapsed — professor list at the top, a wall of empty space, and the content buried after five scroll interactions.</BodyText>
            </SplitSection>

            <NarrativeSection
                label="Research Approach"
                heading="Informal by design. These are busy students."
                body="I gave each participant one task: find a course and navigate to its grade data. I asked them to talk through anything that felt slow or confusing. I wasn't looking for opinions — I was watching where they hesitated. Alongside the sessions, I ran a heuristic evaluation against Nielsen's 10 heuristics, tagging every issue and mapping it to the specific principle it violated."
                dark
            />

            <ContentSection label="What Students Said" bg="#ffffff">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                    <InsightCard light
                        title="The empty state costs seconds"
                        body="Every participant paused after results loaded. The instruction text said 'Select a professor' but nothing pointed toward where to go. A few seconds of confusion is normal. For a tool competing for attention during course registration, it's too long."
                    />
                    <InsightCard light
                        title="Dropdowns break the flow"
                        body="Selecting a professor triggered three more decisions in sequence — year, semester, section — each hidden behind a dropdown. Students had to complete all three before any data appeared. Sequential hidden choices cost more than visible options you can scan at once."
                    />
                    <InsightCard light
                        title="Mobile is nearly unusable"
                        body="On a phone, the split-panel layout collapsed entirely. Students scrolled into empty space before finding content. RMP data — one of the first things students wanted — required scrolling past the entire grade chart to reach."
                    />
                </div>
            </ContentSection>

            <ContentSection label="Heuristics Violated" dark>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
                    <HeuristicBadge violated="Empty state gives no directional guidance" principle="Recognition over Recall" />
                    <HeuristicBadge violated="Three dropdowns hide all available options" principle="Recognition over Recall + Aesthetic & Minimalist Design" />
                    <HeuristicBadge violated="No breadcrumb or system state feedback" principle="Visibility of System Status" />
                    <HeuristicBadge violated="Mobile layout buries primary content" principle="Aesthetic & Minimalist Design" />
                    <HeuristicBadge violated="RMP data requires excessive scroll" principle="User Control & Freedom" />
                </div>
            </ContentSection>

            <ContentSection label="Design Decisions" bg="#f8f7f4">
                <BeforeAfterPair light
                    label="Home Screen: Make the search the only thing on the page"
                    reasoning="The original split attention between brand copy on the left and search on the right. For a utility tool with a specific task, that competition is unnecessary. The redesign centers everything on a single vertical axis — tagline, search, suggestions — so the eye lands on the input without any scanning. A data freshness badge addresses a trust question before students even type."
                />
                <BeforeAfterPair light
                    label="Results Page: Replace decisions with visibility"
                    reasoning="Three dropdowns replaced with tag groups — year, semester, and section all visible simultaneously. You scan and tap instead of clicking to reveal and repeating. RMP moved from below the chart to a persistent right sidebar, putting grade data and professor reputation in view at the same time. Color-coded bars with percentages on top removed the need to estimate bar heights."
                />
                <BeforeAfterPair light
                    label="Mobile: Separate selection from content entirely"
                    reasoning="On desktop, a sidebar and content panel coexist. On mobile they can't. Professor selection moved into a filter drawer — freeing the entire viewport for data. RMP became a dedicated header button that opens a full panel on tap. One viewport, one job: show the grades."
                />
            </ContentSection>

            <SplitSection label="The Outcome" accentBg="#ffffff">
                <BigHeading light>Every failure point from the usability sessions is addressed.</BigHeading>
                <BodyText light style={{ marginBottom: "16px" }}>The empty state now directs the eye. Selection went from four sequential decisions to three simultaneous taps. Mobile went from a five-scroll journey to a single content view. RMP is one tap away on any screen size.</BodyText>
                <BodyText light>PR pending merge for Summer 2026. MavGrades will be used by UTA students during Fall 2026 registration.</BodyText>
            </SplitSection>

            <NarrativeSection
                label="What I'd Still Improve"
                body="The section tags work well for most courses but courses with many sections produce a large tag grid. A follow-up usability study on how students navigate high-section courses would be worth running before the next iteration. The compare professors flow also deserves its own study — it's a power-user feature that currently has no dedicated onboarding."
                dark
            />
        </article>
    );
}

// ─── CBRE ─────────────────────────────────────────────────────────────────────

function CBRECaseStudy({ onBack }) {
    return (
        <article>
            <CaseHero
                tag="Enterprise UX"
                title="CBRE: Grounding a Roadmap in Real User Pain"
                tagline="Replaced PM intuition with a multi-method research framework that put actual user pain points in front of the VP of Digital & Technology."
                methods={["Heuristic Evaluation", "MaxDiff Survey", "VADER Sentiment Analysis", "Data Synthesis", "Usability Testing"]}
                stats={[
                    { value: "500+", label: "Users Surveyed" },
                    { value: "40+", label: "Usability Issues Surfaced" },
                    { value: "VP-Level", label: "Stakeholder Presentation" },
                ]}
                onBack={onBack}
            />

            <NarrativeSection
                label="The Problem"
                heading="Feature prioritization was gut feel, not evidence."
                body="The facility management platform had no structured way to know which problems were actually hurting users most. PMs were prioritizing by instinct. There was no case to make for fixing existing issues over shipping new features — because no one had built that case yet."
            />

            <NarrativeSection
                label="My Thinking"
                heading="A single method wouldn't be convincing enough."
                body="I needed a confirmation loop. Find the pain points through a structured audit, then check whether real users had been reporting the same things for months. If the heuristic findings matched historical data, the argument for fixing them becomes hard to dismiss — it's no longer my opinion against someone else's roadmap."
                dark
            />

            <ContentSection label="The Process">
                <StepGrid steps={[
                    { title: "Heuristic Evaluation", detail: "Audited the platform against Nielsen's 10 heuristics, surfacing 40+ issues across 11 tags. Built an Airtable template so the team could run future evaluations without starting from scratch." },
                    { title: "Historical Data Synthesis", detail: "Used Python with Pandas and VADER sentiment analysis to cross-reference HE findings against months of historical open-ended survey responses." },
                    { title: "MaxDiff Survey", detail: "Designed the survey from scratch using Alchemer. Recruited 500+ internal facility managers and drafted all recruitment emails." },
                    { title: "Live Prototype Validation", detail: "Built functional Figma prototypes and ran live usability sessions, validating fixes with real users within the same research cycle." },
                ]} />
            </ContentSection>

            <ContentSection label="Key Findings" dark>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                    <InsightCard
                        title="Search & Filtering"
                        body="Consistently the most negatively reported pain point across both the heuristic evaluation and historical survey data."
                    />
                    <InsightCard
                        title="Information-Dense Tables"
                        body="A major part of users' jobs involves reading data tables. The current design created cognitive overload — too much information with insufficient visual hierarchy."
                    />
                    <InsightCard
                        title="Confirmation Loop"
                        body="The same pain points appeared in the HE audit AND months of historical user reports. Two independent sources pointing at the same issues made the findings hard to dismiss."
                    />
                </div>
            </ContentSection>

            <NarrativeSection
                label="The Impact"
                heading="The team moved from prioritizing by instinct to prioritizing by data."
                body="Delivered a research-backed presentation to the Director of Product and VP of Digital & Technology. The Q3/Q4 engineering roadmap was directly informed by the MaxDiff feature ranking. The Airtable evaluation template I built is still in use for future audits."
            />
        </article>
    );
}

// ─── Pearl Discovery ──────────────────────────────────────────────────────────

function PearlCaseStudy({ onBack }) {
    return (
        <article>
            <CaseHero
                tag="EdTech · AI Systems"
                title="Pearl Discovery: Closing the 60-Day Teacher Gap"
                tagline="Discovery research uncovered how teachers really learn about students — and the finding reshaped the product roadmap."
                methods={["Discovery Interviews", "Mental Model Mapping", "Affinity Mapping", "Dashboard Design", "HITL Design"]}
                stats={[
                    { value: "7", label: "Participants Interviewed" },
                    { value: "3", label: "User Types" },
                    { value: "5/7", label: "Confirmed Core Finding" },
                ]}
                onBack={onBack}
            />

            <NarrativeSection
                label="The Problem"
                heading="Teachers spend the first 60 days of every semester just figuring out who their students are."
                body="That's two months of guesswork before any informed coaching can happen. Students most at risk of falling behind go unseen. Pearl Discovery aims to collapse that gap — but only if the system is built around how teachers actually think, not how we assume they think."
            />

            <NarrativeSection
                label="My Thinking"
                heading="If we built a tool around the wrong mental model, teachers wouldn't trust it."
                body="Before designing anything, I needed to understand how teachers actually build that understanding — not the official process, but the real one. What causes a teacher to feel like they genuinely know a student? When does it happen? Is it deliberate or accidental? The answers to those questions would determine what we built."
                dark
            />

            <ContentSection label="Research Process">
                <StepGrid steps={[
                    { title: "Participant Recruitment", detail: "Recruited 7 participants across three user types: teachers, coaches, and parents. Intentionally varied to understand how the gap is experienced from different angles." },
                    { title: "Discovery Interviews", detail: "Semi-structured interviews focused on one question: how do you actually come to understand a new student? Not the process it's supposed to be — what it really looks like." },
                    { title: "Mental Model Mapping", detail: "Mapped themes across interviews to build a picture of how understanding of students actually develops over time, looking for patterns across participant types." },
                    { title: "Roadmap Translation", detail: "Took the core finding directly to the product team. The insight didn't just inform a design decision — it added a feature to the roadmap that didn't exist before the interviews." },
                ]} />
            </ContentSection>

            <ContentSection label="Core Finding" dark>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                    <InsightCard
                        title="5 of 7 confirmed this"
                        body="Genuine understanding of a student rarely follows a deliberate process. It surfaces during peer collaboration — when students are working alongside others and their real behavioral qualities come out naturally."
                    />
                    <InsightCard
                        title="What this means for the product"
                        body="If the most meaningful signal appears during group interaction, the platform needs to track how students' behavioral profiles interact with each other — not just how each student scores across five individual pillars."
                    />
                </div>
            </ContentSection>

            <ContentSection label="Dashboard Design" bg="#ffffff">
                <BodyText light style={{ marginBottom: "32px" }}>Interviews revealed what teachers want to see. Two levels of view came directly from what participants said: an at-a-glance profile for each individual student, and a picture of how the whole class is trending behaviorally.</BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                        <p style={{ fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaaaaa", marginBottom: "10px" }}>Wireframes</p>
                        <Placeholder label="Dashboard wireframes" aspect="4/3" light />
                    </div>
                    <div>
                        <p style={{ fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaaaaa", marginBottom: "10px" }}>Prototype</p>
                        <Placeholder label="Dashboard prototype (in progress)" aspect="4/3" light />
                    </div>
                </div>
            </ContentSection>

            <NarrativeSection
                label="The Impact"
                heading="The research changed what we're building, not just how we're presenting it."
                body="A feature that didn't exist before the interviews — peer interaction analysis — is now on the roadmap because of a finding about how behavioral understanding actually works in practice. Platform is in development. Coach usability testing is the next phase."
            />
        </article>
    );
}

// ─── HCI ──────────────────────────────────────────────────────────────────────

function HCICaseStudy({ onBack }) {
    return (
        <article>
            <CaseHero
                tag="HCI Research · AI Tooling"
                title="AI-Augmented Digital Fabrication"
                tagline="Built a domain-specific AI assistant grounded in expert knowledge — and tested whether that grounding actually changed how much users trusted it."
                methods={["Contextual Inquiry", "Physical Card Sorting", "Taxonomy Construction", "React Prototyping", "Likert Trust Survey"]}
                stats={[
                    { value: "5", label: "Domain Experts" },
                    { value: "2", label: "AI Systems Compared" },
                    { value: "↑ Trust", label: "Directional Finding" },
                ]}
                onBack={onBack}
            />

            <NarrativeSection
                label="The Problem"
                heading="Generic AI tools produce generic output. For expert users, generic is unusable."
                body="Most AI tools don't understand the physical constraints and expert strategies that come with laser cutting. They produce plausible-sounding suggestions that fall apart when an actual fabrication expert tries to use them — meaning the tool gets dismissed before it ever gets adopted."
            />

            <NarrativeSection
                label="My Thinking"
                heading="To build a better tool, you have to encode how experts actually think — not just what they know."
                body="If I could capture the vocabulary, decision hierarchy, and constraints that domain experts use when thinking about fabrication strategies, I could build a system that reasons within those constraints instead of pattern-matching from general text. The card sort was how I got that knowledge out of people's heads and into a structure I could encode."
                dark
            />

            <ContentSection label="The Card Sort" bg="#ffffff">
                <BodyText light style={{ marginBottom: "32px" }}>I ran sorting exercises with 5 digital fabrication experts using physical printed cards — a deliberate methodological choice. 100% of participants said they'd prefer physical cards over a digital tool when asked beforehand. These are hands-first people who work in a fabrication lab every day. A screen would have felt foreign to how they actually think. I piloted the exercise with fellow researchers first using Optimal Workshop before committing to the physical format.</BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                    <Placeholder label="Card sort in progress — FabLab" aspect="4/3" light />
                    <Placeholder label="Physical cards designed for sorting" aspect="4/3" light />
                    <Placeholder label="Participant building hierarchy" aspect="4/3" light />
                </div>
            </ContentSection>

            <ContentSection label="The Taxonomy" dark>
                <BodyText style={{ marginBottom: "32px" }}>Used the sort results to build a structured taxonomy of laser-cutting strategies — mapping relationships between techniques, material constraints, and fabrication decisions in the way experts actually organize that knowledge.</BodyText>
                <Placeholder label="Laser-cutting taxonomy (full)" aspect="21/9" />
            </ContentSection>

            <ContentSection label="The AI Build + Trust Study">
                <StepGrid steps={[
                    { title: "React Prototype", detail: "Built a React-based AI assistant constrained by the taxonomy, designed to help users generate their own ideas rather than just produce outputs. Keeping the human in the loop on creative decisions was the core design principle." },
                    { title: "Comparative Study", detail: "Tested the domain-specific assistant against a generic LLM using a Likert trust survey with the same 5 participants. Measured trust, perceived accuracy, and creative utility." },
                    { title: "Directional Finding", detail: "Preliminary results showed higher trust ratings for the domain-specific system. Not statistically significant at n=5, but a strong enough directional signal to warrant a larger follow-up study." },
                ]} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "32px" }}>
                    <Placeholder label="AI assistant mockup — domain specific" aspect="4/3" light />
                    <Placeholder label="AI assistant mockup — generic LLM" aspect="4/3" light />
                </div>
            </ContentSection>

            <NarrativeSection
                label="The Finding"
                heading="Contextual grounding mattered more than raw model capability."
                body="Specialist users trusted the tool that spoke their language over the one that just sounded confident. That's a design principle with implications well beyond this study — domain-specific knowledge structures may be more valuable than general capability for expert users. At n=5, this is directional, not definitive. A strong enough signal to warrant a larger follow-up study."
            />
        </article>
    );
}

// ─── Router ───────────────────────────────────────────────────────────────────

const CASE_STUDY_MAP = {
    mavgrades: MavGradesCaseStudy,
    cbre: CBRECaseStudy,
    pearl: PearlCaseStudy,
    hci: HCICaseStudy,
};

export default function UXCasePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const CaseStudy = CASE_STUDY_MAP[id];

    if (!CaseStudy) {
        navigate("/ux");
        return null;
    }

    return (
        <div style={{ paddingTop: "88px", background: "#ffffff", minHeight: "100vh" }}>
            <CaseStudy onBack={() => navigate("/ux")} />
        </div>
    );
}
