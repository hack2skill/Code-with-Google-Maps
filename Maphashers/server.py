import http.server
import json

class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/city_data':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(city_data).encode())
        else:
            super().do_GET()

if __name__ == '__main__':
    city_data = { ... }  # Define your city data here

    with http.server.ThreadingHTTPServer(('localhost', 8000), SimpleHTTPRequestHandler) as httpd:
        print('Serving at http://localhost:8000/')
        httpd.serve_forever()
