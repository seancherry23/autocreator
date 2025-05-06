import { editorAgent } from "@/lib/agents/editorAgent";
import { researchAgent } from "@/lib/agents/researchAgent";
import { seoAgent } from "@/lib/agents/seoAgent";
import { writerAgent } from "@/lib/agents/writerAgent";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();

    // Get the topic string
    const topic = body?.topic;

    // Validate
    if (!topic || typeof topic !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid or missing topic' }), { status: 400 })
    }

    // Run the agents
    const research = await researchAgent(topic);
    console.log("ResearchAgent Draft:\n", research);

    const draft = await writerAgent(research);
    console.log("✍️ WriterAgent Draft:\n", draft);

    const edited = await editorAgent(draft);
    console.log("🪚 EditorAgent Result:\n", edited);

    const seo = await seoAgent(edited);
    console.log("📈 SEOAgent Result:\n", seo);

    // Return a typed response
    return new Response(JSON.stringify({ draft, edited, seo }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.log('Error in writerAgent:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}