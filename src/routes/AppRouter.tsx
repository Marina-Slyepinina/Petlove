import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from '../components/Layout/Layout';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { NewsPage } from '../pages/NewsPage/NewsPage';
import { NoticesPage } from '../pages/NoticesPage/NoticesPage';
import { OurFriendsPage } from '../pages/OurFriendsPage/OurFriendsPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { RestrictedRoute } from './RestrictedRoute';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'notices', element: <NoticesPage /> },
      { path: 'friends', element: <OurFriendsPage /> },
      { path: 'register', element: <RestrictedRoute component={<RegisterPage />} redirectTo='/profile' /> },
      { path: 'login', element: <RestrictedRoute component={<LoginPage />} redirectTo='/profile' /> },
      { path: 'profile', element: <PrivateRoute component={<ProfilePage />} redirectTo='/login' /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
