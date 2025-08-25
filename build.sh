#!/bin/bash
# Render build script for Python Flask app

set -o errexit

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

echo "Build completed successfully"