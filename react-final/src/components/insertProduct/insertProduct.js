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

const title = "Cadastro de Produtos";

const urlAPI = "http://localhost:5255/api/produto";

const initialState = {
    produto: { id: 0, valor: 0.0, marca: '', modelo: '' },
    lista: [],
}

export default class insertProduct extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI)
            .then(result => {
                this.setState({ lista: result.data })
            });
    }

    salvar() {
        let marca = document.getElementById('marca').marca;
        let valor = document.getElementById('valor').valor;
        let modelo = document.getElementById('modelo').modelo;

        if(marca === '' || valor === '' || modelo === ''){
            window.alert('erro, reveja as informações preenchidas')
            return
        }

        const produto = this.state.produto;

        produto.marca = String(marca);
        produto.valor = String(valor);
        produto.senha = String(modelo);

        const metodo = produto.id ? 'put' : 'post';
        const url = produto.id ? `${urlAPI}/${produto.id}` : urlAPI;

        axios[metodo](url, produto)
            .then ((res)=> {
                console.log('res aqui ' + res)
                if (res){
                    window.alert('sucesso ao inserir novo produto')
                } else {
                    window.alert('erro ao inserir novo produto')
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
                        <Form.Text>Marca</Form.Text>
                        <Form.Control id="marca" type="string" placeholder="Marca" required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Text>Valor</Form.Text>
                        <Form.Control type="number" placeholder="Valor" id="email" required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Text>Modelo</Form.Text>
                        <Form.Control id="modelo" type="password" placeholder="Modelo" required/>
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