import { Navigate } from 'react-router';

interface RestrictedRouteProps {
    component: React.ReactNode;
    redirectTo?: string;
}

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }: RestrictedRouteProps) => {

  const isloggedIn = false;

  return isloggedIn ? <Navigate to={redirectTo} /> : Component;
  
};
