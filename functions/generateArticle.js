const fetch = require('node-fetch'); // Импортируем node-fetch

exports.handler = async (event, context) => {
    const { topic, length, chapters } = JSON.parse(event.body);
    const apiKey = 'YOUR_API_KEY'; // Замените на ваш реальный API ключ
    const url = 'https://deepseekapi.org/v1/chat/completions';

    const prompt = `Напишите статью на тему '${topic}' объемом ${length} слов и с ${chapters} главами.`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'deepseek-r1',
            messages: [{ role: 'user', content: prompt }]
        }),
    });

    if (response.ok) {
        const data = await response.json();
        const articleContent = data.choices[0].message.content.replace('*', '').replace('#', '').trim();
        return {
            statusCode: 200,
            body: JSON.stringify({ article: articleContent }),
        };
    }

    return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Ошибка при обращении к API.' }),
    };
};
