import { BaseNode, NodeField, NodeInput, NodeSelect, useNodeState } from '../components/nodes/BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, handleDelayChange] = useNodeState(
    data?.delay || '1000',
    id,
    'delay'
  );

  const [unit, handleUnitChange] = useNodeState(
    data?.unit || 'ms',
    id,
    'unit'
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Timer"
      inputs={[{ id: 'trigger' }]}
      outputs={[{ id: 'timeout' }]}
      style={{
        backgroundColor: '#e8f5e9'
      }}
    >
      <NodeField label="Delay">
        <div style={{ display: 'flex', gap: '8px' }}>
          <NodeInput 
            type="number"
            value={delay}
            onChange={handleDelayChange}
            style={{ flex: 2 }}
          />
          <NodeSelect 
            value={unit}
            onChange={handleUnitChange}
            style={{ flex: 1 }}
          >
            <option value="ms">ms</option>
            <option value="s">sec</option>
            <option value="m">min</option>
          </NodeSelect>
        </div>
      </NodeField>
    </BaseNode>
  );
};
