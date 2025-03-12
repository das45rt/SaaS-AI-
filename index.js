const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Для статических файлов

const GEMINI_API_KEY = 'AIzaSyBfiOnvMadurYiKJcPBmXbpak0FGRvyt4I'; // Вставьте ваш API-ключ здесь

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.input;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: `Please provide a detailed response to the following question: ${userInput}` }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const message = response.data.contents[0].parts[0].text;
        res.json({ response: message });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).send('Ошибка при обработке запроса.');
    }
});

app.listen(port, () => {
    console.log(`Сервер работает на порту ${port}`);
});
