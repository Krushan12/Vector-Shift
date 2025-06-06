// dataTransformNode.js
import { BaseNode, NodeField, NodeSelect, NodeInput, useNodeState } from '../components/nodes/BaseNode';
import { theme } from '../theme';

const TRANSFORM_TEMPLATES = {
  parseJson: 'JSON.parse(input)',
  stringifyJson: 'JSON.stringify(input, null, 2)',
  base64Encode: 'btoa(input)',
  base64Decode: 'atob(input)',
  custom: ''
};

export const DataTransformNode = ({ id, data }) => {
  const [transformType, handleTransformTypeChange] = useNodeState(
    data?.transformType || 'custom',
    id,
    'transformType'
  );

  const [expression, handleExpressionChange] = useNodeState(
    data?.expression || TRANSFORM_TEMPLATES[transformType] || '',
    id,
    'expression'
  );

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    handleTransformTypeChange(e);
    if (TRANSFORM_TEMPLATES[newType]) {
      handleExpressionChange({ target: { value: TRANSFORM_TEMPLATES[newType] } });
    }
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Transform"
      inputs={[{ 
        id: 'input',
        style: {
          backgroundColor: theme.colors.node.api,
          border: `2px solid ${theme.colors.surface}`,
        }
      }]}
      outputs={[{ 
        id: 'output',
        style: {
          backgroundColor: theme.colors.node.api,
          border: `2px solid ${theme.colors.surface}`,
        }
      }]}
      style={{ backgroundColor: '#e5f6fd' }}
    >
      <NodeField label="Transform Type">
        <NodeSelect 
          value={transformType}
          onChange={handleTypeChange}
          style={{ width: '100%' }}
        >
          <option value="parseJson">Parse JSON</option>
          <option value="stringifyJson">Stringify JSON</option>
          <option value="base64Encode">Base64 Encode</option>
          <option value="base64Decode">Base64 Decode</option>
          <option value="custom">Custom Transform</option>
        </NodeSelect>
      </NodeField>
      
      {transformType === 'custom' && (
        <NodeField label="Transform Expression">
          <NodeInput
            as="textarea"
            value={expression}
            onChange={handleExpressionChange}
            placeholder="Enter JavaScript expression..."
            style={{
              fontFamily: 'monospace',
              minHeight: '60px',
              resize: 'vertical'
            }}
          />
        </NodeField>
      )}
    </BaseNode>
  );
};
