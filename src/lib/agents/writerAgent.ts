import { callGroq } from "../groqClient";

export async function writerAgent(research: string): Promise<string> {
  const prompt = `
You are a professional blog writer.

Write a high-quality, engaging blog post based on the following research notes.

🧠 These research notes were generated by another agent and contain factual, reliable information about a specific topic.

**📝 Your task:**
- Use the research to craft a compelling, reader-focused blog post without copying it directly.
- DO NOT add made-up facts or hallucinate.
- Use a helpful, confident, and informative tone that connects emotionally with the reader.
- **Integrate Real-World Examples and Case Studies:** Use the provided examples to ground the discussion and add credibility.
- **Highlight Practical Benefits:** Clearly articulate the real-world impact, like cost savings, increased efficiency, or customer satisfaction.
- Use second-person language ("you") to enhance reader engagement.
- **Personalize the Reader Experience:** Use relatable scenarios to make the content feel directly applicable to the reader's challenges.
- Begin with a strong, emotionally resonant introduction.
- Conclude with a forward-looking, motivating message that encourages the reader to take action.
- DO NOT mention that this came from research or that it's AI-generated.

**🛠️ Structure:**
- **Strong, engaging introduction:** Hook the reader and set the stage for the topic.
- **2–4 informative sections:** Use clear, descriptive subheadings. Focus on practical takeaways and relatable examples.
- **Incorporate practical examples, real-world applications, and emotional hooks where relevant.**
- **Compelling, forward-looking conclusion:** End on a positive, action-oriented note that inspires the reader.

Here are the research notes:
${research}
`;

  const draft = await callGroq(prompt);
  return draft;
}