import './App.css';
import { FloatButton } from './components/FloatButton';

function App(): React.ReactElement {
  return (
    <>
      <h1>FloatButton Demo</h1>
      <FloatButton onClick={() => console.log('Settings clicked')} />
    </>
  );
}

export default App;
