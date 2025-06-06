// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap, useKeyPress } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { ImageNode } from './nodes/imageNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { TimerNode } from './nodes/timerNode';
import { APINode } from './nodes/apiNode';
import { ArrayNode } from './nodes/arrayNode';
import { PromptTemplateNode } from './nodes/promptTemplateNode';
import { DataTransformNode } from './nodes/dataTransformNode';
import { ValidationNode } from './nodes/validationNode';
import { DebugNode } from './nodes/debugNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  image: ImageNode,
  conditional: ConditionalNode,
  timer: TimerNode,
  api: APINode,
  array: ArrayNode,
  promptTemplate: PromptTemplateNode,
  dataTransform: DataTransformNode,
  validation: ValidationNode,
  debug: DebugNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const keyboardActions = {
  Delete: (nodes, edges, onNodesChange, onEdgesChange) => {
    const selectedNodes = nodes.filter(node => node.selected);
    const selectedEdges = edges.filter(edge => edge.selected);
    
    if (selectedNodes.length > 0) {
      onNodesChange(
        selectedNodes.map(node => ({
          type: 'remove',
          id: node.id,
        }))
      );
    }
    
    if (selectedEdges.length > 0) {
      onEdgesChange(
        selectedEdges.map(edge => ({
          type: 'remove',
          id: edge.id,
        }))
      );
    }
  }
};

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect: onConnectStore
    } = useStore(selector, shallow);

    const onConnect = useCallback((params) => {
      // Handle the connection
      console.log('Connection params:', params);
      onConnectStore(params);
    }, [onConnectStore]);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const zoom = reactFlowInstance.getZoom();
            const position = reactFlowInstance.project({
              x: (event.clientX - reactFlowBounds.left) / zoom,
              y: (event.clientY - reactFlowBounds.top) / zoom,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);    const onKeyDown = useCallback(
        (event) => {
            const action = keyboardActions[event.key];
            if (action) {
                action(nodes, edges, onNodesChange, onEdgesChange);
            }
        },
        [nodes, edges, onNodesChange, onEdgesChange]
    );

    useEffect(() => {
        // Add keyboard event listener
        document.addEventListener('keydown', onKeyDown);
        return () => {
            // Clean up
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <div 
            ref={reactFlowWrapper} 
            style={{width: '100%', height: '100%', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden'}}
            tabIndex={0}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                connectionMode="loose"
                snapToGrid
                snapGrid={[gridSize, gridSize]}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                proOptions={proOptions}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                    style: {
                        strokeWidth: 2,
                        stroke: '#4F46E5'
                    }
                }}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
