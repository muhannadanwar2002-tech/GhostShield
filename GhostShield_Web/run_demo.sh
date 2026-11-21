#!/bin/sh
set -eu
cd "$(dirname "$0")"
exec python3 -u - "$@" <<'PY'
import functools
import http.server
import sys

port = int(sys.argv[1]) if len(sys.argv) > 1 else 0
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory="site")
with http.server.ThreadingHTTPServer(("127.0.0.1", port), handler) as server:
    print(f"GhostShield: http://127.0.0.1:{server.server_port}/")
    print("Stop with Ctrl+C.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
PY
