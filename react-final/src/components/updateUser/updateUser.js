import React, { Component } from 'react';
import axios from 'axios';
import './updateUser.css';
import Main from '../template/main';
import UserService from '../../services/UserService';

const title = "Alteração de dados";

const urlAPI = "http://localhost:5255/api/Usuario";
const urlAutorizacao = "http://localhost:5255/api/Home/";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    usuario: {id: 0, nome: '', email: '', senha: '', role: 'Cliente' },
    lista: [],
}

export default class updateUser extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI)
            .then(resp => {
                this.setState({ lista: resp.data })
        });

        axios(urlAutorizacao, { headers: { Authorization: 'Bearer ' + user.token } })
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
        this.setState({ usuario: initialState.usuario });
    } 

    salvar() {
        const usuario = this.state.usuario;
        const metodo = usuario.id ? 'put' : 'post';
        const url = usuario.id ? `${urlAPI}/${usuario.id}` : urlAPI;
        axios[metodo](url, usuario)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ usuario: initialState.usuario, lista })
            })
    }

    getListaAtualizada(usuario, add = true) {
        const lista = this.state.lista.filter(a => a.id !== usuario.id);
        if(add) 
            lista.unshift(usuario);

        return lista;
    }

    atualizaCampo(event) {
        const usuario = { ...this.state.usuario };
        usuario[event.target.name] = event.target.value;
        this.setState({ usuario });
    }

    carregar(usuario) {
        this.setState({ usuario })
    }

    remover(usuario) {
        const url = urlAPI + "/" + usuario.id;

        if (window.confirm("Confirma remoção do usuario: " + usuario.id)) {
            axios['delete'](url, usuario)
            .then(resp => {
                const lista = this.getListaAtualizada(usuario, false)
                this.setState({ usuario: initialState.usuario, lista })
            })
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome"
                    className="form-input"
                    name="nome"
                    value={this.state.usuario.nome}
                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Email: </label>
                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="form-input"
                    name="email"
                    value={this.state.usuario.email}
                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Senha: </label>
                <input
                    type="password"
                    id="senha"
                    placeholder="Senha"
                    className="form-input"
                    name="senha"
                    value={this.state.usuario.senha}
                    onChange={e => this.atualizaCampo(e)}
                />

                <button className="btnSalvar" onClick={e => this.salvar(e)} >
                    Salvar
                </button>
                
                <button className="btnCancelar" onClick={e => this.limpar(e)} >
                    Cancelar
                </button>
            </div>
        )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaUsuarios" id="tblListaUsuarios">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloEmail">Email</th>
                            {/* <th className="tabTituloSenha">Senha</th> */}
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista.map(
                            (usuario) =>
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <button onClick={() => this.carregar(usuario)}>Atualizar</button>
                                </td>
                                <td>
                                    <button onClick={() => this.remover(usuario)}>Excluir</button>
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