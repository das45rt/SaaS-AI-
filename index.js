const express = require('express');
const SimpleChatbot = require('simple-chatbot');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Для статических файлов

// Создаем экземпляр чат-бота
const chatbot = new SimpleChatbot();

chatbot.addQuestion('Hello', 'Hi! How can I help you?');
chatbot.addQuestion('How are you?', 'I am just a bot, but I am doing well!');
chatbot.addQuestion('What is your name?', 'I am a simple chatbot.');
chatbot.addQuestion('Bye', 'Goodbye! Have a great day!');

// Обработчик запроса на получение ответа
app.post('/api/chat', (req, res) => {
    const userInput = req.body.input;

    const response = chatbot.getResponse(userInput);
    res.json({ response });
});

app.listen(port, () => {
    console.log(`Сервер работает на порту ${port}`);
});
