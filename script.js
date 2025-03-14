document.getElementById('chatButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value.toLowerCase();
    const botResponseElement = document.getElementById('botResponse');

    if (userInput === "привет") {
        botResponseElement.innerText = "Привет!";
    } else {
        botResponseElement.innerText = "Я не понимаю. Пожалуйста, напишите 'привет'.";
    }
});
