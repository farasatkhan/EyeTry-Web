import { Route, Navigate } from 'react-router-dom';

const RestrictedRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default RestrictedRoute;
