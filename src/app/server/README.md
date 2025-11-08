# Diamond Price Prediction Server

Server implementation for Model 5: log(carat) + cut + color + clarity

## Setup

1. **Train the model first:**
```bash
cd src/app/server
python train_model.py
```

This will create `model_5.pkl` file with the trained model.

2. **Run the server:**
```bash
python server.py
```

Server will start at `http://localhost:5000`

## API Endpoints

### GET /
Health check and API information

### POST /api/predict
Predict diamond price

**Request Body:**
```json
{
  "carat": 0.5,
  "cut": "Ideal",
  "color": "E",
  "clarity": "VS1"
}
```

**Response:**
```json
{
  "predicted_price": 1234.56,
  "model": "Model 5: log(carat) + cut + color + clarity",
  "input": {
    "carat": 0.5,
    "cut": "Ideal",
    "color": "E",
    "clarity": "VS1"
  }
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

## Testing

Test with curl:
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"carat": 0.5, "cut": "Ideal", "color": "E", "clarity": "VS1"}'
```
