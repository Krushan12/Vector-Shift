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

  return (
    <BaseNode
      id={id}
      data={data}
      title="Prompt Template"
      inputs={[
        ...variables.map(varName => ({
          id: varName,
          label: varName,
          style: {
            backgroundColor: theme.colors.node.llm,
            border: `2px solid ${theme.colors.surface}`,
          }
        }))
      ].sort((a, b) => a.label.localeCompare(b.label))}
      outputs={[{ 
        id: 'prompt',
        style: {
          backgroundColor: theme.colors.node.llm,
          border: `2px solid ${theme.colors.surface}`,
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
            marginBottom: '8px'
          }}
        />
      </NodeField>

      <NodeField label={`Template (${variables.length} variables)`}>
        <NodeInput
          as="textarea"
          value={template}
          onChange={handleTemplateChange}
          placeholder="Enter prompt template. Use {{variable}} for variables..."
          style={{
            fontFamily: 'monospace',
            minHeight: '100px',
            resize: 'vertical'
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
