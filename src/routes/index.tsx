import { RouteObject } from 'react-router-dom';
import LoginPage from '../pages/login';
import DashboardPage from '../pages/dashboard';
import ForgetPassPage from '../pages/forgetpass';
import LogoutPage from '../pages/logout';
import SignupPage from '../pages/signup';

const protectedRoutes: RouteObject[] = [
  { index: true, element: <DashboardPage /> },
  { path: '/logout', element: <LogoutPage /> },
];
const authenticationRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/forget', element: <ForgetPassPage /> },
];

const routes = { protectedRoutes, authenticationRoutes };
export default routes;
