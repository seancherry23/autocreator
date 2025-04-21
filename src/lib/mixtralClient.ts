
export async function callMixtral(prompt: string): Promise<string> {
  const url = 'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 800,
        temperature: 0.7,
      },
    })
  });

  if (!response.ok) {
    throw new Error(`Mixtral API error: ${response.statusText}`)
  }

  const data = await response.json();
  const output = data?.[0]?.generated_text ?? 'No output';

  return output;
}