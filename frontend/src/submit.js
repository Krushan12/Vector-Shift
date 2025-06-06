// submit.js
import { useCallback, useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { theme } from './theme';

const Alert = ({ type, message, onClose }) => (
    <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'error' ? '#FEE2E2' : '#ECFDF5',
        color: type === 'error' ? '#991B1B' : '#065F46',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: theme.shadows.lg,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 1000,
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease-out'
    }}>
        <div style={{ flex: 1 }}>{message}</div>
        <button
            onClick={onClose}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: 'inherit'
            }}
        >
            ×
        </button>
    </div>
);

export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        state => ({
            nodes: state.nodes,
            edges: state.edges
        }),
        shallow
    );

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        try {
            // Prepare form data
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify({ nodes, edges }));

            // Send request to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Show success message with pipeline analysis
            setAlert({
                type: 'success',
                message: `Pipeline Analysis:
                • Nodes: ${data.num_nodes}
                • Edges: ${data.num_edges}
                • Valid DAG: ${data.is_dag ? 'Yes' : 'No'}
                ${!data.is_dag ? '\nWarning: Pipeline contains cycles!' : ''}`
            });

        } catch (error) {
            setAlert({
                type: 'error',
                message: `Error analyzing pipeline: ${error.message}`
            });
        } finally {
            setIsLoading(false);
        }
    }, [nodes, edges]);

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    style={{
                        backgroundColor: isLoading ? '#9CA3AF' : 'var(--text-light)',
                        color: 'var(--primary)',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 500,
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        boxShadow: '0 2px 4px rgba(79, 70, 229, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        '&:hover': !isLoading && {
                            backgroundColor: '#4338CA',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 6px rgba(79, 70, 229, 0.2)'
                        },
                        '&:active': !isLoading && {
                            transform: 'translateY(0)',
                            boxShadow: '0 2px 4px rgba(79, 70, 229, 0.1)'
                        }
                    }}
                >
                    {isLoading ? (
                        <>
                            <span style={{
                                width: '16px',
                                height: '16px',
                                border: '2px solid #ffffff',
                                borderTopColor: 'transparent',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                            Analyzing...
                        </>
                    ) : (
                        'Submit Pipeline'
                    )}
                </button>
            </div>

            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            <style>
                {`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                `}
            </style>
        </>
    );
}
