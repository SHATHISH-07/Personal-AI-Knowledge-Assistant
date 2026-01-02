import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

@Injectable()
export class GroqService {
    private apiKey: string;
    private model: string;

    constructor(private config: ConfigService) {
        this.apiKey = this.config.get<string>('GROQ_API_KEY')!;
        this.model =
            this.config.get<string>('GROQ_MODEL') || 'llama-3.1-8b-instant';
    }

    async generate(prompt: string): Promise<string> {
        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.2,
                }),
            },
        );

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Groq API error: ${err}`);
        }

        const data: any = await response.json();

        return (
            data?.choices?.[0]?.message?.content ??
            "I don't know."
        );
    }
}

