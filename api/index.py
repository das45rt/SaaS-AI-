from flask import Flask, request, jsonify
import time

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate_article():
    # Ваша логика генерации статьи
    return jsonify({"message": "Статья сгенерирована!"})

if __name__ == '__main__':
    app.run()
