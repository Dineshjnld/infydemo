from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/weather')
def get_weather():
    # In a real application, this data would come from a weather API
    return jsonify({
        'temperature': 25,
        'condition': 'Sunny'
    })

@app.route('/api/crops')
def get_crops():
    # In a real application, this data would come from a recommendation model
    return jsonify({
        'suggestions': ['Wheat', 'Maize', 'Rice']
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']
    # Simple echo bot for now
    return jsonify({'response': f"You said: {message}"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
