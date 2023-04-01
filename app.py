import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

rasa_url = 'http://localhost:5005/webhooks/rest/webhook'

@app.route('/')
def index():
    return render_template('C:/Users/rohan/OneDrive/Desktop/rasa_sem_4 website/index.html')

@app.route('/message', methods=['POST'])
def message():
    data = request.get_json()
    sender = data['sender']
    message = data['message']
    response = generate_response(sender, message)
    return jsonify({'message': response})

def generate_response(sender, message):
    # Send a request to the Rasa server to get the bot's response
    payload = {'sender': sender, 'message': message}
    headers = {'Content-Type': 'application/json'}
    r = requests.post(rasa_url, json=payload, headers=headers)
    response = r.json()[0]['text']
    return response

if __name__ == '__main__':
    app.run(debug=True)
