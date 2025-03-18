const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// Замените 'YOUR_GEMINI_API_KEY' на ваш реальный API-ключ
const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY');

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { userInput } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userInput);
        res.json({ response: result.response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при обработке запроса');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
