import { callGroq } from "../groqClient";

export async function seoAgent(editedDraft: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: `
You are an expert SEO blog editor with a deep understanding of technical content, persuasive storytelling, and search optimization. Your job is to **polish and optimize the following edited blog content for SEO** without changing its original voice or flow, while enhancing reader engagement and practical relevance.

⚠️ CRITICAL REQUIREMENTS:
- **Preserve the original tone and flow, but amplify emotional impact and clarity.**
- Avoid redundant phrasing and ensure each paragraph adds new, valuable insights.
- Use varied sentence structures and transitions to keep the content engaging.
- **Leverage Real-World Examples:** Incorporate the provided case studies and practical scenarios to make the content more relatable and trustworthy.
- **Clearly Articulate Practical Benefits:** Focus on tangible outcomes like cost savings, operational efficiency, and customer satisfaction.
- Personalize where appropriate to connect with the intended audience.
- Ensure the introduction and conclusion are impactful, forward-looking, and emotionally resonant.

**Tasks:**
- Improve the blog title for SEO while keeping it human and engaging.
- Write a compelling, human-friendly 150-character meta description (for search engines).
- Suggest 4-6 high-impact SEO keywords, including long-tail phrases.
- Lightly polish the main content for readability, flow, and SEO (structure, subheadings, active voice).
- Add a short FAQ section (3-5 insightful Q&As) that anticipates reader questions without being overly generic.

**Formatting Requirements (Strict):**
- Use dynamic and descriptive subheadings.
- Include real-world examples, case studies, or practical scenarios where applicable.
- End on a strong, forward-looking note that encourages action or reflection.
- Use bullet points or numbered lists for complex information where it improves readability.

**Output Format:**

## SEO Title  
[Your SEO-optimized blog title]

## Optimized Blog Content (for readers)  
[Polished introduction, maintaining emotional impact]  
        
### [Subheading 1]  
[Polished body paragraphs with reduced redundancy and clearer transitions]

### [Subheading 2]  
[Polished body paragraphs with technical depth, practical examples, and personalized tone]

[Improved conclusion with a clear, forward-looking tone]

## Meta Description (for search engines)  
[150-character summary]

## SEO Keywords (for you)  
- keyword one  
- keyword two  
- long-tail keyword three  

## FAQs (optional addition to the blog post)  
### Q: [Insightful question based on the content]  
A: [Detailed, non-generic answer]

Ensure the final output is fully written out, cleanly formatted, and Markdown-friendly. Do NOT use placeholders like [summary] or [content].
      `,
    },
    {
      role: 'user',
      content: editedDraft,
    }
  ];

  const seoResult = await callGroq(messages);
  return seoResult;
}