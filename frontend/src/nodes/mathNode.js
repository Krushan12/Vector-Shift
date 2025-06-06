import { BaseNode, NodeField, NodeSelect, useNodeState } from '../components/nodes/BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, handleOperationChange] = useNodeState(
    data?.operation || 'add',
    id,
    'operation'
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math Operation"
      inputs={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' }
      ]}
      outputs={[{ id: 'result' }]}
    >
      <NodeField label="Operation">
        <NodeSelect 
          value={operation}
          onChange={handleOperationChange}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </NodeSelect>
      </NodeField>
    </BaseNode>
  );
};
