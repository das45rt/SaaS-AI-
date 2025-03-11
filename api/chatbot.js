const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const client = new OpenAI({
    apiKey: 'b655ab90da1c4ef399b67975f49c9c18',  // Вставьте ваш API-ключ
});

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.input;

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are an AI assistant who knows everything." },
                { role: "user", content: userInput },
            ],
        });

        const message = response.choices[0].message.content;
        res.json({ response: message });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while processing the request.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
