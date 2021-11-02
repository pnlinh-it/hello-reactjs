import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.less';
import MyButton from './MyButton';
import ThemeToggle from './ThemeToggle';
import ThemeDisplay from './ThemeDisplay';
import { ThemeProvider } from './ThemeProvider';
import CountDisplay from './CountDisplay';
import UseRef from './components/use-ref/UseRef';
import { useAppDispatch } from './app/hooks';
import { incrementAsync } from './features/counter/counterSlice';
import Login from './pages/login/Login';

function App() {
  console.log('App render');

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function login() {
      const result = await dispatch(incrementAsync(1));
      console.log(result);
    }

    login();
  }, []);

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
      <div hidden>
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
            <MyButton content="Alert" onClick={handleClick} />
            <ThemeToggle />
            <ThemeDisplay onClick={handleThemDisplayOnClick} />
            {loading && <label>Loading....</label>}
          </header>
          <section>
            <UseRef />
          </section>
        </div>
      </div>
      <Login />
    </ThemeProvider>
  );
}

export default App;
