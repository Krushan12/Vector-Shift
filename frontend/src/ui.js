// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
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
  Delete: (nodes, edges, setNodes, setEdges) => {
    const selectedNodes = nodes.filter(node => node.selected);
    const selectedEdges = edges.filter(edge => edge.selected);
    
    if (selectedNodes.length > 0 || selectedEdges.length > 0) {
      const nodeIds = selectedNodes.map(node => node.id);
      const updatedNodes = nodes.filter(node => !nodeIds.includes(node.id));
      const updatedEdges = edges.filter(edge => 
        !nodeIds.includes(edge.source) && 
        !nodeIds.includes(edge.target) &&
        !selectedEdges.find(se => se.id === edge.id)
      );
      
      setNodes(updatedNodes);
      setEdges(updatedEdges);
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
      onConnect
    } = useStore(selector, shallow);

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
    }, []);

    const onKeyDown = useCallback((event) => {
        const action = keyboardActions[event.key];
        if (action) {
            action(nodes, edges, onNodesChange, onEdgesChange);
        }
    }, [nodes, edges, onNodesChange, onEdgesChange]);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100%', height: '100%', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                minZoom={0.1}
                maxZoom={4}
                zoomOnScroll={true}
                panOnScroll={true}
                connectionMode="strict"
                snapToGrid={true}
                fitViewOptions={{ padding: 50 }}
                deleteKeyCode={['Backspace', 'Delete']}
                onKeyDown={onKeyDown}
                selectionKeyCode={['Shift']}
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls 
                    showZoom={true}
                    showFitView={true}
                    position="top-right"
                    style={{
                        marginTop: '20px',
                        marginRight: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '8px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                />
                <MiniMap 
                    nodeColor={(node) => {
                        switch (node.type) {
                            case 'customInput': return '#3B82F6';
                            case 'llm': return '#8B5CF6';
                            case 'customOutput': return '#10B981';
                            case 'text': return '#F59E0B';
                            case 'math': return '#EF4444';
                            case 'image': return '#06B6D4';
                            case 'conditional': return '#F97316';
                            case 'timer': return '#84CC16';
                            case 'api': return '#EC4899';
                            default: return '#94A3B8';
                        }
                    }}
                    nodeStrokeWidth={3}
                    maskColor="rgba(0, 0, 0, 0.1)"
                    style={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                    }}
                />
            </ReactFlow>
        </div>
        </>
    )
}
