import { editorAgent } from "@/lib/agents/editorAgent";
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
    const draft = await writerAgent(topic);
    console.log("✍️ WriterAgent Draft:\n", draft);

    const result = await editorAgent(draft);
    console.log("🪚 EditorAgent Result:\n", result);

    // Return a typed response
    return new Response(JSON.stringify({ result }), {
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