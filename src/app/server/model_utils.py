import numpy as np
import pandas as pd
import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')

# Encoding mappings from the dataset (0-indexed)
CUT_MAPPING = {
  'Fair': 1,
  'Good': 2,
  'Very Good': 3,
  'Premium': 4,
  'Ideal': 5
}

COLOR_MAPPING = {
  'J': 1,
  'I': 2,
  'H': 3,
  'G': 4,
  'F': 5,
  'E': 6,
  'D': 7
}

CLARITY_MAPPING = {
  'I1': 1,
  'SI2': 2,
  'SI1': 3,
  'VS2': 4,
  'VS1': 5,
  'VVS2': 6,
  'VVS1': 7,
  'IF': 8
}

def encode_cut(cut: str) -> int:
  return CUT_MAPPING.get(cut, 0)

def encode_color(color: str) -> int:
  return COLOR_MAPPING.get(color, 0)

def encode_clarity(clarity: str) -> int:
  return CLARITY_MAPPING.get(clarity, 0)

def load_model():
  if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}. Please train model first.")
  
  model = joblib.load(MODEL_PATH)
  return model

try:
  model = load_model()
  print("Model loaded successfully!")
except FileNotFoundError as e:
  print(f"Warning: {e}")
  model = None

def predict_price(carat: float, cut: str, color: str, clarity: str) -> float:
  if model is None:
    raise RuntimeError("Model not loaded. Please train model first.")
  
  # Apply log transformation to carat
  log_carat = np.log(carat)
  
  # Encode categorical features to numbers
  cut_encoded = encode_cut(cut)
  color_encoded = encode_color(color)
  clarity_encoded = encode_clarity(clarity)
  
  # Create input data with encoded features
  input_data = pd.DataFrame({
    'log_carat': [log_carat],
    'cut': [cut_encoded],
    'color': [color_encoded],
    'clarity': [clarity_encoded]
  })
  
  # Predict log price
  log_price_pred = model.predict(input_data)[0]
  
  # Convert back from log scale
  price_pred = np.exp(log_price_pred)
  
  return float(price_pred)

def validate_input(carat: float, cut: str, color: str, clarity: str) -> tuple[bool, str]:
  valid_cuts = ["Fair", "Good", "Very Good", "Premium", "Ideal"]
  valid_colors = ["D", "E", "F", "G", "H", "I", "J"]
  valid_clarities = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"]
  
  if carat <= 0:
    return False, "Carat must be greater than 0"
  
  if cut not in valid_cuts:
    return False, f"Cut must be one of: {', '.join(valid_cuts)}"
  
  if color not in valid_colors:
    return False, f"Color must be one of: {', '.join(valid_colors)}"
  
  if clarity not in valid_clarities:
    return False, f"Clarity must be one of: {', '.join(valid_clarities)}"
  
  return True, ""
