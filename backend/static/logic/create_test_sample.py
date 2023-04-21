import pandas as pd


def create_sample():
    df = pd.read_csv('backend/static/logic/datos/MovieReviewsPruebas.csv')
    # Take the first 100 rows
    df = df.head(10)
    # Remove all columns except review_es
    df = df.rename(columns={'review_es': 'review'})

    # Remove index
    df = df.reset_index(drop=True)

    # Remove unnamed 0
    df = df.drop(['Unnamed: 0'], axis=1)

    # To csv
    df.to_csv('backend/static/logic/datos/MovieReviewsPruebasSample.csv', index=False)

create_sample()