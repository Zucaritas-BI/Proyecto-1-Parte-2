import dropbox

class TransferData:
    def __init__(self, access_token):
        self.access_token = access_token

    def upload_file(self, file_from, file_to):
        """upload a file to Dropbox using API v2
        """
        dbx = dropbox.Dropbox(self.access_token)

        with open(file_from, 'rb') as f:
            dbx.files_upload(f.read(), file_to)

def main():
    # Read token from client_secret.txt
    with open('backend/static/logic/secret/client_secret.txt', 'r') as f:
        access_token = f.read()

    transferData = TransferData(access_token)

    # upload all files in datos folder
    file_from = 'backend/static/logic/datos/MLPClassifier.pkl'
    file_to = '/datos/MLPClassifier.pkl'  # The full path to upload the file to, including the file name
    transferData.upload_file(file_from, file_to)

    file_from = 'backend/static/logic/datos/CountVectorizer.pkl'
    file_to = '/datos/CountVectorizer.pkl'  # The full path to upload the file to, including the file name
    transferData.upload_file(file_from, file_to)
    
if __name__ == '__main__':
    main()