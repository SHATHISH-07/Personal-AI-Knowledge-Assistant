function buildPrompt(question: string, context: string) {
    return `
You are an AI assistant.
Answer ONLY using the context below.
If the answer is not present, say "I don't know".

Context:
${context}

Question:
${question}

Answer:
`;
}
export { buildPrompt };