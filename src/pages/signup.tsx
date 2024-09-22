import React from 'react';
import SignupPanel from '../containers/SignupPanel';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';

export interface SignupProps {
    
}

const Signup: React.FunctionComponent<SignupProps> = () => {
    const { state } = useLocation();

    const token = useAppSelector((state) => state.user.token);

    const redirectPath = state?.from !== '/logout' ? state?.from || '/' : '/';
    const redirect = token ? <Navigate to={redirectPath} replace /> : null;

    return redirect || <SignupPanel />;
}

export default Signup;