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
