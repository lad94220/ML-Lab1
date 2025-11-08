# Diamond Price Prediction Server

Server implementation for Model 5: log(carat) + cut + color + clarity

## Setup

1. **Train the model first:**
```bash
cd src/
python train_model.py
cd app/server
```

This will create `model_5.pkl` file with the trained model.

2. **Run the server:**
```bash
pip install requirements.txt
uvicorn server:app --host localhost --port 5000
```

Server will start at `http://localhost:5000`

## API Endpoints

### GET /api/predict
Predict diamond price

**Request Params:**
```
- carat: float (e.g., 0.5, 1.0, 2.0)
- cut: string (Fair, Good, Very Good, Premium, Ideal)
- color: string (D, E, F, G, H, I, J)
- clarity: string (IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1)
```

**Response:**
```json
{
  "predicted_price": 1234,
  "status": "success",
}
```

## Valid Values

- **Cut**: Fair, Good, Very Good, Premium, Ideal
- **Color**: D, E, F, G, H, I, J (D is best)
- **Clarity**: IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1 (IF is best)
- **Carat**: Any positive number (e.g., 0.5, 1.0, 2.0)

## Model Details

Model 5 uses log-linear regression:
- Features: log(carat), cut, color, clarity
- Target: log(price)
- Predictions are transformed back from log space to original price
