# VectorShift Pipeline Builder

VectorShift is a visual pipeline builder that allows you to create, connect, and deploy data processing pipelines using a drag-and-drop interface. It provides a powerful way to design complex workflows by connecting different types of nodes.

## 🚀 Live Demo

- Frontend: [https://vector-shift-pi.vercel.app/](https://vector-shift-pi.vercel.app/)
- Backend API: [https://vector-shift-5ygc.onrender.com](https://vector-shift-5ygc.onrender.com)

## ✨ Features

- 📦 Drag-and-drop node-based interface
- 🔗 Interactive node connections
- 💾 Automatic state persistence
- ✅ Real-time pipeline validation
- 🎯 Multiple node types:
  - Input/Output nodes
  - Text processing
  - LLM (Large Language Model) integration
  - Math operations
  - Array operations
  - Conditional logic
  - API integration
  - Prompt templates
  - Data transformation
  - Image processing
  - Debug nodes

## 🛠️ Tech Stack

### Frontend
- React
- React Flow
- Zustand for state management
- Modern CSS with dynamic theming

### Backend
- FastAPI
- NetworkX for graph processing
- Python 3.x
- Uvicorn/Gunicorn for deployment

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.x
- pip (Python package manager)

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will be available at `http://localhost:3000`

### Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`

## 🏗️ Project Structure

```
Vector-Shift/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── nodes/       # Node type implementations
│   │   └── ...         # Core application files
│   └── public/         # Static assets
└── backend/           # FastAPI backend service
    ├── main.py        # Main application file
    └── requirements.txt # Python dependencies
```

## 🔧 Available Node Types

1. **Basic Nodes**
   - Input: Accept data into the pipeline
   - LLM: Large Language Model integration
   - Output: Pipeline results
   - Text: Text manipulation

2. **Processing Nodes**
   - Math: Mathematical operations
   - Image: Image processing operations
   - Array: Array manipulations
   - Transform: Data transformation

3. **Flow Control**
   - Conditional: Branch based on conditions
   - Timer: Time-based operations
   - Validation: Data validation

4. **Advanced**
   - API: External API integration
   - Prompt Template: Dynamic prompt generation
   - Debug: Pipeline debugging

## 📝 Pipeline Validation

The backend validates pipelines by:
- Checking for cycles (DAG validation)
- Counting nodes and edges
- Verifying node connections

## 🚀 Deployment

### Frontend (Vercel)
The frontend is deployed on Vercel with automatic deployments from the main branch.

### Backend (Render)
The backend is deployed on Render using Gunicorn with the following configuration:
```bash
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
```

## 🙏 Acknowledgments

- React Flow for the flow-based programming interface
- FastAPI for the efficient backend framework
