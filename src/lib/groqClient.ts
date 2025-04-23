type GroqMessage = {
  role: 'system' | 'user' | 'assistant',
  content: string
}

export async function callGroq(promptOrMessages: string | GroqMessage[]): Promise<string> {
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const isMessageArray = Array.isArray(promptOrMessages);

  const body = {
    model: 'gemma2-9b-it',
    temperature: 0.9,
    max_tokens: 1024,
    messages: isMessageArray
      ? promptOrMessages
      : [
          {
            role: 'system',
            content: 'You are a professional blog writer. Only return the blog content.'
          },
          {
            role: 'user',
            content: promptOrMessages,
          },
        ],
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.statusText}`)
  }

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2))
  return data.choices?.[0]?.message?.content ?? 'No output';
}