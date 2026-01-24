import {
  WebInspectorButton,
  WebInspectorPanel,
  WebInspectorProvider
} from 'react-web-inspector-ui';

// Development operation check
// import './index.css';
// import { WebInspectorProvider } from './components/WebInspector';
// import { WebInspectorButton } from './components/WebInspectorButton/';
// import { WebInspectorPanel } from './components/WebInspectorPanel/';

function App(): React.ReactElement {
  return (
    <WebInspectorProvider>
      <h1>WebInspectorButton Demo</h1>
      <WebInspectorButton />
      <WebInspectorPanel />
    </WebInspectorProvider>
  );
}

export default App;
