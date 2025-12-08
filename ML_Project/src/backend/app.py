from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import traceback

app = Flask(__name__)

# ✅ Proper CORS Configuration
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

# ✅ Load Model Safely
try:
    model_data = joblib.load("model.pkl")

    if isinstance(model_data, tuple) and len(model_data) == 4:
        model, label_map, mood_map, social_map = model_data
        print("Model and mappings loaded successfully.")
    else:
        raise ValueError("Invalid model.pkl format. Expected 4 items.")

except Exception as e:
    print("Model loading failed:", str(e))
    model = None

# ✅ Stress Messages
message_map = {
    "Low Stress": (
        "You’re calm and balanced today. Maintain this steady energy and stay hydrated."
    ),
    "Medium Stress": (
        "You’re managing well, but don’t ignore fatigue. Small breaks will help."
    ),
    "High Stress": (
        "Your stress level is high. Slow down, breathe deeply, and seek rest or support."
    )
}

# ✅ Prediction API
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if not model:
            return jsonify({"error": "Model not loaded"}), 500

        data = request.get_json()
        print("Received data:", data)

        # ✅ Input Validation
        required_fields = ["sleep", "work", "mood", "social"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        sleep = float(data["sleep"])
        work = float(data["work"])
        mood = mood_map.get(data["mood"], 0)
        social = social_map.get(data["social"], 0)

        input_data = np.array([[sleep, work, mood, social]])

        prediction = model.predict(input_data)[0]
        label = label_map.get(prediction, "Unknown")
        message = message_map.get(label, "No suggestion available.")

        return jsonify({
            "status": "success",
            "stress_level": label,
            "message": message
        })

    except Exception as e:
        print("Prediction Error:", traceback.format_exc())
        return jsonify({
            "status": "error",
            "message": "Internal Server Error"
        }), 500

# ✅ Health Check API
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Flask server is running properly."
    })

# ✅ App Runner
if __name__ == '__main__':
    print("Flask server running at http://localhost:5001")
    app.run(debug=True, host='0.0.0.0', port=5001)
