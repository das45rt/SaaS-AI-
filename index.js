import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env["GITHUB_TOKEN"];

const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: token
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic } = req.body;

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "Generate a 300-word article." },
        { role: "user", content: `Write an article about ${topic}.` }
      ],
      model: "gpt-4o",
      temperature: 1,
      max_tokens: 600,
      top_p: 1
    });

    res.json({ article: response.choices[0].message.content });
  } catch (err) {
    console.error("Error generating article:", err);
    res.status(500).json({ error: "Failed to generate article." });
  }
}
