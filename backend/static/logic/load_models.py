import pickle

def load_model():
    with open('./models/model.pkl', 'rb') as f:
        model = pickle.load(f)
    return model