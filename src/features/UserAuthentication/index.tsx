import UserProtectedRoutesProvider from './App';
import authHeader from './services/authHeader';
import userAuthAction from './store/userAuthAction';
import userReducer, { logout, resetResponse } from './store/userSlice';

const userAuthActions = { ...userAuthAction, logout };

export { userAuthActions, userReducer, logout, resetResponse, authHeader };

export default UserProtectedRoutesProvider;
