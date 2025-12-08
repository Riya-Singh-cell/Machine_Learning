import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    roc_curve
)

# ================================
# 1) LOAD DATA
# ================================
df = pd.read_csv("stress_data.csv")

# ================================
# 2) FEATURE ENGINEERING
# ================================
df["work_sleep_ratio"] = df["work"] / df["sleep"]
df["stress_load_index"] = df["work"] * (-df["mood"])
df["social_buffer"] = df["social"] * df["mood"]

print("\nFeature Engineering Completed")
print(df.head())

# ================================
# 3) SPLIT FEATURES & TARGET
# ================================
X = df.drop("stress", axis=1)
y = df["stress"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ================================
# 4) MODEL 1: LOGISTIC REGRESSION
# ================================
lr_pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("lr", LogisticRegression(max_iter=1000, multi_class="auto"))
])

lr_pipeline.fit(X_train, y_train)
lr_pred = lr_pipeline.predict(X_test)
lr_prob = lr_pipeline.predict_proba(X_test)

lr_acc = accuracy_score(y_test, lr_pred)
lr_f1 = f1_score(y_test, lr_pred, average="weighted")
lr_auc = roc_auc_score(y_test, lr_prob, multi_class="ovo")

# ================================
# 5) MODEL 2: RANDOM FOREST WITH HYPERPARAMETER TUNING
# ================================
rf_pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("rf", RandomForestClassifier(random_state=42))
])

param_grid = {
    "rf__n_estimators": [100, 200, 300],
    "rf__max_depth": [5, 10, 20, None],
    "rf__min_samples_split": [2, 5, 10],
    "rf__min_samples_leaf": [1, 2, 4]
}

grid_search = GridSearchCV(
    estimator=rf_pipeline,
    param_grid=param_grid,
    cv=5,
    scoring="f1_weighted",
    n_jobs=-1,
    verbose=2
)

print("\nStarting Hyperparameter Tuning...")
grid_search.fit(X_train, y_train)

rf_best_pipeline = grid_search.best_estimator_

print("\nBest Parameters Found:")
print(grid_search.best_params_)

rf_pred = rf_best_pipeline.predict(X_test)
rf_prob = rf_best_pipeline.predict_proba(X_test)

rf_acc = accuracy_score(y_test, rf_pred)
rf_f1 = f1_score(y_test, rf_pred, average="weighted")
rf_auc = roc_auc_score(y_test, rf_prob, multi_class="ovo")

# ================================
# 6) MODEL COMPARISON
# ================================
print("\nMODEL COMPARISON")
print("-----------------------------------------------")
print(f"Logistic Regression -> Acc: {lr_acc:.4f}, F1: {lr_f1:.4f}, AUC: {lr_auc:.4f}")
print(f"Tuned Random Forest -> Acc: {rf_acc:.4f}, F1: {rf_f1:.4f}, AUC: {rf_auc:.4f}")
print("-----------------------------------------------")

# ================================
# 7) SELECT BEST MODEL
# ================================
best_model = rf_best_pipeline if rf_f1 > lr_f1 else lr_pipeline

print(
    "\nBest Model Selected:",
    type(best_model.named_steps[list(best_model.named_steps.keys())[-1]]).__name__
)

# ================================
# 8) CONFUSION MATRIX (BEST MODEL)
# ================================
cm = confusion_matrix(y_test, rf_pred)

plt.figure()
plt.imshow(cm)
plt.title("Confusion Matrix")
plt.xlabel("Predicted Label")
plt.ylabel("True Label")
plt.colorbar()
plt.show()

# ================================
# 9) ROC CURVE (MULTI-CLASS)
# ================================
fpr = dict()
tpr = dict()

n_classes = len(np.unique(y_test))

for i in range(n_classes):
    fpr[i], tpr[i], _ = roc_curve((y_test == i).astype(int), rf_prob[:, i])

plt.figure()
for i in range(n_classes):
    plt.plot(fpr[i], tpr[i], label=f"Class {i}")

plt.plot([0, 1], [0, 1], linestyle="--")
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve - Stress Classification")
plt.legend()
plt.show()

# ================================
# 10) MAPS FOR FLASK
# ================================
label_map = {
    0: "Low Stress",
    1: "Medium Stress",
    2: "High Stress"
}

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

# ================================
# 11) SAVE FINAL TUNED MODEL
# ================================
joblib.dump(
    (best_model, label_map, mood_map, social_map, list(X.columns)),
    "model.pkl"
)

print("\nFinal tuned model with evaluation graphs saved successfully")
