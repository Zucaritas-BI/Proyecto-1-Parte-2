# Download pipeline models from dropbox
import dropbox
class TransferData:
    def __init__(self, access_token):
        self.access_token = access_token

    def download_file(self, file_from, file_to):
        """Download a file from Dropbox using API v2
        """
        dbx = dropbox.Dropbox(self.access_token)

        with open(file_to, 'wb') as f:
            metadata, res = dbx.files_download(file_from)
            f.write(res.content)

def main():
    # Read token from client_secret.txt
    with open('backend/static/logic/secret/client_secret.txt', 'r') as f:
        access_token = f.read()

    transferData = TransferData(access_token)

    # download all files in datos folder
    file_from = '/datos/MLPClassifier.pkl'
    file_to = 'backend/static/logic/datos/MLPClassifier.pkl'  # The full path to download the file to, including the file name
    transferData.download_file(file_from, file_to)

    file_from = '/datos/CountVectorizer.pkl'
    file_to = 'backend/static/logic/datos/CountVectorizer.pkl'  # The full path to download the file to, including the file name
    transferData.download_file(file_from, file_to)

if __name__ == '__main__':
    main()
