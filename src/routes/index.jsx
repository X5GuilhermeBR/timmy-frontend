import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Member from '../pages/Member';
import Home from '../pages/Home';
import EditMember from '../pages/EditMember';
import CreateMember from '../pages/CreateMember'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/membresia" element={<Member />} />
            <Route path="/editar-membro/:id" element={<EditMember />} />
            <Route path="/criar-membro" element={<CreateMember />} />

        </Routes>
    );
};

export default AppRoutes;
