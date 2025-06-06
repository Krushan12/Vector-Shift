// debugNode.js
import { BaseNode, NodeField, NodeSelect, useNodeState } from '../components/nodes/BaseNode';
import { theme } from '../theme';

export const DebugNode = ({ id, data }) => {
  const [logLevel, handleLogLevelChange] = useNodeState(
    data?.logLevel || 'info',
    id,
    'logLevel'
  );

  const [showValue, handleShowValueChange] = useNodeState(
    data?.showValue ?? true,
    id,
    'showValue'
  );

  const [maxDepth, handleMaxDepthChange] = useNodeState(
    data?.maxDepth || '2',
    id,
    'maxDepth'
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Debug"
      inputs={[{ 
        id: 'value',
        style: {
          backgroundColor: theme.colors.handle.background,
          border: `2px solid ${theme.colors.surface}`,
        }
      }]}
      outputs={[{ 
        id: 'output',
        style: {
          backgroundColor: theme.colors.handle.background,
          border: `2px solid ${theme.colors.surface}`,
        }
      }]}
      style={{ 
        backgroundColor: '#f8fafc',
        border: `2px dashed ${theme.colors.border}`
      }}
    >
      <NodeField label="Log Level">
        <NodeSelect 
          value={logLevel}
          onChange={handleLogLevelChange}
          style={{
            width: '100%',
            color: logLevel === 'error' ? '#ef4444' :
                  logLevel === 'warn' ? '#f97316' :
                  logLevel === 'info' ? '#3b82f6' :
                  '#84cc16'
          }}
        >
          <option value="debug">Debug</option>
          <option value="info">Info</option>
          <option value="warn">Warning</option>
          <option value="error">Error</option>
        </NodeSelect>
      </NodeField>

      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        marginTop: '8px'
      }}>
        <NodeField label="Show Value">
          <NodeSelect
            value={showValue.toString()}
            onChange={(e) => handleShowValueChange({ 
              target: { value: e.target.value === 'true' }
            })}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </NodeSelect>
        </NodeField>

        <NodeField label="Max Depth">
          <NodeSelect
            value={maxDepth}
            onChange={handleMaxDepthChange}
            disabled={!showValue}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="Infinity">∞</option>
          </NodeSelect>
        </NodeField>
      </div>

      <div style={{
        marginTop: '8px',
        fontSize: '12px',
        color: theme.colors.text.secondary
      }}>
        Pass-through node for debugging values in the pipeline
      </div>
    </BaseNode>
  );
};
