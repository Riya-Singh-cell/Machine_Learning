import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score, f1_score, roc_auc_score,
    classification_report, roc_curve
)
import matplotlib.pyplot as plt

# ================================
# 1️⃣ MAPS
# ================================
mood_map = {
    "Excellent": 2,
    "Good": 1,
    "Okay": 0,
    "Poor": -1,
    "Terrible": -2
}

social_map = {
    "Alone": 0,
    "Low": 1,
    "Medium": 2,
    "High": 3
}

label_map = {
    0: "Low Stress",
    1: "Medium Stress",
    2: "High Stress"
}

# ================================
# 2️⃣ DATA
# ================================
X = np.array([
    [7, 6, mood_map["Excellent"], social_map["High"]],
    [5, 10, mood_map["Poor"], social_map["Alone"]],
    [6, 8, mood_map["Okay"], social_map["Medium"]],
    [8, 5, mood_map["Good"], social_map["High"]],
    [4, 11, mood_map["Terrible"], social_map["Low"]],
    [4, 4, mood_map["Okay"], social_map["High"]],
    [5, 5, mood_map["Okay"], social_map["Low"]],
    [4, 7, mood_map["Okay"], social_map["Low"]],
    [3, 8, mood_map["Okay"], social_map["Low"]],
    [6, 8, mood_map["Poor"], social_map["Alone"]],
    [6, 8, mood_map["Terrible"], social_map["Alone"]],
    [8, 5, mood_map["Terrible"], social_map["High"]],
    [6, 8, mood_map["Poor"], social_map["Medium"]],
    [6.5, 5, mood_map["Good"], social_map["Medium"]],
    [4.2, 10, mood_map["Terrible"], social_map["Alone"]],
    [5.0, 6, mood_map["Okay"], social_map["Low"]],
    [4.9, 7, mood_map["Okay"], social_map["Alone"]],
    [6.0, 8, mood_map["Poor"], social_map["Low"]],
    [7.0, 9, mood_map["Good"], social_map["High"]],
    [5.5, 5.5, mood_map["Okay"], social_map["Medium"]],
    [4.7, 4.5, mood_map["Terrible"], social_map["Low"]],
    [6.2, 10.5, mood_map["Okay"], social_map["Alone"]],
    [4.0, 6, mood_map["Poor"], social_map["Low"]],
    [8.0, 6.5, mood_map["Excellent"], social_map["High"]],
    [5.8, 8, mood_map["Okay"], social_map["Alone"]],
    [5.2, 11, mood_map["Good"], social_map["Alone"]],
    [6.4, 6, mood_map["Okay"], social_map["Medium"]],
    [5.0, 6.5, mood_map["Poor"], social_map["Low"]],
    [4.3, 9.5, mood_map["Poor"], social_map["Alone"]],
    [5.5, 7.5, mood_map["Good"], social_map["Low"]],
    [6.9, 4.2, mood_map["Good"], social_map["Medium"]],
    [4.5, 7.2, mood_map["Terrible"], social_map["Low"]],
    [7.5, 5.5, mood_map["Excellent"], social_map["Medium"]],
    [4.8, 6.8, mood_map["Poor"], social_map["Alone"]],
    [6.6, 8.5, mood_map["Okay"], social_map["Medium"]],
    [7.0, 6.5, mood_map["Excellent"], social_map["High"]],
    [5.3, 5.8, mood_map["Okay"], social_map["Low"]],
    [6.0, 9.5, mood_map["Terrible"], social_map["Alone"]],
    [4.2, 6.5, mood_map["Terrible"], social_map["Low"]],
    [5.9, 6.5, mood_map["Good"], social_map["Medium"]],
    [5.7, 4.8, mood_map["Okay"], social_map["Low"]],
    [4.6, 10.2, mood_map["Terrible"], social_map["Alone"]],
])
y = np.array([
    0, 2, 1, 0, 2, 1, 2, 2, 2, 1, 2, 2, 2,
    0, 2, 1, 2, 2, 0, 1, 2, 2, 0, 1, 2, 2, 1, 2,
    2, 1, 1, 2, 0, 2, 1, 0, 1, 2, 2, 0, 1
])

X = X[:len(y)]  # Match lengths

# ================================
# 3️⃣ Split Data
# ================================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ================================
# 4️⃣ Pipeline & Train
# ================================
pipeline = Pipeline([
    ("clf", RandomForestClassifier(
        n_estimators=150,
        max_depth=10,
        random_state=42
    ))
])

pipeline.fit(X_train, y_train)
print("\n🎯 Training Completed Successfully")

# ================================
# 5️⃣ Predictions & Metrics
# ================================
y_pred = pipeline.predict(X_test)
y_prob = pipeline.predict_proba(X_test)

accuracy = accuracy_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred, average="weighted")
auc = roc_auc_score(y_test, y_prob, multi_class="ovo")

print("\n📊 MODEL PERFORMANCE:")
print(f"✔ Accuracy: {accuracy:.2f}")
print(f"✔ F1 Score: {f1:.2f}")
print(f"✔ AUC Score: {auc:.2f}")
print("\n🔍 Detailed Classification Report:\n", classification_report(y_test, y_pred))

# ================================
# 6️⃣ Visual Plots
# ================================
fpr = dict()
tpr = dict()

for i in range(len(label_map)):
    fpr[i], tpr[i], _ = roc_curve((y_test == i).astype(int), y_prob[:, i])

plt.figure(figsize=(7, 5))
for i in fpr:
    plt.plot(fpr[i], tpr[i], label=f"Class {label_map[i]}")

plt.plot([0,1], [0,1], "k--")
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve - Stress Prediction Model")
plt.legend()
plt.show()

# ================================
# 7️⃣ Save the Model
# ================================
joblib.dump((pipeline, label_map, mood_map, social_map), "model.pkl")
print(f"\n model.pkl saved with {len(X)} total training samples")
