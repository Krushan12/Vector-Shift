// textNode.js

import { useCallback, useEffect, useRef, useState } from 'react';
import { BaseNode, NodeField, NodeInput, useNodeState } from '../components/nodes/BaseNode';
import { theme } from '../theme';

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

const TextPreview = ({ text }) => {
  const variables = extractVariables(text);
  let lastIndex = 0;
  const elements = [];

  // Find all variable positions
  const matches = [...text.matchAll(/{{([^{}]+)}}/g)];
  
  matches.forEach((match, i) => {
    if (match.index > lastIndex) {
      elements.push(
        <span key={`text-${i}`}>
          {text.slice(lastIndex, match.index)}
        </span>
      );
    }

    const varName = match[1].trim();
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(varName)) {
      elements.push(
        <span
          key={`var-${i}`}
          style={{
            backgroundColor: theme.colors.secondary + '20',
            color: theme.colors.secondary,
            padding: '0 4px',
            borderRadius: '4px',
            fontWeight: 500
          }}
        >
          {match[0]}
        </span>
      );
    } else {
      elements.push(
        <span key={`invalid-${i}`}>
          {match[0]}
        </span>
      );
    }

    lastIndex = match.index + match[0].length;
  });

  if (lastIndex < text.length) {
    elements.push(
      <span key="text-end">
        {text.slice(lastIndex)}
      </span>
    );
  }

  return <div style={{ whiteSpace: 'pre-wrap' }}>{elements}</div>;
};

export const TextNode = ({ id, data }) => {
  const [currText, handleTextChange] = useNodeState(
    data?.text || '{{input}}',
    id,
    'text'
  );

  const textareaRef = useRef(null);
  const [variables, setVariables] = useState([]);
  const [nodeWidth, setNodeWidth] = useState(280);

  const adjustSizes = useCallback(() => {
    if (textareaRef.current) {
      // Reset height to calculate proper scrollHeight
      textareaRef.current.style.height = 'auto';
      
      // Calculate width based on content
      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length));
      const charWidth = 8; // Approximate width per character
      const padding = 80; // Additional padding
      const minWidth = 280;
      const maxWidth = 800;
      
      const calculatedWidth = Math.min(maxWidth, Math.max(minWidth, (maxLineLength * charWidth) + padding));
      
      // Apply new sizes
      setNodeWidth(calculatedWidth);
      textareaRef.current.style.width = `${calculatedWidth - 40}px`; // Account for padding
      textareaRef.current.style.height = `${Math.min(400, textareaRef.current.scrollHeight)}px`; // Max height of 400px
    }
  }, [currText]);

  useEffect(() => {
    const newVariables = extractVariables(currText);
    setVariables(newVariables);
    adjustSizes();
  }, [currText, adjustSizes]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputs={[
        ...(variables.length ? [] : [{
          id: 'input',
          type: 'target',
          style: {
            backgroundColor: theme.colors.secondary,
            border: `2px solid ${theme.colors.surface}`,
          }
        }]),
        ...variables.map(varName => ({
          id: varName,
          type: 'target',
          label: varName,
          style: {
            backgroundColor: theme.colors.secondary,
            border: `2px solid ${theme.colors.surface}`,
          }
        }))
      ].sort((a, b) => a.label?.localeCompare(b.label) || 0)}
      outputs={[{ 
        id: 'output',
        type: 'source',
        style: {
          backgroundColor: theme.colors.node.text,
          border: `2px solid ${theme.colors.surface}`,
        }
      }]}
      style={{ 
        width: `${nodeWidth}px`,
        maxWidth: '800px',
        transition: 'width 0.2s ease-in-out'
      }}
    >
      <NodeField label={`Text ${variables.length ? `(${variables.length} variables)` : ''}`}>
        <div style={{ position: 'relative' }}>
          <NodeInput
            ref={textareaRef}
            as="textarea"
            value={currText}
            onChange={(e) => {
              handleTextChange(e);
              adjustSizes();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                const start = e.target.selectionStart;
                const end = e.target.selectionEnd;
                e.target.value = currText.substring(0, start) + '  ' + currText.substring(end);
                e.target.selectionStart = e.target.selectionEnd = start + 2;
                handleTextChange(e);
              }
            }}
            style={{
              width: '100%',
              minHeight: '60px',
              maxHeight: '400px',
              padding: '8px',
              lineHeight: '1.5',
              resize: 'none',
              fontFamily: 'monospace',
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius.sm,
              '&:focus': {
                outline: 'none',
                borderColor: theme.colors.secondary,
                boxShadow: `0 0 0 2px ${theme.colors.secondary}20`
              }
            }}
            placeholder="Enter text here. Use {{variable}} for variables..."
          />
        </div>
        <div style={{ 
          marginTop: '8px',
          padding: '8px',
          backgroundColor: theme.colors.background,
          borderRadius: theme.borderRadius.sm,
          fontSize: '14px',
          border: `1px solid ${theme.colors.border}`,
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          <TextPreview text={currText} />
        </div>
      </NodeField>
    </BaseNode>
  );
}
