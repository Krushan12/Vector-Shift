// outputNode.js

import { BaseNode, NodeField, NodeInput, NodeSelect, useNodeState } from '../components/nodes/BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, handleNameChange] = useNodeState(
    data?.outputName || id.replace('customOutput-', 'output_'),
    id,
    'outputName'
  );
  
  const [outputType, handleTypeChange] = useNodeState(
    data?.outputType || 'Text',
    id,
    'outputType'
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputs={[{ id: 'value' }]}
    >
      <NodeField label="Name">
        <NodeInput 
          value={currName}
          onChange={handleNameChange}
        />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect 
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </NodeSelect>
      </NodeField>
    </BaseNode>
  );
}
