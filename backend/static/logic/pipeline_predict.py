import joblib
from static.logic.text_pipeline import TextProcessor

def predict(text: str):
    # load model
    model = joblib.load('static/logic/datos/MLPClassifier.pkl')

    # get text from request
    prediction = model.predict([text])

    if prediction == 0:
        return 'negative'
    else:
        return 'positive'
    
def predict_with_list(texts: list):
    # load model
    model = joblib.load('static/logic/datos/MLPClassifier.pkl')

    # get text from request
    prediction = model.predict(texts)

    # Transform 0 for negative and 1 for positive
    prediction = ['negative' if pred == 0 else 'positive' for pred in prediction]

    return prediction
