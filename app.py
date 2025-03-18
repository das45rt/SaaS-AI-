from flask import Flask, request, jsonify, render_template
from google import genai

app = Flask(__name__)

# Инициализация клиента GenAI
client = genai.Client(api_key="AIzaSyBfiOnvMadurYiKJcPBmXbpak0FGRvyt4I")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_article():
    data = request.json
    topic = data.get('topic')
    word_count = data.get('word_count')

    # Формирование запроса к модели
    contents = f"Напишите статью на тему '{topic}' объемом {word_count} слов."
    
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=contents
    )
    
    return jsonify({'article': response.text})

if __name__ == '__main__':
    app.run()
