import React, { Component } from 'react';
import axios from 'axios';
import './insertUser.css';
import Main from '../template/main';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/logo-sem-fundo.png';
import Toast from 'react-bootstrap/Toast';

import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

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

        if(nome === '' || email === '' || senha === ''){
            window.alert('erro, reveja as informações preenchidas')
            return
        }

        const usuario = this.state.usuario;

        usuario.nome = String(nome);
        usuario.email = String(email);
        usuario.senha = String(senha);

        const metodo = usuario.id ? 'put' : 'post';
        const url = usuario.id ? `${urlAPI}/${usuario.id}` : urlAPI;

        axios[metodo](url, usuario)
            .then ((res)=> {
                console.log('res aqui ' + res)
                if (res){
                    window.alert('sucesso ao inserir o usuario ' + usuario.nome)
                } else {
                    window.alert('erro ao inserir novo usuario')
                    toast.error("erro")
                }
            });
    }

    renderForm() {
        return (
            <div className='center'>
                <img className='imgStyle' src={logo} alt="Logo" />
                <Form className='form-style'>

                    <Form.Group className="mb-3">
                        <Form.Text>Nome</Form.Text>
                        <Form.Control id="nome" type="string" placeholder="Nome" required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Text>Email</Form.Text>
                        <Form.Control type="email" placeholder="Insira seu email" id="email" required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Text>Senha</Form.Text>
                        <Form.Control id="senha" type="password" placeholder="Senha" required/>
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