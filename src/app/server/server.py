from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model_utils import predict_price, validate_input
import pandas as pd
import os

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

@app.get('/api/insights')
async def get_insights():
  try:
    # Load the diamonds dataset
    csv_path = os.path.join(os.path.dirname(__file__), 'diamonds_final.csv')
    df = pd.read_csv(csv_path)
    
    # Map numeric values back to categorical labels
    cut_map = {1: 'Fair', 2: 'Good', 3: 'Very Good', 4: 'Premium', 5: 'Ideal'}
    color_map = {1: 'J', 2: 'I', 3: 'H', 4: 'G', 5: 'F', 6: 'E', 7: 'D'}
    clarity_map = {1: 'I1', 2: 'SI2', 3: 'SI1', 4: 'VS2', 5: 'VS1', 6: 'VVS2', 7: 'VVS1', 8: 'IF'}
    
    df['cut_label'] = df['cut'].map(cut_map)
    df['color_label'] = df['color'].map(color_map)
    df['clarity_label'] = df['clarity'].map(clarity_map)
    
    # Sample data for carat vs price scatter plot (limit to 500 points for performance)
    sample_df = df.sample(n=min(500, len(df)), random_state=42)
    carat_data = sample_df[['carat', 'price']].to_dict('records')
    
    # Calculate average price by cut
    cut_avg = df.groupby('cut_label')['price'].mean().reset_index()
    cut_avg.columns = ['cut', 'avgPrice']
    cut_avg['avgPrice'] = cut_avg['avgPrice'].round(0).astype(int)
    cut_order = ['Fair', 'Good', 'Very Good', 'Premium', 'Ideal']
    cut_avg['cut'] = pd.Categorical(cut_avg['cut'], categories=cut_order, ordered=True)
    cut_avg = cut_avg.sort_values('cut')
    cut_data = cut_avg.to_dict('records')
    
    # Calculate average price by color
    color_avg = df.groupby('color_label')['price'].mean().reset_index()
    color_avg.columns = ['color', 'avgPrice']
    color_avg['avgPrice'] = color_avg['avgPrice'].round(0).astype(int)
    color_order = ['J', 'I', 'H', 'G', 'F', 'E', 'D']
    color_avg['color'] = pd.Categorical(color_avg['color'], categories=color_order, ordered=True)
    color_avg = color_avg.sort_values('color')
    color_data = color_avg.to_dict('records')
    
    # Calculate average price by clarity
    clarity_avg = df.groupby('clarity_label')['price'].mean().reset_index()
    clarity_avg.columns = ['clarity', 'avgPrice']
    clarity_avg['avgPrice'] = clarity_avg['avgPrice'].round(0).astype(int)
    clarity_order = ['I1', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF']
    clarity_avg['clarity'] = pd.Categorical(clarity_avg['clarity'], categories=clarity_order, ordered=True)
    clarity_avg = clarity_avg.sort_values('clarity')
    clarity_data = clarity_avg.to_dict('records')
    
    return {
      "caratData": carat_data,
      "cutData": cut_data,
      "colorData": color_data,
      "clarityData": clarity_data
    }
    
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Insights error: {str(e)}")

if __name__ == '__main__':
  import uvicorn
  port = int(os.environ.get('PORT', 5000))
  uvicorn.run(app, host='0.0.0.0', port=port)