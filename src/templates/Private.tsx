import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Outlet, useNavigate } from 'react-router-dom';


const Private: React.FC = () => {

    const { authenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) navigate('./entrar');
    }, [authenticated])

    return <Outlet />;
}

export default Private;