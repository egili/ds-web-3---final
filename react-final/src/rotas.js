import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/main';
import Login from './components/login/login';
import Logo from './components/template/logo';
import Logout from './components/logout/logout';
import AuthService from './services/AuthService';
import Catalog from './components/catalog/product';
import Insert from './components/insertUser/insertUser';
import UpdateUser from './components/updateUser/updateUser';
import UpdateProduct from './components/updateProduct/updateProduct';

export default function Rotas() {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem Vindo(a)!">
                        <Logo />
                        <div>Loja de celulares</div>
                    </Main>}
            />

            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />

            <Route path='/produtos' element={<Catalog />} />
            <Route path='/cadastro' element={<Insert />} />

            {currentUser ? (
            <Route path='/alterar' element={<UpdateUser />} />
            ) : (
            <Route path='/alterar' element=
                {<Main title="Atualizar dados!">
                    <div>Não Autorizado!</div>
                </Main>} />     
            )}

            {currentUser ? (
                <Route path='/alterarProdutos' element={<UpdateProduct />} />
            ) : (
            <Route path='/alterarProdutos' element=
                {<Main title="Atualizar produtos!">
                    <div>Não Autorizado!</div>
                </Main>} />     
            )}

            <Route path='*' element={
                <Main title="Bem Vindo(a)!">
                    <div>Página não encontrada</div>
                </Main>} />
        </Routes>
    )
}