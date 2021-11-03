import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AppList from './features/apps/AppList';
import UserProfile from './features/profile/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import Login from './features/login/Login';
import GuestRoute from './components/GuestRoute';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/apps">Apps List</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/user">User</Link>
              </li>
            </ul>
          </nav>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

          <Switch>
            <Route path="/apps">
              <AppList />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
            <GuestRoute path="/login">
              <Login />
            </GuestRoute>
            <PrivateRoute component={() => <h1>From component</h1>} path="/user">
              <h1>From Children</h1>
            </PrivateRoute>
            <PrivateRoute path="/">
              <App />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
