import { callGroq } from "../groqClient";

export async function editorAgent(draft: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: `You are a professional blog editor.
        You will receive a draft blog post from a writer. Your job is to:
        - Improve grammar, sentence structure, and clarity
        - Enhance the tone to be confident, helpful, and engaging
        - Maintain the original meaning and facts
        - Do not add or remove content unless it improves readability
        - Make the writing feel more natural and human-generated, avoiding robotic phrasing
        - Return only the revised blog post, nothing else`,
    },
    {
      role: 'user',
      content: draft,
    }
  ];

  const editedDraft = await callGroq(messages);
  return editedDraft;
}