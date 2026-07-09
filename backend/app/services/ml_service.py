import joblib
import pandas as pd
from pathlib import Path

# Locate the trained model
MODEL_PATH = Path(__file__).resolve().parents[2] / ".." / "model" / "model.pkl"

# Load the model once when the application starts
model = joblib.load(MODEL_PATH)


def predict_url(features: dict):
    """
    Predict whether a URL is Legitimate or Phishing.
    """

    # Create a DataFrame with one row
    input_data = pd.DataFrame([features])

    # Make prediction
    prediction = model.predict(input_data)[0]

    return {
        "prediction": "Legitimate" if prediction == 1 else "Phishing",
        "label": int(prediction)
    }