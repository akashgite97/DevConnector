import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ component: Component }, ...rest) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={() =>
        !auth.isAuthenticated ? <Redirect to='/login' /> : <Component />
      }
    />
  );
};

export default PrivateRoute;
