import { callGroq } from "../groqClient";

export async function seoAgent(editedDraft: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: `You are an expert SEO blog editor.

        Your job is to **optimize the following edited blog content for SEO** without changing its original voice or flow.

        ⚠️ VERY IMPORTANT:
        - **Do NOT rewrite or remove the introduction or conclusion.** These must stay exactly as they are (except for minor typo fixes or SEO polish).
        - Do NOT summarize or replace any section with placeholders.

        Tasks:
        - Improve the blog title for SEO while keeping it human and engaging.
        - Write a 150-character meta description (for search engines).
        - Suggest 3–5 relevant SEO keywords (for the content creator).
        - Lightly polish the main content for readability and SEO (structure, subheadings, active voice).
        - Optionally add a short FAQ section (3–5 helpful Q&As).

        Format using this exact Markdown structure:

        ## SEO Title  
        [Your SEO-optimized blog title]

        ## Optimized Blog Content (for readers)  
        [KEEP THE ORIGINAL INTRODUCTION HERE]  
        ### [Subheading 1]  
        [Paragraphs]

        ### [Subheading 2]  
        [Paragraphs]

        [KEEP THE ORIGINAL CONCLUSION HERE]

         ## Meta Description (for search engines)  
        [150-character summary]

        ## SEO Keywords (for you)  
        - keyword one  
        - keyword two  
        - keyword three  

        ## FAQs (optional addition to the blog post)  
        ### Q: [Question]  
        A: [Answer]

        Ensure the final output is fully written out, cleanly formatted, and Markdown-friendly. Do NOT use placeholders like [summary] or [content].`,
    },
    {
      role: 'user',
      content: editedDraft,
    }
  ];

  const seoResult = await callGroq(messages);
  return seoResult;
}