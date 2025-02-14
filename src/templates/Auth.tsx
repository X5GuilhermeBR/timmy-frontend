import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Outlet, useNavigate } from 'react-router-dom';


const Auth: React.FC = () => {

  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {

    if (authenticated) {
      navigate('./')
      return;
    }

    logout()
    navigate("/entrar");

  }, [authenticated]);

  return <Outlet />;
}

export default Auth;