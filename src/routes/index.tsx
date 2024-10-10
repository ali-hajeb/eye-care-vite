import { RouteObject } from 'react-router-dom';
import LoginPage from '../pages/login';
import DashboardPage from '../pages/dashboard';
import ForgetPassPage from '../pages/forgetpass';
import LogoutPage from '../pages/logout';
import SignupPage from '../pages/signup';
import PatientPage from '../pages/[patient]';
import ProfilePage from '../pages/profile';
import PatientsPage from '../pages/patients';
import NobatPage from '../pages/nobat';
import PostPage from '../pages/[post]';
import BlogPage from '../pages/blog';
import TicketsPage from '../pages/tickets';
import TicketPage from '../pages/[ticket]';

const protectedRoutes: RouteObject[] = [
  { index: true, element: <DashboardPage /> },
  { path: '/patients/:id', element: <PatientPage /> },
  { path: '/patients', element: <PatientsPage /> },
  { path: '/ticket/:id', element: <TicketPage /> },
  { path: '/ticket', element: <TicketsPage /> },
  { path: '/blog/post/:id', element: <PostPage /> },
  { path: '/blog/new', element: <PostPage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/nobat', element: <NobatPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/logout', element: <LogoutPage /> },
];
const authenticationRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/forget', element: <ForgetPassPage /> },
];

const routes = { protectedRoutes, authenticationRoutes };
export default routes;
