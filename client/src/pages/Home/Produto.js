import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Produto() {

    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [id, setId] = useState('');
    const baseUrl = 'http://localhost:3001';

    useEffect(() => {

        getProdutos();

    }, [])

    const clickCadastro = async (event) => {
        event.preventDefault();

        const form = { nome, preco };
        const result = await axios.post(baseUrl + '/produto', form);
        await getProdutos();
        alert(result.data.msg);
        limparFormulario();
    }

    const clickAtualizar = async (event) => {

        event.preventDefault();

        const form = { nome, preco };
        const result = await axios.put(baseUrl + '/produto/' + id, form);
        await getProdutos();
        alert(result.data.msg);
        limparFormulario();
    }

    const limparFormulario = () => {
        setNome('');
        setPreco('');
        setId('');
    }

    const clickEditar = async (idproduto) => {
        const result = await axios.get(baseUrl + '/produto/ ' + idproduto)
        const produto = result.data[0];
        console.log(produto);
        setNome(produto.nome);
        setPreco(produto.preco);
        setId(produto.idprodutos);
    }

    const clickDeletar = async (idproduto) => {
        const result = await axios.delete(baseUrl + '/produto/ ' + idproduto)
        await getProdutos();
        alert(result.data.msg);
    }

    const getProdutos = async () => {

        const response = await axios.get(baseUrl + '/produto')
        const produtos = response.data
        setProdutos(produtos);
        console.log(produtos);
    }

    return (
        <div className='container2'>
            <h1 className='form-cadastro2'>Produto</h1>
            <div>
                <form onSubmit={id ? clickAtualizar
                    : clickCadastro}>
                    <label className="preco">Nome:</label>
                    <input type="text" name="nome" className="form-field2" value={nome} onChange={(event) => setNome(event.target.value)} />
                    <div>
                        <label className="preco">Preco:</label>
                        <input type="text" name="preco" className="form-field2" value={preco} onChange={(event) => setPreco(event.target.value)} />
                    </div><br />
                    <button type="submit" className="button2">
                        {id ? 'atualizar'
                            : 'Cadastrar'}
                    </button>
                </form>
            </div>
            <table>
                <thead>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </thead>
                {produtos.map((produto) => {
                    return (
                        <tr key={produto.idprodutos}>
                            <td>{produto.idprodutos}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.preco}</td>
                            <td>
                                <button onClick={() => clickEditar(produto.idprodutos)}>Editar</button>
                                <button onClick={() => clickDeletar(produto.idprodutos)}>Excluir</button>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>

    )

}

export default Produto