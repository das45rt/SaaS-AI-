document.getElementById('submitBtn').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;

    // Простая обработка текста для получения ответа от ИИ
    const response = generateAIResponse(userInput);

    document.getElementById('aiResponse').innerText = response;
});

function generateAIResponse(input) {
    // Для имитации ответа от ИИ будем использовать базовую обработку текста
    const words = nlp(input).terms().out('array');
    if (words.length === 0) {
        return "Пожалуйста, введите что-то.";
    }
    
    return `Вы сказали: "${input}". У меня нет ИИ, но я тут, чтобы помочь!`;
}
