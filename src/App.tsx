import './App.css';
import { WebInspectorButton } from './components/WebInspectorButton';
import { WebInspectorPanel } from './components/WebInspectorPanel';

function App(): React.ReactElement {
  return (
    <>
      <h1>WebInspectorButton Demo</h1>
      <WebInspectorButton onClick={() => console.log('Settings clicked')} />
      <WebInspectorPanel isOpen={true} />
    </>
  );
}

export default App;
