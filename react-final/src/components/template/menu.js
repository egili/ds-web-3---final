import React, { useEffect, useState } from 'react';
import './menu.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthService from '../../services/AuthService';

export default function Menu(props) {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Navbar className='nav' variant="dark">
            <Container>
                <Navbar.Brand href="/">Loja de Celulares</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/produtos">Catálogo</Nav.Link>
                    {currentUser ? (
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    ) : (
                        <Nav.Link href="/login">Login</Nav.Link>
                    )}

                    {currentUser ? (
                        <Nav.Link href="/alterar">Alterar dados</Nav.Link>
                    ) : (
                        <Nav.Link href="/cadastro">Cadastrar-se</Nav.Link>
                    )}

                    <Nav.Link href="/alterarprodutos">Alterar produtos</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}