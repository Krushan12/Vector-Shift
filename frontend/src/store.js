// store.js
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from 'zustand/shallow';
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

// Load initial state from localStorage if available
const loadFromStorage = () => {
    try {
        const savedNodes = localStorage.getItem('flowNodes');
        const savedEdges = localStorage.getItem('flowEdges');
        const savedNodeIDs = localStorage.getItem('flowNodeIDs');
        return {
            nodes: savedNodes ? JSON.parse(savedNodes) : [],
            edges: savedEdges ? JSON.parse(savedEdges) : [],
            nodeIDs: savedNodeIDs ? JSON.parse(savedNodeIDs) : {},
        };
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return { nodes: [], edges: [], nodeIDs: {} };
    }
};

const initialState = loadFromStorage();

export const useStore = createWithEqualityFn((set, get) => ({
    nodes: initialState.nodes,
    edges: initialState.edges,
    nodeIDs: initialState.nodeIDs,

    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        localStorage.setItem('flowNodeIDs', JSON.stringify(newIDs));
        return `${type}-${newIDs[type]}`;
    },

    addNode: (node) => {
        const updatedNodes = [...get().nodes, node];
        set({ nodes: updatedNodes });
        localStorage.setItem('flowNodes', JSON.stringify(updatedNodes));
    },

    onNodesChange: (changes) => {
        const updatedNodes = applyNodeChanges(changes, get().nodes);
        set({ nodes: updatedNodes });
        localStorage.setItem('flowNodes', JSON.stringify(updatedNodes));
    },

    onEdgesChange: (changes) => {
        const updatedEdges = applyEdgeChanges(changes, get().edges);
        set({ edges: updatedEdges });
        localStorage.setItem('flowEdges', JSON.stringify(updatedEdges));
    },

    onConnect: (connection) => {
        if (!connection.source || !connection.target) return;
        
        // Create a unique edge ID
        const edgeId = `e-${connection.source}-${connection.sourceHandle}-${connection.target}-${connection.targetHandle}`;
        
        // Check if this connection already exists
        const exists = get().edges.some(edge => 
            edge.source === connection.source && 
            edge.target === connection.target &&
            edge.sourceHandle === connection.sourceHandle &&
            edge.targetHandle === connection.targetHandle
        );

        if (!exists) {
            const newEdge = {
                id: edgeId,
                ...connection,
                type: 'smoothstep',
                animated: true,
                style: {
                    strokeWidth: 2,
                    stroke: '#4F46E5'
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: '#4F46E5'
                }
            };
            
            const updatedEdges = addEdge(newEdge, get().edges);
            set({ edges: updatedEdges });
            localStorage.setItem('flowEdges', JSON.stringify(updatedEdges));
        }
    },

    updateNodeField: (nodeId, fieldName, fieldValue) => {
        const updatedNodes = get().nodes.map((node) => {
            if (node.id === nodeId) {
                node.data = { ...node.data, [fieldName]: fieldValue };
            }
            return node;
        });
        set({ nodes: updatedNodes });
        localStorage.setItem('flowNodes', JSON.stringify(updatedNodes));
    },
}), shallow);
