import './App.css';
import { FloatButton } from './components/FloatButton';
import { WebInspectorPanel } from './components/WebInspectorPanel';

function App(): React.ReactElement {
  return (
    <>
      <h1>FloatButton Demo</h1>
      <FloatButton onClick={() => console.log('Settings clicked')} />
      <WebInspectorPanel isOpen={true} />
    </>
  );
}

export default App;
