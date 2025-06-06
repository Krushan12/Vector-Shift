from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import networkx as nx
from typing import List, Dict, Any
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: str = Form(...)):
    try:
        # Parse the pipeline JSON
        data = json.loads(pipeline)
        pipeline_data = PipelineData(**data)
        
        # Create a directed graph
        G = nx.DiGraph()
        
        # Add nodes
        for node in pipeline_data.nodes:
            G.add_node(node['id'])
            
        # Add edges
        for edge in pipeline_data.edges:
            G.add_edge(edge['source'], edge['target'])
            
        # Count nodes and edges
        num_nodes = G.number_of_nodes()
        num_edges = G.number_of_edges()
        
        # Check if the graph is a DAG
        is_dag = nx.is_directed_acyclic_graph(G)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
        
    except Exception as e:
        return {
            'error': str(e),
            'num_nodes': 0,
            'num_edges': 0,
            'is_dag': False
        }
