import { BaseNode, NodeField, NodeInput, NodeSelect, useNodeState } from '../components/nodes/BaseNode';

export const APINode = ({ id, data }) => {
  const [method, handleMethodChange] = useNodeState(
    data?.method || 'GET',
    id,
    'method'
  );

  const [url, handleUrlChange] = useNodeState(
    data?.url || 'https://api.example.com',
    id,
    'url'
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Request"
      inputs={[
        { id: 'headers' },
        { id: 'body' }
      ]}
      outputs={[
        { id: 'response' },
        { id: 'error' }
      ]}
      style={{
        backgroundColor: '#e3f2fd'
      }}
    >
      <NodeField label="Method">
        <NodeSelect 
          value={method}
          onChange={handleMethodChange}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </NodeSelect>
      </NodeField>
      <NodeField label="URL">
        <NodeInput 
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter API URL..."
        />
      </NodeField>
    </BaseNode>
  );
};
