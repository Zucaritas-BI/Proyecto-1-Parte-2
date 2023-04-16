from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import Pipeline
import joblib
from sklearn.model_selection import train_test_split
from static.logic.text_pipeline import TextProcessor
import pandas as pd

model = joblib.load('backend/static/logic/datos/MLPClassifier.pkl')

print(model.predict(['Me encantó la película, es muy buena']))

# Probamos con un archivo de prueba

import pandas as pd

df_peliculas = pd.read_csv('backend/static/logic/datos/MovieReviewsPruebas.csv')

X = df_peliculas["review_es"]

print(model.predict(X))
