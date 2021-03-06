import React, { useCallback, useState } from 'react';
import logo from '../../logo.svg';
import '../../App.less';
import { useAppDispatch } from '../../app/hooks';
import { ThemeProvider } from '../../ThemeProvider';
import CountDisplay from '../../CountDisplay';
import MyButton from '../../MyButton';
import ThemeToggle from '../../ThemeToggle';
import ThemeDisplay from '../../ThemeDisplay';
import UseRef from '../../components/use-ref/UseRef';
import { useHistory } from 'react-router-dom';
import { logout } from '../auth/authSlice';

export default function TestComponent() {
  console.log('App render');

  const dispatch = useAppDispatch();

  const history = useHistory();

  // useEffect(() => {
  //   async function login() {
  //     const result = await dispatch(login(1));
  //     console.log(result);
  //   }
  //
  //   login();
  // }, [dispatch]);

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setLoading(!loading);
  }, [loading]);

  // const handleClick = () => {
  //   setLoading(!loading);
  // };
  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    history.replace('/');
  };

  const handleThemDisplayOnClick = useCallback(() => {
    console.log('handleThemDisplayOnClick');
  }, []);

  return (
    <ThemeProvider>
      <li>
        <a onClick={handleSignOut}>Logout</a>
      </li>
      <div>
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
    </ThemeProvider>
  );
}
