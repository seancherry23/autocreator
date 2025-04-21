import { writerAgent } from "@/lib/agents/writerAgent";

export async function GET() {
  try {
    const blogPost = await writerAgent('How AI is transforming healthcare');

    return new Response(JSON.stringify({ result: blogPost }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('Error in writerAgent:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}