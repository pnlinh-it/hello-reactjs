import React from 'react';
import './App.less';
import { ThemeProvider } from './ThemeProvider';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import GuestRoute from './components/GuestRoute';
import Login from './pages/login/Login';
import PrivateRoute from './components/PrivateRoute';
import LoginGoogleCallback from './features/auth/LoginGoogleCallback';
import AppLayout from './layouts/AppLayout';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <Switch>
            <GuestRoute exact path="/login">
              <Login />
            </GuestRoute>
            <PrivateRoute exact component={() => <h1>From component</h1>} path="/user">
              <h1>From Children</h1>
            </PrivateRoute>
            <GuestRoute exact path="/auth/google/callback">
              <LoginGoogleCallback />
            </GuestRoute>
            <PrivateRoute path="/">
              <AppLayout />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}
