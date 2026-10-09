#!/bin/bash
# Double-click on a Mac to start the VerifyU admin (needs Node.js 18 or newer from https://nodejs.org)
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then echo "Node.js is not installed. Download it from https://nodejs.org and run this again."; read -r -p "Press Enter to close"; exit 1; fi
node admin/server.mjs &
sleep 1
open "http://127.0.0.1:8790/"
wait
