from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)

CORS(app, resources={
    r"/predict": {
        "origins": [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:8080",
            "http://127.0.0.1:8080"
        ],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]
    }
})

model_data = joblib.load("model.pkl")

if isinstance(model_data, tuple) and len(model_data) == 4:
    model, label_map, mood_map, social_map = model_data
    print("Model, label_map, mood_map, and social_map loaded.")
else:
    raise ValueError("Invalid model.pkl format")

message_map = {
  "Low Stress": (
    "You’re radiating a calm, lovely energy today. Let that gentle glow guide you through your day.\n\n"
    "Keep smiling, keep breathing slow, and if you’d like, check your wellness to-do list for extra balance."
  ),
  "Medium Stress": (
    "I see how much effort you're putting in. Even on days that feel uncertain, you still carry yourself with grace.\n\n"
    "You don’t need to fix everything right now. Be kind to yourself. When you're ready, your to-do list is waiting with gentle reminders."
  ),
  "High Stress": (
    "It must feel heavy right now. You’ve been holding a lot inside — take this moment to simply breathe.\n\n"
    "You are not behind, not failing, and not alone. You are worthy of rest and care. When you feel ready, your to-do list has soft, supportive steps to help you."
  )
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)

        if not data:
            return jsonify({"error": "No data provided"}), 400

        sleep = float(data.get('sleep', 0))
        work = float(data.get('work', 0))
        mood = mood_map.get(data.get('mood', ""), 0)
        social = social_map.get(data.get('social', ""), 0)

        print(f"Inputs — Sleep: {sleep}, Work: {work}, Mood: {mood}, Social: {social}")

        input_data = np.array([[sleep, work, mood, social]])
        prediction = model.predict(input_data)[0]
        label = label_map.get(prediction, "Unknown")
        message = message_map.get(label, "No message available.")

        print(f"Prediction: {prediction} => Label: {label} | Message: {message}")

        return jsonify({
            "label": label,
            "message": message
        })

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Flask server is running!"})

if __name__ == '__main__':
    print("Starting Flask app at http://localhost:5001")
    app.run(debug=True, port=5001, host='0.0.0.0')
