import React from 'react';
import { useStore } from '../store';

export const ClearButton = () => {
    const clearFlow = () => {
        if (window.confirm('Are you sure you want to clear the canvas? This will remove all nodes and connections.')) {
            // Clear localStorage
            localStorage.removeItem('flowNodes');
            localStorage.removeItem('flowEdges');
            localStorage.removeItem('flowNodeIDs');
            
            // Reset store state
            useStore.setState({
                nodes: [],
                edges: [],
                nodeIDs: {}
            });
        }
    };

    return (
        <button
            onClick={clearFlow}            style={{
                position: 'fixed',
                right: '20px',
                bottom: '20px',
                zIndex: 1000,
                backgroundColor: '#DC2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'background-color 0.2s',
                fontSize: '14px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#B91C1C'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#DC2626'}
        >
            Clear Canvas
        </button>
    );
};
