// inputNode.js

import { BaseNode, NodeField, NodeInput, NodeSelect, useNodeState } from '../components/nodes/BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, handleNameChange] = useNodeState(
    data?.inputName || id.replace('customInput-', 'input_'),
    id,
    'inputName'
  );
  
  const [inputType, handleTypeChange] = useNodeState(
    data?.inputType || 'Text',
    id,
    'inputType'
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={[{ id: 'value' }]}
    >
      <NodeField label="Name">
        <NodeInput 
          value={currName}
          onChange={handleNameChange}
        />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect 
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </NodeSelect>
      </NodeField>
    </BaseNode>
  );
}
