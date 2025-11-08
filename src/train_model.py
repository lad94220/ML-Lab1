import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle
import os

def train_model_5():
    data_path = os.path.join(os.path.dirname(__file__), '../data/processed/diamonds_clean.csv')
    data = pd.read_csv(data_path)
    
    log_data = data.copy()
    log_data['log_price'] = np.log(log_data['price'])
    log_data['log_carat'] = np.log(log_data['carat'])
    
    features = ['log_carat', 'cut', 'color', 'clarity']
    X = log_data[features]
    y = log_data['log_price']
    
    model = LinearRegression()
    model.fit(X, y)
    
    model_path = os.path.join(os.path.dirname(__file__), 'app/server/model_5.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    
    print(f"Model 5 trained and saved to {model_path}")
    print(f"Model coefficients: {model.coef_}")
    print(f"Model intercept: {model.intercept_}")
    print(f"Features: {features}")
    
    return model

if __name__ == '__main__':
    train_model_5()
