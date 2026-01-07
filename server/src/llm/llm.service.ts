import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import fetch from "node-fetch";

@Injectable()
export class GroqService {
    private apiKey: string;
    private model: string;

    constructor(private config: ConfigService) {
        this.apiKey = this.config.get<string>("GROQ_API_KEY")!;
        this.model =
            this.config.get<string>("GROQ_MODEL") || "llama-3.1-8b-instant";
    }

    async generate(question: string, context: string): Promise<string> {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: "system",
                            content: `
You are a Senior Technical Architect and Developer Expert.

### 🎨 VISUAL & FORMATTING RULES (STRICT):

1. **MAIN HEADERS (High Priority):**
   - MUST use **Heading 1 (#)** or **Heading 2 (##)** Markdown tags.
   - MUST include a relevant **Emoji** at the start.
   - Example: "# 🚀 Deployment Strategy" (Big, Bold, Visual).

2. **LISTS & SPACING:**
   - Use **bullet points (*)** for all lists.
   - **Bold** key terms, technologies, or numbers.
   - **CRITICAL:** Leave an empty line between list items to create space.
   - Add a horizontal rule (---) between major sections.

3. **CODE BLOCKS (Strict):**
   - ALL code snippets MUST be inside fenced code blocks.
   - You MUST specify the language tag (e.g., \`\`\`typescript, \`\`\`css).
   - Do NOT inline large chunks of code.

4. **CONTENT:**
   - Answer directly. Avoid filler phrases like "Based on the context...".
   - Use ONLY the provided information.
   - If the answer is not in the context, say: "I don't know."

### EXAMPLE OUTPUT:
# 🖥️ Frontend Stack
* **React**: UI Library
* **Tailwind**: CSS Framework

---

# ⚙️ Backend Config
\`\`\`typescript
const app = express();
\`\`\`
`,
                        },
                        {
                            role: "user",
                            content: `
### Information
${context}

### Question
${question}
`,
                        },
                    ],
                    // Temperature 0.35: A sweet spot between strict formatting and creative coding
                    temperature: 0.35,
                }),
            }
        );

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Groq API error: ${error}`);
        }

        const data: any = await response.json();
        return data?.choices?.[0]?.message?.content ?? "I don't know.";
    }
}