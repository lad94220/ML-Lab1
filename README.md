# 💎 Diamond Price Predictor

A full-stack machine learning application that predicts diamond prices based on their characteristics (carat, cut, color, and clarity). Built with FastAPI backend and Next.js frontend.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://diamond-price-predictor.vercel.app/)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)

## 🌟 Features

- **Real-time Price Prediction**: Instant diamond price estimates based on ML model
- **Interactive UI**: Beautiful gradient-animated interface with dropdown menus
- **RESTful API**: Clean and documented FastAPI backend
- **Log-Linear Regression**: Advanced ML model with 95.3% accuracy (R² = 0.953)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Live Deployment**: Hosted on Vercel (frontend) and Render (backend)

## 🎯 Live Demo

**Website:** [https://diamond-price-predictor.vercel.app/](https://diamond-price-predictor.vercel.app/)

Try it out with these example values:
- Carat: 1.0
- Cut: Ideal
- Color: E
- Clarity: VS1

Expected price: ~$5,000-6,000

## 📊 Project Overview

This project implements a machine learning pipeline for diamond price prediction:

1. **Data Processing**: Clean and encode diamond dataset (53,940 samples)
2. **Feature Engineering**: Log transformation and categorical encoding
3. **Model Training**: Log-Linear Regression with 4 features
4. **API Development**: FastAPI REST endpoints with validation
5. **Web Interface**: Next.js app with Tailwind CSS
6. **Deployment**: Production-ready on Vercel and Render

### Model Performance

- **MAE (Mean Absolute Error)**: $324.52
- **RMSE**: $563.80
- **R² Score**: 0.9530 (95.3% variance explained)

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  Next.js Client │ ◄─────► │  FastAPI Server │ ◄─────► │  ML Model (.pkl)│
│   (Vercel)      │  HTTP   │    (Render)     │  Pickle │   (Scikit-learn)│
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Python 3.11 or higher
- Node.js 18+ and pnpm
- Git

### Running Locally

#### 1. Clone the Repository

```bash
git clone https://github.com/lad94220/ML-Lab1.git
cd ML-Lab1
```

#### 2. Setup and Run Backend (FastAPI Server)

```bash
# Navigate to server directory
cd src/app/server

# Install Python dependencies
pip install -r requirements.txt

# Train the model (first time only)
cd ../..
python train_model.py

# Run the server
cd app/server
python server.py
```

**Server will start at:** `http://localhost:5000`

#### 3. Setup and Run Frontend (Next.js Client)

Open a **new terminal** window:

```bash
# Navigate to client directory
cd src/app/client

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

**Client will start at:** `http://localhost:3000`

### Environment Variables

#### Frontend (`.env.local` in `src/app/client/`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production, update `NEXT_PUBLIC_API_URL` to your deployed backend URL.

## 📁 Project Structure

```
ML-Lab1/
├── .git/                                # Git version control
├── .gitignore                           # Git ignore file
├── data/
│   ├── raw/
│   │   └── diamonds.csv                 # Original dataset (53,940 diamonds)
│   ├── processed/
│   │   ├── diamonds_clean.csv           # Cleaned and encoded data
│   │   └── diamonds_final.csv           # Final processed dataset
│   └── splits/
│       ├── train_indices.json           # Training set indices
│       └── test_indices.json            # Test set indices
├── models/                              # Saved model artifacts
├── notebooks/
│   ├── 01_data_exploration.ipynb        # EDA and visualization
│   ├── 02_model_training.ipynb          # Model training experiments
│   └── 03_model_evaluation.ipynb        # Model evaluation metrics
├── src/
│   ├── train_model.py                   # Model training script
│   └── app/
│       ├── server/                      # FastAPI backend
│       │   ├── server.py                # Main API server
│       │   ├── model_utils.py           # Model loading & prediction
│       │   ├── model_5.pkl              # Trained log-linear model
│       │   ├── requirements.txt         # Python dependencies
│       │   └── README.md                # Server documentation
│       └── client/                      # Next.js frontend
│           ├── .env.local               # Local environment variables
│           ├── .next/                   # Next.js build output
│           ├── node_modules/            # Node dependencies
│           ├── public/                  # Static assets
│           ├── src/
│           │   └── app/
│           │       ├── page.tsx         # Main UI component
│           │       ├── layout.tsx       # App layout
│           │       ├── globals.css      # Global styles & animations
│           │       └── components/      # React components
│           │           ├── header.tsx   # Header component
│           │           └── footer.tsx   # Footer component
│           ├── package.json             # Node dependencies
│           ├── pnpm-lock.yaml           # pnpm lock file
│           ├── next.config.ts           # Next.js configuration
│           ├── tsconfig.json            # TypeScript configuration
│           ├── tailwind.config.js       # Tailwind CSS configuration
│           ├── postcss.config.mjs       # PostCSS configuration
│           └── README.md                # Client documentation
└── README.md                            # This file
```

## 🔌 API Documentation

### Base URL

- **Development:** `http://localhost:5000`
- **Production:** Your deployed backend URL

### Endpoints

#### 1. Get API Info

```http
GET /
```

**Response:**
```json
{
  "message": "Diamond Price Predictor API",
  "model": "Model 5: log(carat) + cut + color + clarity",
  "version": "1.0.0"
}
```

#### 2. Predict Diamond Price

```http
GET /api/predict?carat={carat}&cut={cut}&color={color}&clarity={clarity}
```

**Query Parameters:**

| Parameter | Type   | Required | Description                          | Valid Values                                    |
|-----------|--------|----------|--------------------------------------|-------------------------------------------------|
| `carat`   | float  | Yes      | Diamond weight in carats             | > 0 (e.g., 0.5, 1.0, 2.5)                      |
| `cut`     | string | Yes      | Cut quality                          | Fair, Good, Very Good, Premium, Ideal          |
| `color`   | string | Yes      | Color grade (D=best, J=worst)       | D, E, F, G, H, I, J                            |
| `clarity` | string | Yes      | Clarity grade (IF=best, I1=worst)   | IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1        |

**Example Response:**

```json
{
  "predicted_price": 5432.18
}
```

## 🎨 Frontend Features

### Diamond Input Form

- **Carat Input**: Numeric field with step of 0.01
- **Cut Dropdown**: 5 quality grades (Fair → Ideal)
- **Color Dropdown**: 7 color grades (J → D)
- **Clarity Dropdown**: 8 clarity grades (I1 → IF)

### Price Display

- Large, animated result card
- Formatted with thousand separators
- Diamond emoji decoration
- Smooth pulse animation on update

### Design

- Animated gradient background
- Glass-morphism effects
- Two-column layout (input | output)
- Responsive and mobile-friendly
- Teal and dark blue color scheme

## 🧪 Model Details

### Algorithm: Log-Linear Regression

The model uses logarithmic transformation for better handling of exponential price relationships:

```
log(price) = β₀ + β₁·log(carat) + β₂·cut + β₃·color + β₄·clarity
```

### Feature Encoding

**Cut Quality** (1-5):
- Fair = 1
- Good = 2
- Very Good = 3
- Premium = 4
- Ideal = 5

**Color Grade** (1-7):
- J = 1 (most yellow)
- I = 2
- H = 3
- G = 4
- F = 5
- E = 6
- D = 7 (most colorless)

**Clarity Grade** (1-8):
- I1 = 1 (most inclusions)
- SI2 = 2
- SI1 = 3
- VS2 = 4
- VS1 = 5
- VVS2 = 6
- VVS1 = 7
- IF = 8 (internally flawless)

### Model Coefficients

```python
log_carat: 1.8689    # Most important feature
clarity:   0.1178    # Second most important
color:     0.0751    # Third
cut:       0.0250    # Least impact
intercept: 7.6194
```

### Training Dataset

- **Source**: Classic diamonds dataset
- **Samples**: 46,427 (after cleaning)
- **Original Size**: 53,940 diamonds
- **Features**: carat, cut, color, clarity, depth, table, dimensions
- **Target**: price (USD)

## 🛠️ Technologies Used

### Backend

- **FastAPI**: Modern, fast web framework for building APIs
- **Scikit-learn**: Machine learning library for model training
- **Pandas & NumPy**: Data manipulation and numerical computing
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server for running FastAPI

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Hooks**: State management

### Deployment

- **Vercel**: Frontend hosting with automatic deployments
- **Render**: Backend hosting with Python support
- **Git/GitHub**: Version control and CI/CD

## 🐛 Troubleshooting
### Model Not Found

**Issue**: `Model file not found` error

```bash
cd src
python train_model.py
```

### CORS Errors

**Issue**: API requests blocked by CORS

Update `server.py` to include your frontend URL in `allow_origins`.

### Prediction Returns NaN

**Issue**: Invalid input values

Check that:
- Carat > 0
- Cut/Color/Clarity match exact valid values (case-sensitive)

## 👨‍💻 Development

### Building for Production

```bash
# Frontend
cd src/app/client
pnpm build
pnpm start

# Backend (already production-ready)
cd src/app/server
python server.py
```

## 📄 License

This project is for educational purposes as part of a Machine Learning course.
