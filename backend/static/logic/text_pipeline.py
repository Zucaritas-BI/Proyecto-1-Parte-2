from sklearn.base import BaseEstimator, TransformerMixin
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import string
import re
import inflect
import spacy


class TextProcessor(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.stop_words = set(stopwords.words('spanish') + list(string.punctuation) + list('¿¡'))
        self.stemmer = SnowballStemmer('spanish')
        self.inflect = inflect.engine()
        self.nlp = spacy.load("es_core_news_sm")

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        # tokenize text
        tokenized_text = [word_tokenize(text) for text in X]
        # preprocess text
        processed_text = [self.preprocess_text(tokens) for tokens in tokenized_text]
        # Lemmatize text
        lemmatized_text = [self.lemmatize_words(tokens) for tokens in processed_text]
        # stem words
        stemmed_text = [self.stem_words(tokens) for tokens in lemmatized_text]
        # join tokens into a single string for each text
        return [' '.join(tokens) for tokens in stemmed_text]

    def preprocess_text(self, tokens):
        processed_tokens = []
        for token in tokens:
            # convert all characters to lowercase
            token = self.convert_to_lowercase(token)
            # remove special characters and spanish tilde
            token = self.remove_special_characters(token)
            # replace numbers with words
            token = self.replace_numbers(token)
            # remove stop words and replace alphanumeric characters
            if self.is_valid_token(token):
                processed_tokens.append(token)
        return processed_tokens

    def convert_to_lowercase(self, token):
        return token.lower()

    def remove_special_characters(self, token):
        return re.sub(r'[^a-z0-9\s]', '', token).replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')

    def replace_numbers(self, token):
        if token.isdigit():
            return self.inflect.number_to_words(token)
        else:
            return token

    def stem_words(self, tokens):
        return [self.stemmer.stem(token) for token in tokens]

    def lemmatize_words(self, tokens):
        return [token.lemma_ for token in self.nlp(' '.join(tokens))]

    def is_valid_token(self, token):
        return token not in self.stop_words and token.isalnum()