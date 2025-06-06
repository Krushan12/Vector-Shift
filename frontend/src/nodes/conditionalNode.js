import { BaseNode, NodeField, NodeInput, useNodeState } from '../components/nodes/BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, handleConditionChange] = useNodeState(
    data?.condition || 'value > 0',
    id,
    'condition'
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      inputs={[{ id: 'value' }]}
      outputs={[
        { id: 'true', style: { backgroundColor: '#4caf50' } },
        { id: 'false', style: { backgroundColor: '#f44336' } }
      ]}
      style={{
        backgroundColor: '#fff3e0'
      }}
    >
      <NodeField label="Condition">
        <NodeInput 
          value={condition}
          onChange={handleConditionChange}
          placeholder="Enter condition..."
        />
      </NodeField>
    </BaseNode>
  );
};
