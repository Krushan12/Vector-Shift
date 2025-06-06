// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{
            padding: '8px',
            backgroundColor: 'var(--surface)',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            position: 'absolute',
            left: '16px',
            top: '16px',
            bottom: '16px',
            zIndex: 1000,
            maxWidth: '180px',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            overflowX: 'hidden'
        }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '8px'
            }}>
                {/* Section: Basic Nodes */}
                <div>
                    <h3 style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                        fontWeight: 500
                    }}>Basic Nodes</h3>
                    <div style={{ 
                        display: 'flex', 
                        gap: '12px', 
                        flexWrap: 'wrap',
                        padding: '12px',
                        backgroundColor: 'var(--background)',
                        borderRadius: '8px',
                    }}>
                        <DraggableNode type='customInput' label='Input' />
                        <DraggableNode type='llm' label='LLM' />
                        <DraggableNode type='customOutput' label='Output' />
                        <DraggableNode type='text' label='Text' />
                    </div>
                </div>

                {/* Section: Extended Nodes */}
                <div>
                    <h3 style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                        fontWeight: 500
                    }}>Extended Nodes</h3>
                    <div style={{ 
                        display: 'flex', 
                        gap: '12px', 
                        flexWrap: 'wrap',
                        padding: '12px',
                        backgroundColor: 'var(--background)',
                        borderRadius: '8px',
                    }}>
                        <DraggableNode type='math' label='Math' />
                        <DraggableNode type='image' label='Image' />
                        <DraggableNode type='conditional' label='Conditional' />
                        <DraggableNode type='timer' label='Timer' />
                        <DraggableNode type='api' label='API' />
                    </div>
                </div>
            </div>
        </div>
    );
};
