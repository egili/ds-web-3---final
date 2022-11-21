import React, { Component } from 'react';
import axios from 'axios';
import './insertUser.css';
import Main from '../template/main';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/logo-sem-fundo.png';
import Toast from 'react-bootstrap/Toast';

const title = "Cadastro";

const urlAPI = "http://localhost:5255/api/Usuario";

const initialState = {
    usuario: { id: 0, nome: '', email:'', senha:'', role: 'Cliente'},
    lista: [],
}

export default class insertUser extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI)
            .then(result => {
                this.setState({ lista: result.data })
            });
    }

    salvar() {
        let nome = document.getElementById('nome').value;
        let email = document.getElementById('email').value;
        let senha = document.getElementById('senha').value;

        const usuario = this.state.usuario;

        usuario.nome = String(nome);
        usuario.email = String(email);
        usuario.senha = String(senha);

        const metodo = usuario.id ? 'put' : 'post';
        const url = usuario.id ? `${urlAPI}/${usuario.id}` : urlAPI;

        axios[metodo](url, usuario)
            .then ((res)=> {
                //TODO: Não tá funcionando a mensagem de que o usuário foi cadastrado.
                console.log(res)
                if (res.status === 200){
                    return (
                        <Toast>
                          <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                          </Toast.Header>
                          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                        </Toast>
                      );
                }
            });
    }

    renderForm() {
        return (
            <div className='center'>
                <img className='imgStyle' src={logo} alt="Logo" />
                <Form className='form-style'>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Text>Nome</Form.Text>
                        <Form.Control id="nome" type="string" placeholder="Nome" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Text>Email</Form.Text>
                        <Form.Control type="email" placeholder="Insira seu email" id="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Text>Senha</Form.Text>
                        <Form.Control id="senha" type="password" placeholder="Senha" />
                    </Form.Group>
                    <div className='BtnPosition'>
                        <Button className='btnInsert' variant="secondary" type="submit" onClick={e => this.salvar(e)}>Cadastrar</Button>
                    </div>
                </Form>
            </div>
        )
    }

    render() {
        return (
            <Main className='main' title={title}>
                {this.renderForm()}
            </Main>
        )
    }
}