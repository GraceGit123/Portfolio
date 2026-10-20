from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "docs"

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path):
        if path == "/Portfolio" or path.startswith("/Portfolio/"):
            path = path[len("/Portfolio"): ] or "/"
        return super().translate_path(path)

if __name__ == "__main__":
    print("Preview: http://127.0.0.1:4175/Portfolio/")
    ThreadingHTTPServer(("127.0.0.1", 4175), Handler).serve_forever()
