// Theme constants
export const theme = {
  colors: {
    primary: '#1C2536',
    secondary: '#4F46E5',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    border: '#E5E7EB',
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      light: '#FFFFFF'
    },
    node: {
      input: '#3B82F6',      // blue
      output: '#10B981',     // green
      llm: '#8B5CF6',       // purple
      text: '#F59E0B',      // amber
      math: '#EF4444',      // red
      image: '#06B6D4',     // cyan
      conditional: '#F97316', // orange
      timer: '#84CC16',     // lime
      api: '#EC4899',       // pink
      array: '#6366F1',     // indigo
      promptTemplate: '#9333EA', // deep purple
      dataTransform: '#0EA5E9', // light blue
      validation: '#F59E0B',  // amber
      debug: '#64748B'       // slate
    },
    handle: {
      background: '#94A3B8',
      backgroundActive: '#4F46E5'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px'
  },
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  }
};
