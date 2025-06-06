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

                {/* Section: Processing Nodes */}
                <div>
                    <h3 style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                        fontWeight: 500
                    }}>Processing Nodes</h3>
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
                        <DraggableNode type='array' label='Array' />
                        <DraggableNode type='dataTransform' label='Transform' />
                    </div>
                </div>

                {/* Section: Flow Control */}
                <div>
                    <h3 style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                        fontWeight: 500
                    }}>Flow Control</h3>
                    <div style={{ 
                        display: 'flex', 
                        gap: '12px', 
                        flexWrap: 'wrap',
                        padding: '12px',
                        backgroundColor: 'var(--background)',
                        borderRadius: '8px',
                    }}>
                        <DraggableNode type='conditional' label='Condition' />
                        <DraggableNode type='validation' label='Validate' />
                        <DraggableNode type='timer' label='Timer' />
                    </div>
                </div>

                {/* Section: Advanced */}
                <div>
                    <h3 style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                        fontWeight: 500
                    }}>Advanced</h3>
                    <div style={{ 
                        display: 'flex', 
                        gap: '12px', 
                        flexWrap: 'wrap',
                        padding: '12px',
                        backgroundColor: 'var(--background)',
                        borderRadius: '8px',
                    }}>
                        <DraggableNode type='api' label='API' />
                        <DraggableNode type='promptTemplate' label='Prompt' />
                        <DraggableNode type='debug' label='Debug' />
                    </div>
                </div>
            </div>
        </div>
    );
};
