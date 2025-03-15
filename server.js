// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Инициализация клиента OpenAI
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Обработка POST-запроса
app.post('/ask', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ response: "Пожалуйста, введите сообщение." });
    }

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: userMessage }],
        });

        const botResponse = response.choices[0].message.content;
        res.json({ response: botResponse });
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ response: "Ошибка обработки сообщения: " + error.message });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
