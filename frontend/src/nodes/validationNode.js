// validationNode.js
import { BaseNode, NodeField, NodeSelect, NodeInput, useNodeState } from '../components/nodes/BaseNode';
import { theme } from '../theme';

const VALIDATION_TEMPLATES = {
  string: 'typeof value === "string"',
  number: 'typeof value === "number" && !isNaN(value)',
  array: 'Array.isArray(value)',
  boolean: 'typeof value === "boolean"',
  email: '/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)',
  url: 'try { new URL(value); return true; } catch { return false; }',
  custom: ''
};

export const ValidationNode = ({ id, data }) => {
  const [validationType, handleValidationTypeChange] = useNodeState(
    data?.validationType || 'custom',
    id,
    'validationType'
  );

  const [condition, handleConditionChange] = useNodeState(
    data?.condition || VALIDATION_TEMPLATES[validationType] || '',
    id,
    'condition'
  );

  const [errorMessage, handleErrorMessageChange] = useNodeState(
    data?.errorMessage || 'Validation failed',
    id,
    'errorMessage'
  );

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    handleValidationTypeChange(e);
    if (VALIDATION_TEMPLATES[newType]) {
      handleConditionChange({ target: { value: VALIDATION_TEMPLATES[newType] } });
    }
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Validation"
      inputs={[{ 
        id: 'value',
        style: {
          backgroundColor: theme.colors.node.conditional,
          border: `2px solid ${theme.colors.surface}`,
        }
      }]}
      outputs={[
        { 
          id: 'valid',
          label: 'Valid',
          style: {
            backgroundColor: '#4caf50',
            border: `2px solid ${theme.colors.surface}`,
          }
        },
        { 
          id: 'invalid',
          label: 'Invalid',
          style: {
            backgroundColor: '#f44336',
            border: `2px solid ${theme.colors.surface}`,
          }
        }
      ]}
      style={{ backgroundColor: '#fff3e0' }}
    >
      <NodeField label="Validation Type">
        <NodeSelect 
          value={validationType}
          onChange={handleTypeChange}
          style={{ width: '100%' }}
        >
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="array">Array</option>
          <option value="boolean">Boolean</option>
          <option value="email">Email</option>
          <option value="url">URL</option>
          <option value="custom">Custom</option>
        </NodeSelect>
      </NodeField>
      
      {validationType === 'custom' && (
        <NodeField label="Validation Condition">
          <NodeInput
            as="textarea"
            value={condition}
            onChange={handleConditionChange}
            placeholder="Enter validation condition..."
            style={{
              fontFamily: 'monospace',
              minHeight: '60px',
              resize: 'vertical'
            }}
          />
        </NodeField>
      )}

      <NodeField label="Error Message">
        <NodeInput
          type="text"
          value={errorMessage}
          onChange={handleErrorMessageChange}
          placeholder="Enter error message..."
        />
      </NodeField>
    </BaseNode>
  );
};
