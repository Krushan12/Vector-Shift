import { BaseNode, NodeField, NodeSelect, useNodeState } from '../components/nodes/BaseNode';

export const ImageNode = ({ id, data }) => {
  const [filter, handleFilterChange] = useNodeState(
    data?.filter || 'grayscale',
    id,
    'filter'
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Image Processing"
      inputs={[{ id: 'image' }]}
      outputs={[{ id: 'processed' }]}
      style={{
        backgroundColor: '#f8f9fa'
      }}
    >
      <NodeField label="Filter">
        <NodeSelect 
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="grayscale">Grayscale</option>
          <option value="blur">Blur</option>
          <option value="sharpen">Sharpen</option>
          <option value="sepia">Sepia</option>
        </NodeSelect>
      </NodeField>
    </BaseNode>
  );
};
