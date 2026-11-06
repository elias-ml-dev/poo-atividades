
const mysql = require('mysql2');
const express = require('express');
const path = require('path');

// CLASSE PRODUTO

class Produto {
    constructor(nome, quantidade, preco) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
    }
    validarDados() {

        if (!this.nome || this.nome.trim() === "") {
            throw new Error("Nome do produto não pode ficar vazio.");
        }

        if (
            String(this.quantidade).trim() === "" ||
            !Number.isInteger(Number(this.quantidade)) ||
            Number(this.quantidade) < 0
        ) {
            throw new Error("Quantidade inválida.");
        }

        if (
            String(this.preco).trim() === "" ||
            !Number.isFinite(Number(this.preco)) ||
            Number(this.preco) <= 0
        ) {
            throw new Error("Preço inválido.");
        }
    }
}

// CLASSE BANCO DE DADOS

class BancoDados {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'crud_produtos'
        });
    }
    conectar(callback) {
        this.connection.connect(function (erro) {
            if (erro) {
                console.log("Erro ao conectar ao banco:", erro);
                return;
            }
            console.log("Conectado ao banco de dados!");
            callback();
        });
    }
    consultar(sql, valores, callback) {
        this.connection.query(sql, valores, callback);
    }
}

// CLASSE SISTEMA

class Sistema {
    constructor() {
        this.app = express();
        this.banco = new BancoDados();
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.configurarRotas();
    }

    // ROTA INICIAL
    
