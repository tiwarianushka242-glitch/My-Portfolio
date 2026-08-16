import http.server
import socketserver
import webbrowser
import threading
import sys
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"=====================================================")
        print(f"🕹️  ANUSHKA TIWARI 80s SYNTHWAVE PORTFOLIO APP")
        print(f"📡 Server running at: http://localhost:{PORT}")
        print(f"=====================================================")
        httpd.serve_forever()

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # Automatically open in default browser / app window
    webbrowser.open(f"http://localhost:{PORT}")
    
    print("Press Ctrl+C to stop the portfolio app.")
    try:
        server_thread.join()
    except KeyboardInterrupt:
        print("\nStopping application. Goodbye!")
        sys.exit(0)
