import React, { Component } from 'react';

import axios from 'axios';
import './updateProduct.css';
import Main from '../template/main';

const title = "Alterar Produtos";

const urlAutoriza = "http://localhost:5255/api/Home/Adm";
const urlAPI = "http://localhost:5255/api/produto";


const initialState = {
    produto: { id: 0, valor: 0.0, marca: '', modelo: '' },
    lista: [],
}

const user = JSON.parse(localStorage.getItem("user"));

export default class updateProduct extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI)
        .then(result => {
            this.setState({ lista: result.data })
        });

        axios(urlAutoriza, { headers: { Authorization: 'Bearer ' + user.token } })
            .then(result => {
                this.setState({ lista: result.data });
            },
                (error) => {
                    const _mens =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.setState({ mens: _mens });
                }
            );
    }


    limpar() {
        this.setState({ produto: initialState.produto });
    } 

    salvar() {
        const produto = this.state.produto;
        const metodo = produto.id ? 'put' : 'post';
        const url = produto.id ? `${urlAPI}/${produto.id}` : urlAPI;
        axios[metodo](url, produto)
        .then(resp => {
            const lista = this.getListaAtualizada(resp.data)
            this.setState({ produto: initialState.produto, lista })
        })
    }
    
    getListaAtualizada(produto, add = true) {
        const lista = this.state.lista.filter(a => a.id !== produto.id);
        if (add) 
            lista.unshift(produto);
        return lista;
    }

    updateField(event) {
        const produto = { ...this.state.produto };
        produto[event.target.name] = event.target.value;
        this.setState({ produto });
    }

    load(produto) {
        this.setState({ produto })
    }

    remover(produto) {
        const url = urlAPI + "/" + produto.id;
        if (window.confirm("Confirma remoção do produto: " + produto.id)) {
            console.log("entrou no confirm");
            axios['delete'](url, produto)
            .then(result => {
                const lista = this.getListaAtualizada(produto, false)
                this.setState({ produto: initialState.produto, lista })
            })
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> Marca: </label>
                <input
                    type="text"
                    id="marca"
                    placeholder="Marca do celular"
                    className="form-input"
                    name="marca"

                    value={this.state.produto.marca}

                    onChange={e => this.updateField(e)}
                />
                <label> Valor: </label>
                <input
                    type="text"
                    id="valor"
                    placeholder="Valor do celular"
                    className="form-input"
                    name="valor"

                    value={this.state.produto.valor}

                    onChange={e => this.updateField(e)}
                />
                <label> Modelo: </label>
                <input
                    type="text"
                    id="modelo"
                    placeholder="Modelo de celular"
                    className="form-input"
                    name="modelo"

                    value={this.state.produto.modelo}

                    onChange={e => this.updateField(e)}
                />

                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>
            </div>
        )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaProdutos" id="tblListaProdutos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNome">Marca</th>
                            <th className="tabTituloValor">Valor</th>
                            <th className="tabTituloDescricao">Modelo</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista.map(
                            (produto) =>
                                <tr key={produto.id}>
                                    <td>{produto.marca}</td>
                                    <td>{produto.valor}</td>
                                    <td>{produto.modelo}</td>
                                    <td>
                                        <button onClick={() => this.load(produto)}>Atualizar</button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(produto)}>Excluir</button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <Main className='main' title={title}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}