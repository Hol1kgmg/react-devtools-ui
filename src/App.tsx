import { useState } from 'react';

import './App.css';
import { FloatButton } from './components/FloatButton';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>FloatButton Demo</h1>
      <div className="card">
        <p>カウント: {count}</p>
        <p>右下の + ボタンをクリックしてください</p>
      </div>

      <FloatButton
        position="bottom-right"
        shape="circle"
        size="large"
        onClick={() => setCount((c) => c + 1)}
      >
        +
      </FloatButton>

      <FloatButton
        position="bottom-left"
        shape="circle"
        size="medium"
        onClick={() => setCount((c) => Math.max(0, c - 1))}
      >
        -
      </FloatButton>
    </>
  );
}

export default App;
