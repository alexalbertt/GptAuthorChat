import axios from 'axios';

const API_KEY = process.env['OPENAI_API_KEY'];

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