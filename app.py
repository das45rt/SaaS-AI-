from flask import Flask, request, jsonify, render_template
from google import genai
import time  # Импортируем модуль для работы со временем

app = Flask(__name__)

# Инициализация клиента GenAI
client = genai.Client(api_key="AIzaSyBfiOnvMadurYiKJcPBmXbpak0FGRvyt4I")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_article():
    start_time = time.time()  # Запоминаем время начала генерации

    try:
        data = request.json
        topic = data.get('topic')
        word_count = data.get('word_count')

        # Формирование запроса к модели
        contents = f"Напишите статью на тему '{topic}' объемом {word_count} слов."
        
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=contents
        )

        # Измеряем время генерации
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
    app.run()
