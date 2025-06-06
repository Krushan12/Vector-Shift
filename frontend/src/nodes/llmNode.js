// llmNode.js

import { BaseNode } from '../components/nodes/BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputs={[
        { id: 'system' },
        { id: 'prompt' }
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div style={{ padding: '8px', color: '#666' }}>
        <span>Large Language Model</span>
      </div>
    </BaseNode>
  );
}
