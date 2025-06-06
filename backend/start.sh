#!/bin/bash

# Start gunicorn with 4 worker processes
# Uses uvicorn worker class for ASGI support
# Binds to host 0.0.0.0 and port from environment variable
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
