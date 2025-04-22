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

    // Run the agent
    const result = await writerAgent(topic);

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