import OpenAI from "openai";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(express.json());

// Инициализация DeepSeek API
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY, // Используем переменную окружения
});

// Основной маршрут для общения с ботом
app.post('/api/chat', async (req, res) => {
    const userInput = req.body.input;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: userInput }],
            model: "deepseek-chat",
        });

        const botResponse = completion.choices[0].message.content;
        res.json({ response: botResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при взаимодействии с API' });
    }
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер работает на порту ${port}`);
});
