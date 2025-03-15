import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Инициализация клиента OpenAI
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Убедитесь, что установили переменную окружения
});

// Обработка POST-запроса
app.post('/ask', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ response: "Пожалуйста, введите сообщение." });
    }

    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: userMessage,
                },
            ],
        });

        // Проверяем, что ответ получен
        if (completion.choices && completion.choices.length > 0) {
            res.json({ response: completion.choices[0].message.content });
        } else {
            res.json({ response: "Не удалось получить ответ от модели." });
        }
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ response: "Ошибка обработки сообщения: " + error.message });
    }
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
