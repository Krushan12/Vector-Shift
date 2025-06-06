// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType };
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
      
      // Create a preview element
      const dragPreview = event.target.cloneNode(true);
      dragPreview.style.opacity = '0.6';
      dragPreview.style.position = 'absolute';
      dragPreview.style.top = '-1000px';
      document.body.appendChild(dragPreview);
      event.dataTransfer.setDragImage(dragPreview, 40, 30);
      
      // Remove the preview after drag
      setTimeout(() => {
        document.body.removeChild(dragPreview);
      }, 0);
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '80px', 
          height: '60px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: '#1C2536',
          justifyContent: 'center', 
          flexDirection: 'column'
        }} 
        draggable
      >
          <span style={{ color: '#fff' }}>{label}</span>
      </div>
    );
  };
  