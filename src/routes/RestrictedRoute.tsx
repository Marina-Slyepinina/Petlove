import { Navigate } from 'react-router';
import { useAuthStore } from '../store/authStore';

interface RestrictedRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }: RestrictedRouteProps) => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
  
};
