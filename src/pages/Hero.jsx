import { Terminal, Mic, FolderGit2, ArrowRight, Mail } from "lucide-react"
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

export default function Hero() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [introComplete, setIntroComplete] = useState(
        () => sessionStorage.getItem("intro_done") === "true"
    );
    const [isThinking, setIsThinking] = useState(false);
    const [messages, setMessages] = useState([]); // { query, answer, route }
    const [searchCount, setSearchCount] = useState(() =>
        parseInt(localStorage.getItem("claude_search_count") || "0")
    );
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
        if (!query.trim()) return;

        if (searchCount >= 3) {
            setMessages(prev => [...prev, {
                query,
                answer: "Rate limit reached (3/3). Please explore the site manually!",
                route: null,
            }]);
            setSearch("");
            return;
        }

        setIsThinking(true);
        setSearch("");

        try {
            const res = await fetch("/api/routeAI", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text();
                console.error("Non-JSON response:", text.substring(0, 150));
                throw new Error("API route not found. Run 'vercel dev'.");
            }

            if (res.status === 429) {
                setMessages(prev => [...prev, {
                    query,
                    answer: "You've reached the limit for AI queries. Feel free to explore the site manually!",
                    route: null,
                }]);
                setIsThinking(false);
                return;
            }

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "API Error");
            }

            const data = await res.json();
            const { route, answer } = data;

            const newCount = searchCount + 1;
            setSearchCount(newCount);
            localStorage.setItem("claude_search_count", newCount.toString());

            setMessages(prev => [...prev, { query, answer, route }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                query,
                answer: "AI router is currently unavailable. Please check your API key/CORS.",
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
            className="flex flex-col w-full max-w-2xl mx-auto gap-6 px-6 animate-[fadeIn_2s_ease_forwards]"
            style={{ animation: "fadeIn 2s ease forwards" }}
        >
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

            {/* Header — fades out once a message exists */}
            <div className={`flex flex-col gap-2 items-center transition-all duration-500 ${hasMessages ? "opacity-0 h-0 overflow-hidden pointer-events-none" : "opacity-100"}`}>
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
                <div className="flex flex-col gap-4 w-full">
                    {messages.map((msg, i) => (
                        <div key={i} className="flex flex-col gap-2 w-full">
                            {/* User bubble */}
                            <div className="flex justify-end">
                                <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                                    <p className="text-sm text-white/80">{msg.query}</p>
                                </div>
                            </div>
                            {/* AI bubble */}
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

                    {/* Thinking indicator */}
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

            {/* Input bar */}
            <div className="flex flex-col gap-3 w-full">
                <div className="border border-white/10 rounded-full bg-[#111111]/80 backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)] transition-all duration-300 hover:bg-white/5 hover:border-white/20">
                    <div className="flex justify-between items-center px-5 py-3.5 text-white/80">
                        <div className="flex gap-3 flex-1 items-center">
                            <Terminal size={18} className="text-white/40 shrink-0" />
                            <input
                                type="text"
                                placeholder="Ask about my process, projects, or background..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30 text-sm"
                            />
                        </div>
                        <div className="flex gap-3 items-center shrink-0">
                            <div
                                onClick={handleSearch}
                                className={`flex items-center gap-1.5 text-xs font-medium text-white/50 bg-white/5 px-3 py-1 rounded-full cursor-pointer hover:text-white transition-colors ${searchCount >= 3 ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <span className={`w-2 h-2 rounded-full ${isThinking ? "bg-amber-500" : searchCount >= 3 ? "bg-red-500" : "bg-blue-500"} animate-pulse`} />
                                {isThinking ? "Thinking..." : `Ask AI (${Math.max(0, 3 - searchCount)} left)`}
                            </div>
                            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                                <Mic size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggestions — hide once chat starts */}
                {!hasMessages && (
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-white/40">
                        <span>Try:</span>
                        <span onClick={() => handleSearch("What is Human-Centered AI?")} className="hover:text-white cursor-pointer transition-colors border-b border-dashed border-white/20 hover:border-solid hover:border-white pb-0.5">"What is Human-Centered AI?"</span>
                        <span onClick={() => handleSearch("Show me your UX work")} className="hover:text-white cursor-pointer transition-colors border-b border-dashed border-white/20 hover:border-solid hover:border-white pb-0.5">"Show me your UX work"</span>
                        <span onClick={() => handleSearch("What's your design process?")} className="hover:text-white cursor-pointer transition-colors border-b border-dashed border-white/20 hover:border-solid hover:border-white pb-0.5">"What's your design process?"</span>
                    </div>
                )}
            </div>

            {/* Nav buttons — always visible */}
            {!hasMessages && (
                <div className="flex gap-6 justify-center items-center pt-2">
                    <button
                        onClick={() => document.getElementById("chooser")?.scrollIntoView({ behavior: "smooth" })}
                        className="flex items-center gap-2 px-6 py-3 text-sm font-medium border border-white/20 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
                    >
                        <FolderGit2 size={16} />
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
            )}
        </div>
    );
}
