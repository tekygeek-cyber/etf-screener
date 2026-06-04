#!/usr/bin/env python3
"""Serve the ETF Screener locally and open it in a browser."""

from __future__ import annotations

import argparse
import http.server
import os
import socketserver
import webbrowser
from functools import partial
from pathlib import Path


class ReusableTcpServer(socketserver.TCPServer):
    """TCP server configured for quick local restart during development."""

    allow_reuse_address = True


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Deploy the static ETF Screener locally and open it in your browser.",
    )
    parser.add_argument("--host", default="127.0.0.1", help="Host/interface to bind. Defaults to 127.0.0.1.")
    parser.add_argument("--port", type=int, default=8000, help="Port to serve. Defaults to 8000.")
    parser.add_argument(
        "--no-browser",
        action="store_true",
        help="Serve without attempting to open the default browser.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    root = Path(__file__).resolve().parent
    handler = partial(http.server.SimpleHTTPRequestHandler, directory=root)
    url = f"http://{args.host}:{args.port}/"

    with ReusableTcpServer((args.host, args.port), handler) as httpd:
        print(f"Serving ETF Screener from {root}", flush=True)
        print(f"Open {url} in your browser", flush=True)
        print("Press Ctrl+C to stop the local server", flush=True)

        if not args.no_browser and os.environ.get("CI") != "true":
            opened = webbrowser.open(url, new=2)
            if not opened:
                print("Could not auto-open a browser. Copy and paste the URL above instead.", flush=True)

        httpd.serve_forever()


if __name__ == "__main__":
    main()
