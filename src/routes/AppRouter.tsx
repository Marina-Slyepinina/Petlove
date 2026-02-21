import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy } from 'react';
import { Layout } from '../components/Layout/Layout';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import { getFriends } from '../lib/api';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const NewsPage = lazy(() => import('../pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('../pages/NoticesPage/NoticesPage'));
const OurFriendsPage = lazy(() => import('../pages/OurFriendsPage/OurFriendsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'notices', element: <NoticesPage /> },
      { path: 'friends', element: <OurFriendsPage />, loader: getFriends },
      { path: 'register', element: <RestrictedRoute component={<RegisterPage />} redirectTo='/profile' /> },
      { path: 'login', element: <RestrictedRoute component={<LoginPage />} redirectTo='/profile' /> },
      { path: 'profile', element: <PrivateRoute component={<ProfilePage />} redirectTo='/login' /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};