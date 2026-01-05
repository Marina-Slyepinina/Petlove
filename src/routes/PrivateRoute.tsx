import { Navigate } from 'react-router';

interface PrivateRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

export const PrivateRoute = ({ component: Component, redirectTo = '/login' }: PrivateRouteProps) => {
  const isLoggedIn = false;
  
  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
