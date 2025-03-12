import OpenAI from "openai";
import express from "express";
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(express.json());

// Инициализация DeepSeek API
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY, // Используем переменную окружения
});

// Подключение к MongoDB
const uri = process.env.MONGODB_URI; // Строка подключения из переменных окружения
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Подключение к MongoDB успешно!");
        return client.db("your_database_name"); // Замените на ваше имя БД
    } catch (error) {
        console.error("Ошибка подключения к MongoDB:", error);
        throw error;
    }
}

// Основной маршрут для общения с ботом
app.post('/api/chat', async (req, res) => {
    const userInput = req.body.input;

    try {
        const db = await connectToDatabase(); // Подключаемся к базе данных

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: userInput }],
            model: "deepseek-chat",
        });

        const botResponse = completion.choices[0].message.content;
        
        // Здесь вы можете сохранить ответ в MongoDB, если это необходимо
        // const collection = db.collection("responses"); // Пример коллекции
        // await collection.insertOne({ userInput, botResponse });

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
