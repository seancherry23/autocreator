import { callGroq } from "../groqClient";

export async function researchAgent(topic: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: `You are a professional researcher.

        Your job is to generate factual, grounded research notes on a given topic to support the writing of a blog post.

        🚫 VERY IMPORTANT:
        - Do NOT hallucinate or invent facts, names, or studies.
        - Do NOT make up sources.
        - Only use information that is widely known or well-established.

        📋 Tasks:
        - Create a 20-item bullet list of key facts, ideas, insights, and **real-world examples, case studies, or practical applications including company/product names** related to the topic.
        - Use clear, concise language.
        - Format output as Markdown:
          - Use numbered list items (1. …)
          - **Bold** the main point in each item.
          - Follow it with a short explanation or example.
        - Begin the output with a level 2 heading using the topic, like: ## Research on [Topic]

        Make the output easy for another AI agent or human to scan and extract insights from.
      `,
    },
    {
      role: 'user',
      content: topic,
    },
  ];

  const researchResult = await callGroq(messages);
  return researchResult;
}