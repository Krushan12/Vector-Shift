// promptTemplateNode.js
import { BaseNode, NodeField, NodeInput, useNodeState } from '../components/nodes/BaseNode';
import { theme } from '../theme';
import { useEffect, useState, useCallback } from 'react';

const extractVariables = (text) => {
  const regex = /{{([^{}]+)}}/g;
  const matches = [...text.matchAll(regex)];
  const variables = new Set();
  
  matches.forEach(match => {
    const varName = match[1].trim();
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(varName)) {
      variables.add(varName);
    }
  });
  
  return Array.from(variables);
};

export const PromptTemplateNode = ({ id, data }) => {
  const [template, handleTemplateChange] = useNodeState(
    data?.template || 'You are a helpful assistant. {{context}}\n\nUser: {{question}}\nAssistant:',
    id,
    'template'
  );

  const [systemPrompt, handleSystemPromptChange] = useNodeState(
    data?.systemPrompt || '',
    id,
    'systemPrompt'
  );

  const [variables, setVariables] = useState([]);

  const updateVariables = useCallback(() => {
    const allVariables = extractVariables(template);
    setVariables(allVariables);
  }, [template]);

  useEffect(() => {
    updateVariables();
  }, [template, updateVariables]);

  // Create input handles for each variable
  const inputHandles = variables.map(varName => ({
    id: `${id}-${varName}-in`,
    type: 'target',
    data: { variable: varName },
    style: {
      background: theme.colors.primary,
      zIndex: 1000
    }
  }));

  return (
    <BaseNode
      id={id}
      data={{ ...data, variables }}
      title="Prompt Template"
      inputs={inputHandles}
      outputs={[{ 
        id: `${id}-out`,
        style: {
          background: theme.colors.primary,
          zIndex: 1000
        }
      }]}
      style={{ backgroundColor: '#f3e8ff' }}
    >
      <NodeField label="System Prompt (Optional)">
        <NodeInput
          as="textarea"
          value={systemPrompt}
          onChange={handleSystemPromptChange}
          placeholder="Enter system prompt..."
          style={{
            fontFamily: 'monospace',
            minHeight: '60px',
            resize: 'vertical',
            marginBottom: '8px',
            width: '100%',
            padding: '8px'
          }}
        />
      </NodeField>

      <NodeField label={`Template (${variables.length} variables)`}>
        <NodeInput
          as="textarea"
          value={template}
          onChange={handleTemplateChange}
          placeholder="Enter prompt template..."
          style={{
            fontFamily: 'monospace',
            minHeight: '100px',
            resize: 'vertical',
            width: '100%',
            padding: '8px'
          }}
        />
      </NodeField>

      <div style={{
        marginTop: '8px',
        fontSize: '12px',
        color: theme.colors.text.secondary
      }}>
        Variables: {variables.join(', ') || 'None'}
      </div>
    </BaseNode>
  );
};
