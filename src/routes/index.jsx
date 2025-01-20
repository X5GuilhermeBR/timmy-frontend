import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Member from '../pages/Member';
import Home from '../pages/Home';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/membresia" element={<Member />} />
  </Routes>
);

export default AppRoutes;