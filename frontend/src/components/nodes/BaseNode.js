import React from 'react';
import { Handle, Position } from 'reactflow';

import { theme } from '../../theme';

const defaultStyles = {  nodeContainer: {
    width: 280,  // Increased width
    minHeight: 100,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    boxShadow: theme.shadows.md,
    transition: 'all 0.2s ease-in-out',
    position: 'relative', // Ensure proper positioning context
    '&:hover': {
      boxShadow: theme.shadows.lg,
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    backgroundColor: theme.colors.primary,
    color: theme.colors.text.light,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    padding: theme.spacing.xs,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.medium,
  },  input: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    border: `1px solid ${theme.colors.border}`,
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface,
    transition: 'border-color 0.2s ease-in-out',
    '&:focus': {
      outline: 'none',
      borderColor: theme.colors.secondary,
    },
    '&:hover': {
      borderColor: theme.colors.secondary,
    }
  },
  select: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface,
    cursor: 'pointer',
    transition: 'border-color 0.2s ease-in-out',
    '&:focus': {
      outline: 'none',
      borderColor: theme.colors.secondary,
    },
    '&:hover': {
      borderColor: theme.colors.secondary,
    }
  },
};

export const BaseNode = ({
  id,
  data,
  title,
  inputs = [],
  outputs = [],
  children,
  style = {},
}) => {
  const handleStyle = {
    width: '12px',
    height: '12px',
    background: theme.colors.primary,
    border: '2px solid #fff',
    borderRadius: '50%',
    cursor: 'crosshair',
    opacity: 0.8,
    transition: 'all 0.2s ease-in-out',
    zIndex: 1000
  };

  return (
    <div style={{ ...defaultStyles.nodeContainer, ...style }}>
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${id}-${index}`}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            ...handleStyle,
            top: inputs.length === 1 ? '50%' : `${((index + 1) * 100) / (inputs.length + 1)}%`,
            left: -6,
            ...input.style,
          }}
        />
      ))}

      {/* Header */}
      <div style={defaultStyles.header}>
        <span>{title}</span>
      </div>

      {/* Content */}
      <div style={defaultStyles.content}>
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${id}-${index}`}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            ...handleStyle,
            top: outputs.length === 1 ? '50%' : `${((index + 1) * 100) / (outputs.length + 1)}%`,
            right: -6,
            ...output.style,
          }}
        />
      ))}
    </div>
  );
};

// Reusable form components
export const NodeField = ({ label, children }) => (
  <div style={defaultStyles.field}>
    <label style={defaultStyles.label}>{label}</label>
    {children}
  </div>
);

export const NodeInput = ({ value, onChange, ...props }) => (
  <input
    style={defaultStyles.input}
    value={value}
    onChange={onChange}
    {...props}
  />
);

export const NodeSelect = ({ value, onChange, children, ...props }) => (
  <select
    style={defaultStyles.select}
    value={value}
    onChange={onChange}
    {...props}
  >
    {children}
  </select>
);

// Helper hook for node state management
export const useNodeState = (initialState, id, fieldName) => {
  const [value, setValue] = React.useState(initialState);

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);
    // Here we could add logic to update the global store if needed
  }, []);

  return [value, handleChange];
};
