from flask import Flask, render_template, jsonify, request
import random
import time

app = Flask(__name__)

# Variable to store the fastest reaction time
fastest_time = float('inf')
penalty_users = {}

@app.route('/')
def index():
    return render_template('index.html')

# Endpoint to handle timing data submission
@app.route('/submit_time', methods=['POST'])
def submit_time():
    global fastest_time

    data = request.json
    user_id = data['user_id']
    reaction_time = data['reaction_time']

    # Check if user is penalized
    if user_id in penalty_users:
        if time.time() < penalty_users[user_id]:
            return jsonify({'status': 'penalized', 'time_left': penalty_users[user_id] - time.time()})
        else:
            del penalty_users[user_id]

    # Update the fastest time
    if reaction_time < fastest_time:
        fastest_time = reaction_time

    return jsonify({'status': 'success', 'fastest_time': fastest_time})

# Endpoint to handle penalty for rapid clicking
@app.route('/penalize', methods=['POST'])
def penalize():
    data = request.json
    user_id = data['user_id']

    # Penalize the user for 10 seconds
    penalty_users[user_id] = time.time() + 10

    return jsonify({'status': 'penalized', 'message': 'You are penalized for rapid clicking!'})

if __name__ == '__main__':
    app.run(debug=True)
