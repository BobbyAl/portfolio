import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const portfolioContext = JSON.parse(readFileSync(join(__dirname, "context.json"), "utf-8"));

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

function buildContextBlock() {
    return Object.values(portfolioContext)
        .map(
            (section) =>
                `SECTION: ${section.route}\nSUMMARY: ${section.summary}\nKEYWORDS: ${section.keywords.join(", ")}`
        )
        .join("\n\n");
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: "Missing query" });
    }

    const contextBlock = buildContextBlock();

    try {
        const message = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 256,
            system: `You are an intelligent assistant embedded in Bobby Flennoy's portfolio website. Your job is to answer questions about Bobby using the context below, and then route the user to the most relevant section.

Here is Bobby's portfolio content:

${contextBlock}

INSTRUCTIONS:
- Answer the user's question conversationally and specifically using the context above (1-2 sentences max).
- Then append a route on a new line in the format: ROUTE: <route>
- Valid routes: about, experience, education, extracurriculars, chooser, footer, /dev, /ux, unknown
- Choose the route most relevant to the question.
- If the question is too vague or unrelated, use route: unknown
- Do not make up information not in the context.`,
            messages: [{ role: "user", content: query }],
        });

        const raw = message.content[0].text.trim();

        const routeMatch = raw.match(/ROUTE:\s*(\S+)/i);
        const route = routeMatch ? routeMatch[1] : "unknown";
        const answer = raw.replace(/ROUTE:\s*\S+/i, "").trim();

        return res.status(200).json({ route, answer });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
