// arrayNode.js
import { BaseNode, NodeField, NodeSelect, NodeInput, useNodeState } from '../components/nodes/BaseNode';
import { theme } from '../theme';

export const ArrayNode = ({ id, data }) => {
  const [operation, handleOperationChange] = useNodeState(
    data?.operation || 'map',
    id,
    'operation'
  );

  const [expression, handleExpressionChange] = useNodeState(
    data?.expression || 'item => item',
    id,
    'expression'
  );

  const getOperationLabel = (op) => {
    switch (op) {
      case 'map': return 'Transform each element';
      case 'filter': return 'Keep elements where';
      case 'reduce': return 'Reduce with';
      default: return '';
    }
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Array Operation"
      inputs={[{ id: 'array', label: 'Array' }]}
      outputs={[{ 
        id: 'output',
        style: {
          backgroundColor: theme.colors.node.math,
          border: `2px solid ${theme.colors.surface}`,
        }
      }]}
      style={{ backgroundColor: '#fff4e6' }}
    >
      <NodeField label="Operation">
        <NodeSelect 
          value={operation}
          onChange={handleOperationChange}
          style={{ width: '100%' }}
        >
          <option value="map">Map</option>
          <option value="filter">Filter</option>
          <option value="reduce">Reduce</option>
        </NodeSelect>
      </NodeField>
      
      <NodeField label={getOperationLabel(operation)}>
        <NodeInput
          as="textarea"
          value={expression}
          onChange={handleExpressionChange}
          placeholder={
            operation === 'map' ? 'item => item * 2' :
            operation === 'filter' ? 'item => item > 0' :
            'acc, item => acc + item'
          }
          style={{
            fontFamily: 'monospace',
            minHeight: '60px',
            resize: 'vertical'
          }}
        />
      </NodeField>
    </BaseNode>
  );
};
