from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import Pipeline
import joblib
from sklearn.model_selection import train_test_split
from text_pipeline import TextProcessor
import pandas as pd
import nltk

def tokenize(text):
    tokenizer = nltk.TweetTokenizer()
    return tokenizer.tokenize(text)

vectorizer = joblib.load('backend/static/logic/datos/CountVectorizer.pkl')

pipeline = Pipeline([
    ('preprocessor', TextProcessor()),
    ('vectorizer', vectorizer),
    ('classifier', MLPClassifier(verbose=True, early_stopping=True, random_state=42))
])

# Cargamos el dataset
df_peliculas = pd.read_csv('backend/static/logic/datos/MovieReviewsProcesado.csv')

# Remove Unnamed: 0 column
df_peliculas = df_peliculas.drop(columns=['Unnamed: 0'])

# Split dataset into train and test
X_train, X_test, y_train, y_test = train_test_split(df_peliculas["processed_text"], df_peliculas['sentimiento'], test_size=0.3, random_state=42)

# Train model
pipeline.fit(X_train, y_train)

# Save model
joblib.dump(pipeline, 'backend/static/logic/datos/MLPClassifier.pkl')

# Test model
print(pipeline.score(X_test, y_test))

# Lets test with some random text
print(pipeline.predict(['Me encantó la película, es muy buena']))