import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: 'var(--background)'
    }}>
      <header style={{
        backgroundColor: 'var(--primary)',
        padding: '16px',
        color: 'var(--text-light)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          margin: 0,
          fontSize: '24px',
          fontWeight: 500
        }}>
          VectorShift Pipeline Builder
        </h1>
      </header>
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;
