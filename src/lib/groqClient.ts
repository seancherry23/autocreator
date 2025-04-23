

export async function callGroq(prompt: string): Promise<string> {
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gemma2-9b-it',
      messages: [
        {
          role: 'system',
          content: 'You are a professional blog writer. Only return the blog content.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.9,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.statusText}`)
  }

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2))
  return data.choices?.[0]?.message?.content ?? 'No output';
}