    configurarRotas() {
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'));
        });

        // CADASTRAR PRODUTO

        this.app.get('/adicionar', (req, res) => {
            res.sendFile(path.join(__dirname, 'cadastro.html'));
        });

        this.app.post('/adicionar', (req, res) => {
            try {
                const produto = new Produto(
                    req.body.nome,
                    req.body.quantidade,
                    req.body.preco
                );

                produto.validarDados();

                const sql = `
                    INSERT INTO produtos (nome, quantidade, preco)
                    VALUES (?, ?, ?)
                `;

                const valores = [
                    produto.nome,
                    Number(produto.quantidade),
                    Number(produto.preco)
                ];

                this.banco.consultar(sql, valores, (erro) => {
                    if (erro) {
                        return res.send("Erro ao cadastrar produto: " + erro.message);
                    }

                    res.redirect('/listar');
                });
            } catch (erro) {
                res.send(erro.message);
            }
        });

        // LISTAR PRODUTOS

        this.app.get('/listar', (req, res) => {
            const sql = "SELECT * FROM produtos";

            this.banco.consultar(sql, [], (erro, produtos) => {
                if (erro) {
                    return res.send("Erro ao listar produtos.");
                }

                let html = `
                    <h1>Lista de Produtos</h1>

                    <table border="1">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                `;

                produtos.forEach((produto) => {

                    html += `
                        <tr>
                            <td>${produto.id}</td>
                            <td>${produto.nome}</td>
                            <td>${produto.quantidade}</td>
                            <td>R$ ${produto.preco}</td>

                            <td>
                                <a href="/atualizar-form/${produto.id}">
                                    Atualizar
                                </a>

                                |

                                <a href="/deletar/${produto.id}">
                                    Excluir
                                </a>
                            </td>
                        </tr>
                    `;
                });

                html += `
                    </table>

                    <br>
                    <a href="/">Voltar ao menu</a>
                `;

                res.send(html);
            });
        });

        // PESQUISAR PRODUTO

        this.app.get('/pesquisar', (req, res) => {
            res.sendFile(path.join(__dirname, 'pesquisarProduto.html'));
        });

        this.app.post('/pesquisar', (req, res) => {
            const id = req.body.id;
            const sql = "SELECT * FROM produtos WHERE id = ?";
            this.banco.consultar(sql, [id], (erro, resultado) => {
                if (erro) {
                    return res.send("Erro ao pesquisar produto.");
                }

                if (resultado.length === 0) {
                    return res.send("Produto não encontrado.");
                }
                const produto = resultado[0];
                res.send(`
                    <h1>Produto encontrado</h1>

                    <p>ID: ${produto.id}</p>
                    <p>Nome: ${produto.nome}</p>
                    <p>Quantidade: ${produto.quantidade}</p>
                    <p>Preço: R$ ${produto.preco}</p>

                    <a href="/">Voltar ao menu</a>
                `);
            });
        });

        // FORMULÁRIO DE ATUALIZAÇÃO
        // PELA LISTAGEM

        this.app.get('/atualizar-form/:id', (req, res) => {
            const id = req.params.id;
            const sql = "SELECT * FROM produtos WHERE id = ?";
            this.banco.consultar(sql, [id], (erro, resultado) => {
                if (erro) {
                    return res.send("Erro ao buscar produto.");
                }

                if (resultado.length === 0) {
                    return res.send("Produto não encontrado.");
                }
                const produto = resultado[0];
                res.send(`
                    <h1>Atualizar Produto</h1>

                    <form action="/atualizar/${produto.id}" method="POST">

                        Nome:
                        <input type="text" name="nome"
                        value="${produto.nome}" required>

                        <br><br>

                        Quantidade:
                        <input type="number" name="quantidade"
                        value="${produto.quantidade}" required>

                        <br><br>

                        Preço:
                        <input type="number" name="preco"
                        step="0.01" value="${produto.preco}" required>

                        <br><br>

                        <button type="submit">Atualizar</button>

                    </form>
                `);
            });
        });

        // ATUALIZAR PELA LISTAGEM

        this.app.post('/atualizar/:id', (req, res) => {
            this.atualizarProduto(req.params.id, req.body, res);
        });


        // FORMULÁRIO DE ATUALIZAÇÃO
        // PELO MENU

        this.app.get('/atualizar-form', (req, res) => {
            res.sendFile(path.join(__dirname, 'atualizarProduto.html'));
        });

        // ATUALIZAR PELO MENU

        this.app.post('/atualizar', (req, res) => {
            this.atualizarProduto(req.body.id, req.body, res);
        });

        // MÉTODO PARA ATUALIZAR PRODUTO
    }


    atualizarProduto(id, dados, res) {
        try {
            const produto = new Produto(
                dados.nome,
                dados.quantidade,
                dados.preco
            );

            produto.validarDados();

            const sql = `
                UPDATE produtos
                SET nome = ?, quantidade = ?, preco = ?
                WHERE id = ?
            `;

            const valores = [
                produto.nome,
                Number(produto.quantidade),
                Number(produto.preco),
                id
            ];

            this.banco.consultar(sql, valores, (erro, resultado) => {
                if (erro) {
                    return res.send("Erro ao atualizar produto.");
                }

                if (resultado.affectedRows === 0) {
                    return res.send("Produto não encontrado.");
                }
                res.redirect('/listar');
            });
        } catch (erro) {
            res.send(erro.message);
        }
    }
    
    // ROTAS DE EXCLUSÃO
    
    configurarExclusao() {
        // Excluir diretamente pela listagem
        this.app.get('/deletar/:id', (req, res) => {
            const id = req.params.id;
            const sql = "DELETE FROM produtos WHERE id = ?";
            this.banco.consultar(sql, [id], (erro) => {
                if (erro) {
                    return res.send("Erro ao excluir produto.");
                }
                res.redirect('/listar');
            });
        });

        // Abrir formulário de exclusão

        this.app.get('/deletar-form', (req, res) => {
            res.sendFile(path.join(__dirname, 'deletarProduto.html'));
        });

        // Pesquisar produto para confirmar exclusão

        this.app.post('/deletarProduto', (req, res) => {
            const id = req.body.id;
            const sql = "SELECT * FROM produtos WHERE id = ?";
            this.banco.consultar(sql, [id], (erro, resultado) => {
                if (erro) {
                    return res.send("Erro ao pesquisar produto.");
                }
                if (resultado.length === 0) {
                    return res.send("Produto não encontrado.");
                }

                const produto = resultado[0];

                res.send(`
                    <h1>Confirmar exclusão</h1>

                    <p>Deseja realmente excluir este produto?</p>

                    <p>ID: ${produto.id}</p>
                    <p>Nome: ${produto.nome}</p>

                    <form action="/confirmaDeletar" method="POST">

                        <input type="hidden" name="id"
                        value="${produto.id}">

                        <button type="submit">Confirmar exclusão</button>

                    </form>

                    <br>
                    <a href="/">Cancelar</a>
                `);
            });
        });


        // Confirmar exclusão

        this.app.post('/confirmaDeletar', (req, res) => {
            const id = req.body.id;
            const sql = "DELETE FROM produtos WHERE id = ?";
            this.banco.consultar(sql, [id], (erro) => {
                if (erro) {
                    return res.send("Erro ao excluir produto.");
                }
                res.redirect('/listar');
            });
        });
    }

    // INICIAR SISTEMA
    
    iniciar() {
        this.banco.conectar(() => {
            this.configurarExclusao();
            this.app.listen(8083, () => {
                console.log("Servidor rodando em http://localhost:8083");
            });
        });
    }
}

// CRIAR OBJETO E INICIAR

const sistema = new Sistema();
sistema.iniciar();
