import {
  WebInspectorButton,
  WebInspectorPanel,
  WebInspectorProvider,
} from 'react-web-inspector-ui';

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
