
export default function Resume () {

    const education = [
        {
            school: "University of Texas at Arlington",
            degree: "B.S. Computer Science",
            minor: "Neuroscience",
            grad: "Aug. 2026",
            location: "Arlington, Texas"
        },
    ]

    const experience = [
        {
            title: "UX Research Intern", 
            company: "CBRE",
            period: "Jun. 2025 - Aug. 2025",
            location: "Richardson, Texas",
            bullets: [
                "Did something impactful here.",
                "Built something cool.",
            ],
        },
        {
            title: "HCI Researcher", 
            company: "Hybrid Atelier Lab",
            period: "May. 2024 - Aug. 2024",
            location: "Arlington, Texas",
            bullets: [
                "Did something impactful here.",
                "Built something cool.",
            ],
        },
        {
            title: "Product Researcher & Developer", 
            company: "Pearl Discovery",
            period: "Mar. 2026 - Present",
            location: "Remote",
            bullets: [
                "Did something impactful here.",
                "Built something cool.",
            ],
        },

    ]
    
    return (
        <div className="max-w-2xl mx-auto px-6 py-16">
            <section className="mb-16">
                <h2 className="text-xl font-semibold mb-8 flex items-center gap-3">
                    <span>[ ]</span> Eduction
                </h2>
                <div className="relative border-l border-black pl-8 flex flex-col gap-8">
                    {education.map( (item, i) => (
                        <div key={i} className="relative">
                            <span className="absolute -left-9 top-1 w-2 h-2 rounded-full bg-amber-800"/>
                            <div className="font-medium">{item.school}</div>
                            <div className="text-sm">{item.degree}</div>
                            <div className="text-xs">{item.minor}</div>
                            <div className="text-sm">{item.period}</div>
                            <div>{item.location}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>
                    <span>[ ]</span> Experience
                </h2>
                <div>
                    {experience.map( (item, i) => (
                        <div key={i}>
                            <span />
                            <div></div>
                            <div></div>
                            <div></div>
                            <div>
                                {item.period} · <span>{item.duration}</span>
                            </div>
                            <div></div>
                            <ul>
                                {item.bullets.map( (b, j) => (
                                    <li key={j}>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}