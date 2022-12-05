import React, { Component } from 'react';
import axios from 'axios';
import './product.css';
import Main from '../template/main';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrencyFormat from 'react-currency-format';


const title = "Catálogo";
const urlAPI = "http://localhost:5255/api/produto";

function num(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + min + 1)) + min;
}

const initialState = {
    produto: { id: 0, valor: 0.0, marca: '', modelo: '' },
    lista: [],
}

export default class Produtos extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI)
            .then(result => {
                this.setState({ lista: result.data })
            })
    }

    renderTable() {
        return (
            <div>
                {
                    this.state.lista.map((produto) =>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" className='ImgStyle' src={`https://api.lorem.space/image/watch?w=150&h=${num(220 , 224)}`} />
                            <Card.Body>
                                <Card.Title><h4>{produto.modelo} <h5>{produto.marca}</h5> </h4></Card.Title>
                                <Card.Text>
                                    <CurrencyFormat displayType={'text'} thousandSeparator={true} value={produto.valor} prefix={'R$ '} /> 
                                </Card.Text>
                                <div className='btnStyle'>
                                    <Button href='/login' variant="secondary">Comprar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                }
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {this.renderTable()}
            </Main>
        )
    }
}