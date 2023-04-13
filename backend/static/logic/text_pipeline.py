from sklearn.base import BaseEstimator, TransformerMixin
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import string

class TextProcessor(BaseEstimator, TransformerMixin):
    def __init__(self): 
        self.stop_words = set(stopwords.words('english'))
        
    def fit(self, X, y=None):
        return self
        
    def transform(self, X):
        # tokenize text
        tokenized_text = [word_tokenize(text) for text in X]
        # remove stop words and punctuation
        processed_text = []
        for tokens in tokenized_text:
            processed_tokens = []
            for token in tokens:
                if token not in self.stop_words and token not in string.punctuation:
                    processed_tokens.append(token.lower())
            processed_text.append(processed_tokens)
        return processed_text
        
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer

pipeline = Pipeline([
    ('text_processor', TextProcessor()),
    ('vectorizer', CountVectorizer())
])