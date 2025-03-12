const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const client = new OpenAI({
    apiKey: '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',  // Укажите ваш API-ключ напрямую
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
