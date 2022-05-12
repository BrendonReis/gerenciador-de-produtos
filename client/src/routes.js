import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from './pages/Login/Login';
import Produto from './pages/Home/Produto';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Produto" exact element={<Produto />} />
            </Routes>
        </BrowserRouter>);
};

export default Router;