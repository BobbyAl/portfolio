import { Terminal, FolderGit2, ArrowRight, Mail, ChevronDown } from "lucide-react"
import { FaLinkedin } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import TextType from "../components/libraries/TextType";
import { useNavigate } from "react-router-dom";

const INTRO_TEXT = "Hello Stranger!";
const INTRO_DURATION = INTRO_TEXT.length * 80 + 1200;

const ROUTE_LABELS = {
    "about":            "Learn more about Bobby",
    "experience":       "See experience",
    "education":        "See education",
    "extracurriculars": "See extracurriculars",
    "chooser":          "Browse projects",
    "footer":           "Jump to contact",
    "/dev":             "See dev projects",
    "/ux":              "See UX projects",
};

const SUGGESTIONS = [
    "How did you run the CBRE research?",
    "Show me your UX work",
    "What's your research process?",
];

export default function Hero() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [introComplete, setIntroComplete] = useState(
        () => sessionStorage.getItem("intro_done") === "true"
    );
    const [isThinking, setIsThinking] = useState(false);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [messages, setMessages] = useState([]);
    const chatBottomRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIntroComplete(true);
            sessionStorage.setItem("intro_done", "true");
        }, INTRO_DURATION);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (chatBottomRef.current) {
            chatBottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [messages, isThinking]);

    const handleSearch = async (overrideQuery) => {
        const query = typeof overrideQuery === "string" ? overrideQuery : search;
        if (!query.trim() || isThinking || isRateLimited) return;

        setIsThinking(true);
        setSearch("");

        try {
            const res = await fetch("/api/routeAI", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });

            if (res.status === 429) {
                setIsRateLimited(true);
                setMessages(prev => [...prev, {
                    query,
                    answer: "You've hit the daily limit for AI queries — come back tomorrow, or feel free to explore the site on your own.",
                    route: null,
                }]);
                setIsThinking(false);
                return;
            }

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Unexpected response from server.");
            }

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Something went wrong.");
            }

            const data = await res.json();
            const { route, answer } = data;
            setMessages(prev => [...prev, { query, answer, route }]);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                query,
                answer: "Something went wrong on my end. Try exploring the site manually in the meantime.",
                route: null,
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleRoute = (route) => {
        if (!route || route === "unknown") return;
        if (route === "/dev" || route === "/ux") {
            navigate(route);
        } else if (route === "footer") {
            document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" });
        } else {
            document.getElementById(route)?.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (!introComplete) {
        return (
            <div className="flex items-center justify-center w-full max-w-4xl mx-auto">
                <TextType
                    text={[INTRO_TEXT]}
                    typingSpeed={80}
                    pauseDuration={9999}
                    showCursor
                    cursorCharacter="|"
                    className="text-5xl md:text-8xl font-semibold"
                />
            </div>
        );
    }

    const hasMessages = messages.length > 0 || isThinking;

    return (
        <div
            className="flex flex-col w-full max-w-2xl mx-auto px-6 animate-[fadeIn_2s_ease_forwards]"
            style={{ animation: "fadeIn 2s ease forwards" }}
        >
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

            {/* Header — fades out once a message exists */}
            <div className={`flex flex-col gap-2 items-center mb-10 transition-all duration-500 ${hasMessages ? "opacity-0 h-0 mb-0 overflow-hidden pointer-events-none" : "opacity-100"}`}>
                <span className="text-xl font-medium text-white/60 tracking-wider uppercase">Hey, Stranger</span>
                <TextType
                    text={["Where should we begin?", "What do you want to know?", "Ask me anything"]}
                    typingSpeed={80}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="|"
                    className="text-3xl md:text-5xl font-bold tracking-tight text-white text-center"
                />
            </div>

            {/* Chat thread */}
            {hasMessages && (
                <div className="flex flex-col gap-4 w-full mb-6">
                    {messages.map((msg, i) => (
                        <div key={i} className="flex flex-col gap-2 w-full">
                            <div className="flex justify-end">
                                <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                                    <p className="text-sm text-white/80">{msg.query}</p>
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                                    <p className="text-sm text-white/90 leading-relaxed">{msg.answer}</p>
                                    {msg.route && msg.route !== "unknown" && (
                                        <button
                                            onClick={() => handleRoute(msg.route)}
                                            className="flex items-center gap-2 self-start text-xs font-semibold text-black bg-white hover:bg-gray-200 transition-colors px-4 py-2 rounded-full"
                                        >
                                            {ROUTE_LABELS[msg.route] ?? "Explore"}
                                            <ArrowRight size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isThinking && (
                        <div className="flex justify-start">
                            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:0ms]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:300ms]" />
                            </div>
                        </div>
                    )}
                    <div ref={chatBottomRef} />
                </div>
            )}

            {/* Search bar */}
            <div className="flex flex-col gap-4 w-full">
                <div className={`
                    border rounded-2xl bg-[#111111]/80 backdrop-blur-xl
                    shadow-[0_0_40px_-15px_rgba(255,255,255,0.08)]
                    transition-all duration-300
                    focus-within:border-white/30
                    focus-within:shadow-[0_0_60px_-10px_rgba(255,255,255,0.18)]
                    ${isRateLimited
                        ? "opacity-50 border-white/10 pointer-events-none"
                        : "border-white/15 hover:border-white/25"
                    }
                `}>
                    <div className="flex justify-between items-center px-5 py-4 gap-3">
                        <div className="flex gap-3 flex-1 items-center min-w-0">
                            <Terminal size={16} className="text-white/30 shrink-0" />
                            <input
                                type="text"
                                placeholder={isRateLimited
                                    ? "Daily limit reached — come back tomorrow"
                                    : "Ask about my process, projects, or background..."
                                }
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                disabled={isRateLimited}
                                className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder:text-white/25 text-sm disabled:cursor-not-allowed"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={isThinking || isRateLimited}
                            className={`
                                shrink-0 flex items-center gap-2 text-xs font-semibold
                                rounded-full px-4 py-2 transition-all duration-200
                                ${isThinking
                                    ? "bg-white/10 text-white/50 cursor-wait"
                                    : "bg-white text-black hover:bg-white/90 active:scale-95 cursor-pointer"
                                }
                            `}
                        >
                            {isThinking ? (
                                <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                                    Thinking
                                </>
                            ) : (
                                <>
                                    Ask
                                    <ArrowRight size={11} />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Suggestion chips */}
                {!hasMessages && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {SUGGESTIONS.map((s) => (
                            <button
                                key={s}
                                onClick={() => handleSearch(s)}
                                className="
                                    text-xs text-white/40 border border-white/10 rounded-full
                                    px-4 py-2 bg-white/[0.03]
                                    hover:text-white/80 hover:border-white/25 hover:bg-white/[0.07]
                                    transition-all duration-200 cursor-pointer
                                "
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* CTA buttons + scroll hint */}
            {!hasMessages && (
                <div className="flex flex-col items-center gap-6 mt-10">
                    <div className="flex gap-4 justify-center items-center">
                        <button
                            onClick={() => document.getElementById("chooser")?.scrollIntoView({ behavior: "smooth" })}
                            className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
                        >
                            <FolderGit2 size={15} />
                            <span>Projects</span>
                        </button>
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium border border-white/20 rounded-full bg-transparent text-white hover:bg-white/10 transition-colors">
                                <span>Let's Connect</span>
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="flex flex-col w-48 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-1.5">
                                    <a
                                        href="mailto:flennoy.bobby@gmail.com"
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm rounded-xl"
                                    >
                                        <Mail size={14} />
                                        Email me
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/bobby-flennoy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm rounded-xl"
                                    >
                                        <FaLinkedin size={14} />
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll hint */}
                    <button
                        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                        className="flex flex-col items-center gap-1.5 text-white/20 hover:text-white/50 transition-colors duration-200 group"
                    >
                        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll to explore</span>
                        <ChevronDown size={14} className="animate-bounce" />
                    </button>
                </div>
            )}
        </div>
    );
}