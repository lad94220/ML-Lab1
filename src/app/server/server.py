from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model_utils import predict_price, validate_input

app = FastAPI(title="Diamond Price Predictor API", version="1.0.0")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

class PredictionRequest(BaseModel):
  carat: float
  cut: str
  color: str
  clarity: str

class PredictionResponse(BaseModel):
  predicted_price: float

@app.get('/')
async def root():
  return {
    "message": "Diamond Price Predictor API",
    "model": "Model 5: log(carat) + cut + color + clarity",
    "version": "1.0.0"
  }

@app.get('/api/predict', response_model=PredictionResponse)
async def predict(carat: float, cut: str, color: str, clarity: str):
  
  is_valid, error_msg = validate_input(carat, cut, color, clarity)
  
  if not is_valid:
    raise HTTPException(status_code=400, detail=error_msg)
  
  try:
    predicted_price = predict_price(carat, cut, color, clarity)
    
    return {
      "predicted_price": round(predicted_price, 2)
    }
    
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == '__main__':
  import uvicorn
  import os
  port = int(os.environ.get('PORT', 8000))
  uvicorn.run(app, host='0.0.0.0', port=port)