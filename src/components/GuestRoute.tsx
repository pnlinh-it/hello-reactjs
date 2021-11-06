import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

type Props = Omit<RouteProps, 'render'>;

const GuestRoute = function ({ component, children, ...rest }: Props) {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLogin) {
          return component ? React.createElement(component, props) : children;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default GuestRoute;
