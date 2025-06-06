// inputNode.js

import { BaseNode, NodeField, NodeInput, NodeSelect, useNodeState } from '../components/nodes/BaseNode';
import { theme } from '../theme';

export const InputNode = ({ id, data }) => {
  const [currName, handleNameChange] = useNodeState(
    data?.inputName || 'input_1',
    id,
    'inputName'
  );
  
  const [inputType, handleTypeChange] = useNodeState(
    data?.inputType || 'Text',
    id,
    'inputType'
  );

  const outputHandleId = `${id}-out`;

  return (
    <BaseNode
      id={id}
      data={{ ...data, name: currName }}
      title="Input"
      outputs={[{ 
        id: outputHandleId,
        style: {
          background: theme.colors.primary,
          zIndex: 1000
        }
      }]}
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
};
