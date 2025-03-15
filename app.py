from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

# Установите ваш ключ API OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")  # Убедитесь, что у вас настроена переменная окружения

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_message = request.json.get('message')

    if not user_message:
        return jsonify({'response': "Пожалуйста, введите сообщение."})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": user_message}]
        )
        bot_response = response.choices[0].message['content']
        return jsonify({'response': bot_response})
    except Exception as e:
        return jsonify({'response': f"Ошибка: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
