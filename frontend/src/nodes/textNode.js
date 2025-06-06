// textNode.js

import { useCallback, useEffect, useState, useRef } from 'react';
import { BaseNode, NodeField, NodeInput, useNodeState } from '../components/nodes/BaseNode';
import { theme } from '../theme';

const extractVariables = (text) => {
  const regex = /{{([^}]+)}}/g;
  const matches = [...text.matchAll(regex)];
  return matches.map(match => ({
    name: match[1].trim(),
    start: match.index,
    end: match.index + match[0].length
  }));
};

const VariableHighlight = ({ text, variables }) => {
  if (!variables.length) return <span>{text}</span>;

  let lastIndex = 0;
  const elements = [];

  variables.forEach((variable, i) => {
    // Add text before the variable
    if (variable.start > lastIndex) {
      elements.push(
        <span key={`text-${i}`}>
          {text.slice(lastIndex, variable.start)}
        </span>
      );
    }

    // Add the highlighted variable
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
        {text.slice(variable.start, variable.end)}
      </span>
    );

    lastIndex = variable.end;
  });

  // Add any remaining text
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

  const [variables, setVariables] = useState([]);
  const [nodeWidth, setNodeWidth] = useState(280);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-resize textarea and node
  const adjustSizes = useCallback(() => {
    if (textareaRef.current) {
      // Reset height to calculate proper scrollHeight
      textareaRef.current.style.height = 'auto';
      
      // Calculate new sizes
      const textWidth = Math.max(
        ...currText.split('\n').map(line => Math.min(line.length * 8, 400))
      );
      const newWidth = Math.max(280, textWidth + 40); // 40px padding
      
      // Apply new sizes
      setNodeWidth(newWidth);
      textareaRef.current.style.width = `${newWidth - 40}px`;
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Improved variable extraction
  const extractVariables = useCallback((text) => {
    const regex = /{{([^{}]+)}}/g;
    const matches = [...text.matchAll(regex)];
    return matches
      .map(match => match[1].trim())
      .filter(name => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) // Valid JS variable names only
      .filter((name, index, self) => self.indexOf(name) === index); // Remove duplicates
  }, []);

  // Update variables and resize when text changes
  useEffect(() => {
    const vars = extractVariables(currText);
    setVariables(vars);
    adjustSizes();
  }, [currText, adjustSizes, extractVariables]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputs={[{
        id: 'input',
        type: 'target',
        style: {
          backgroundColor: theme.colors.secondary,
          border: `2px solid ${theme.colors.surface}`,
        }
      }, ...variables.map(varName => ({
        id: varName,
        type: 'target',
        label: varName,
        style: {
          backgroundColor: theme.colors.secondary,
          border: `2px solid ${theme.colors.surface}`,
        }
      }))]}
      outputs={[{ 
        id: 'output',
        type: 'source'
      }]}
      style={{ 
        width: `${nodeWidth}px`, 
        minHeight: '100px',
        transition: 'width 0.2s ease-in-out'
      }}
    >
      <NodeField label={`Text (${variables.length} variables)`}>
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
              if (e.key === 'Enter') {
                e.target.style.height = '0';
                adjustSizes();
              }
            }}
            style={{
              width: '100%',
              minHeight: '60px',
              padding: '8px',
              lineHeight: '1.5',
              resize: 'none',
              fontFamily: 'monospace'
            }}
            placeholder="Enter text here. Use {{variable}} for variables..."
          />
        </div>
        <div style={{ 
          marginTop: '8px',
          padding: '8px',
          backgroundColor: theme.colors.background,
          borderRadius: theme.borderRadius.sm,
          fontSize: '14px'
        }}>
          <VariableHighlight text={currText} variables={variables} />
        </div>
      </NodeField>
    </BaseNode>
  );
}
