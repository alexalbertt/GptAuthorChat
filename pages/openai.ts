import axios from 'axios';

const API_KEY = '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';

export async function getCompletions(prompt: string, model: string, numCompletions: number) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        prompt,
        model,
        max_tokens: numCompletions,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}