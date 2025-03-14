document.getElementById('chatButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value.toLowerCase();
    const botResponseElement = document.getElementById('botResponse');

    // Простой "искусственный интеллект" для ответов на вопросы
    let botResponse = "";

    switch(userInput) {
        case "привет":
            botResponse = "Привет, как дела?";
            break;
        case "как дела":
            botResponse = "У меня все хорошо, спасибо!";
            break;
        case "как жизнь":
            botResponse = "Жизнь прекрасна! А как у вас?";
            break;
        case "сколько месяцев в году":
            botResponse = "В году 12 месяцев.";
            break;
        case "что ты умеешь":
            botResponse = "Я могу отвечать на простые вопросы!";
            break;
        default:
            botResponse = "Извините, я не знаю, как на это ответить.";
            break;
    }

    botResponseElement.innerText = botResponse;
});
