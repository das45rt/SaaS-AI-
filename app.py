from flask import Flask, request, jsonify, render_template
from google import genai
import time  # Импортируем модуль для работы со временем

app = Flask(__name__)

# Инициализация клиента GenAI
client = genai.Client(api_key="YOUR_API_KEY")  # Замените на ваш API-ключ

@app.route('/')
def index():
    return render_template('index.html')  # Убедитесь, что у вас есть этот HTML-файл

@app.route('/generate', methods=['POST'])
def generate_article():
    start_time = time.time()  # Запоминаем время начала генерации

    try:
        data = request.json
        topic = data.get('topic')
        word_count = data.get('word_count')

        if not topic or not word_count:
            return jsonify({'error': 'Не указана тема или количество слов.'}), 400

        contents = f"Напишите статью на тему '{topic}' объемом {word_count} слов."

        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=contents
        )

        if not response or not response.text:
            return jsonify({'error': 'Ответ от модели пуст.'}), 500

        generation_time = time.time() - start_time

        return jsonify({
            'article': response.text,
            'generation_time': generation_time
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Не удалось сгенерировать статью. Пожалуйста, попробуйте еще раз.'
        }), 500

if __name__ == '__main__':
    app.run(debug=True)  # Установите debug=True для отладки
