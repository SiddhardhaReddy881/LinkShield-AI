import joblib
import pandas as pd
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent / "model.pkl"
if not MODEL_PATH.exists():
    MODEL_PATH = Path(__file__).resolve().parents[2] / ".." / "model" / "model.pkl"


_model = None


def _get_model():
    global _model
    if _model is None and MODEL_PATH.exists():
        _model = joblib.load(MODEL_PATH)
    return _model


def predict_url(features: dict):
    model = _get_model()
    if model is None:
        return {
            "prediction": "Unavailable",
            "label": -1,
        }

    input_data = pd.DataFrame([features])
    prediction = model.predict(input_data)[0]

    return {
        "prediction": "Legitimate" if prediction == 1 else "Phishing",
        "label": int(prediction),
    }
