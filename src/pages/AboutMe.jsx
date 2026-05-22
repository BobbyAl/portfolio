import ProfileImage from "../assets/img.webp"
import { ArrowRight } from "lucide-react";

export default function AboutMe() {
    return (
        <div className="flex flex-col w-full py-24" style={{ borderTop: '1px solid #e5e2dc' }}>
            <div className="flex flex-col w-full max-w-6xl mx-auto gap-20 px-6 md:px-12">

                {/* Section label */}
                <div className="flex items-center gap-4">
                    <div style={{ width: '32px', height: '3px', background: '#158EFF', flexShrink: 0 }} />
                    <span className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: '#158EFF' }}>
                        About Me
                    </span>
                </div>

                <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-20">
                    <div className="flex flex-col gap-8 flex-1">

                        <h2 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight" style={{ color: '#111111' }}>
                            People have always been the most interesting thing to study.
                        </h2>

                        <div className="flex flex-col gap-4 text-base md:text-lg leading-relaxed max-w-xl" style={{ color: '#555555' }}>
                            <p>
                                I studied Cognitive Neuroscience because I wanted to understand people on a deeper level.
                                Not just what they do, but why. Why does Hick's Law hold up? What is actually happening
                                when cognitive load gets too high? What makes one interaction feel natural and another
                                feel like friction? Those questions pulled me toward neuroscience, and the answers
                                pulled me toward design and engineering.
                            </p>
                            <p>
                                Today I work at the intersection of both. I bring that understanding of human behavior
                                into every research study I run and every product I build. The goal is always the same:
                                create experiences that genuinely fit the people using them.
                            </p>
                        </div>

                        <button
                            onClick={() => document.getElementById('chooser')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold w-fit transition-opacity hover:opacity-80"
                            style={{ background: '#158EFF', color: '#ffffff' }}
                        >
                            Explore My Work
                            <ArrowRight size={14} />
                        </button>
                    </div>

                    {/* Profile image */}
                    <div className="w-full max-w-xs md:max-w-sm shrink-0">
                        <div className="overflow-hidden" style={{ aspectRatio: '3/4', background: '#e8e5e0' }}>
                            <img
                                src={ProfileImage}
                                className="w-full h-full object-cover object-top"
                                style={{ filter: 'grayscale(15%)' }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
