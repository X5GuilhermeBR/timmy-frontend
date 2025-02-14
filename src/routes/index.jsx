import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Auth from '../templates/Auth';
import Private from '../templates/Private';

import Member from '../pages/Member';
import Home from '../pages/Home';
import EditMember from '../pages/EditMember';
import CreateMember from '../pages/CreateMember'
import Login from '../pages/Login';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Auth/>}>
                <Route path="/entrar" element={<Login />} />
            </Route>
            <Route element={<Private/>}>
                <Route path="/" element={<Home />} />
                <Route path="/membresia" element={<Member />} />
                <Route path="/editar-membro/:id" element={<EditMember />} />
                <Route path="/criar-membro" element={<CreateMember />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
