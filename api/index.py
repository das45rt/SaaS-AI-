import os
from flask import Flask, request, jsonify, render_template
from google import genai
from dotenv import load_dotenv

# Загрузка переменных окружения из .env файла
load_dotenv()

app = Flask(__name__)

# Инициализация клиента GenAI с API-ключом из переменной окружения
client = genai.Client(api_key=os.getenv("GENAI_API_KEY"))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_article():
    data = request.json
    topic = data.get('topic')

    if not topic:
        return jsonify({'error': 'Тема не указана.'}), 400

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[topic]
        )

        if not response or not response.text:
            return jsonify({'error': 'Ответ от модели пуст.'}), 500

        return jsonify({
            'article': response.text
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Не удалось сгенерировать статью. Пожалуйста, попробуйте еще раз.'
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
