from flask import Flask
from waitress import serve
import socket
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    # host = '0.0.0.0'
    # print("\033[1;32;40m Server started \033[0;37;40m")
    # host_private = socket.gethostbyname(socket.gethostname())
    # print(f"\033[1;32;40m Running on http://{host_private}:5000 \033[0;37;40m")
    # serve(app, host=host, port=5000)
    # print("\033[1;32;40m Server stopped \033[0;37;40m")
    app.run()

