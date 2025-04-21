import { callMixtral } from "../mixtralClient";

export async function writerAgent(topic: string): Promise<string> {
  const prompt = `
  You are a professional blog writer. Write a high-quality, engaging, informative blog post about the topic: "${topic}".
  The post should:
  - Be 5 paragraphs long
  - Include a strong introduction, 3 body paragraphs, and a clear conclussion
  - Use subheadings
  - Have a friendly, confident, helpful tone
  - Include relevant examples if helpful
  `;
  const draft = await callMixtral(prompt);
  return draft;
}