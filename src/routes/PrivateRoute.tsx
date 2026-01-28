import { Navigate } from 'react-router';
import { useAuthStore } from '../store/authStore';

interface PrivateRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

export const PrivateRoute = ({ component: Component, redirectTo = '/login' }: PrivateRouteProps) => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  
  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
