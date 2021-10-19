import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import ThemeDisplay from './ThemeDisplay';
import { ThemeProvider } from './ThemeProvider';
import CountDisplay from './CountDisplay';
import UseRef from './components/use-ref/UseRef';

function App() {
  console.log('App render');

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setLoading(!loading);
  }, [loading]);

  // const handleClick = () => {
  //   setLoading(!loading);
  // };

  const handleThemDisplayOnClick = useCallback(() => {
    console.log('handleThemDisplayOnClick');
  }, []);

  return (
    <ThemeProvider>
      <input value={count} onChange={(event) => setCount(+event.target.value)} />
      <CountDisplay onClick={handleClick} />

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button content="Alert" onClick={handleClick} />
          <ThemeToggle />
          <ThemeDisplay onClick={handleThemDisplayOnClick} />
          {loading && <label>Loading....</label>}
        </header>
        <section>
          <UseRef />
        </section>
      </div>
    </ThemeProvider>
  );
}

export default App;
