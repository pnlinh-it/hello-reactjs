import React from 'react';
import './App.less';
import { ThemeProvider } from './ThemeProvider';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AppList from './features/apps/AppList';
import UserProfile from './features/profile/UserProfile';
import GuestRoute from './components/GuestRoute';
import Login from './pages/login/Login';
import PrivateRoute from './components/PrivateRoute';
import TestComponent from './features/test/TestComponent';
import LoginGoogleCallback from './features/auth/LoginGoogleCallback';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <nav hidden>
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
            <GuestRoute path="/auth/google/callback">
              <LoginGoogleCallback />
            </GuestRoute>
            <PrivateRoute path="/">
              <TestComponent />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}
