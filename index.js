const express = require('express');
const { pipeline } = require('stream');
const { AutoModelForCausalLM, AutoTokenizer } = require('transformers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let model, tokenizer;

// Загружаем модель и токенизатор
async function loadModel() {
    model = await AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium");
    tokenizer = await AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium");
}

// Обработчик запросов
app.post('/api/chat', async (req, res) => {
    const userInput = req.body.input;
    const inputIds = tokenizer.encode(userInput + tokenizer.eos_token, return_tensors='pt');

    const response = await model.generate(inputIds, { max_length: 1000, pad_token_id: tokenizer.eos_token_id });
    const botResponse = tokenizer.decode(response[0], skip_special_tokens=true);

    res.json({ response: botResponse });
});

// Запускаем сервер
app.listen(port, async () => {
    await loadModel();
    console.log(`Сервер работает на порту ${port}`);
});
