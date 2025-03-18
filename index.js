import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

// Генерация статьи
app.post('/generate', async (req, res) => {
    const { topic, word_count } = req.body;
    const prompt = `Напишите статью на тему '${topic}' объемом ${word_count} слов.`;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);

        res.json({ text: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка генерации статьи.' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
