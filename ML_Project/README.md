# MindEase — Personalized Stress Level Prediction & Mood Support System

**Authors:**  
- Riya Singh  
- Saunaak Mukherji 
- Swathi Setty 
---

## Project Overview

MindEase is a lightweight machine-learning-backed wellness assistant that predicts a user's stress level (Low / Medium / High) from a few simple inputs: hours of sleep, hours of work, self-reported mood, and level of social interaction. The system returns a stress label and a gentle, supportive message tailored to the predicted class.

This repository contains:
- training code and the small dataset used for experimentation,
- a trained `model.pkl` (pipeline + maps),
- a Flask backend (`app.py`) that exposes a `/predict` endpoint,
- example frontend integration notes.

---

## Features

- Map qualitative inputs (mood, social) to numeric values.
- Random Forest classifier wrapped in a scikit-learn `Pipeline`.
- Flask REST API for real-time predictions.
- Predefined empathetic messages per stress category.
- Lightweight and easy to integrate with any frontend.

---

