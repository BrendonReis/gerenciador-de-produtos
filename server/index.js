const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "banco"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/register", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length == 0) {
            db.query("INSERT INTO usuarios (email, password) VALUES (? , ?)", [email, password], (err, response) => {
                if (err) {
                    res.send(err);
                }

                res.send({ msg: "Cadastrado realizado com sucesso!" })
            }
            );
        } else {
            res.send({ msg: "Usuario já cadastrado!" })
        }
    });
});

app.post("/login", (req, res) => {

    const email = req.body.emailLogin;
    const password = req.body.passwordLogin;

    db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if (err) {
            res.send({ err, ok: false });
        }
        if (result.length > 0) {
            res.send({ msg: "Usuário logado com sucesso! Bem vindo.", ok: true });
        } else {
            res.send({ msg: "Usuário não encontrado ou Senha incorreta!", ok: false });
        }
    })
});

app.get("/produto", (req, res) => {

    db.query("SELECT * FROM produtos", [], (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result)
    })
});

app.post("/produto", (req, res) => {
    const nome = req.body.nome;
    const preco = req.body.preco;

    db.query("INSERT INTO produtos (nome, preco) VALUES (? , ?)", [nome, preco], (err, response) => {
        if (err) {
            res.send(err);
        }

        res.send({ msg: "Cadastrado com sucesso!" })
    });
});

app.get("/produto/:id", (req, res) => {

    const id = req.params.id;

    db.query("SELECT * FROM produtos WHERE idprodutos = ?", [id], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length == 0) {
            res.send({ msg: "Produto não encontrado" });
        } else {
            res.send(result);
        }
    })
});

app.put("/produto/:id", (req, res) => {

    const nome = req.body.nome;
    const preco = req.body.preco;
    const id = req.params.id;

    db.query("SELECT * FROM produtos WHERE idprodutos = ?", [id], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length == 0) {
            res.send({ msg: "Produto não encontrado" });
        } else {
            db.query("UPDATE produtos SET nome = ?, preco = ? WHERE idprodutos = ?", [nome, preco, id], (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ msg: "Produto atualizado com sucesso!" })
                }
            })
        }
    })
});

app.put("/produto/:id", (req, res) => {

    const nome = req.body.nome;
    const preco = req.body.preco;
    const id = req.params.id;

    db.query("SELECT * FROM produtos WHERE idprodutos = ?", [id], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length == 0) {
            res.send({ msg: "Produto não encontrado" });
        } else {
            db.query("UPDATE produtos SET nome = ?, preco = ? WHERE idprodutos = ?", [nome, preco, id], (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ msg: "Produto atualizado com sucesso!" })
                }
            })
        }
    })
});

app.put("/produto/:id", (req, res) => {

    const nome = req.body.nome;
    const preco = req.body.preco;
    const id = req.params.id;

    db.query("SELECT * FROM produtos WHERE idprodutos = ?", [id], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length == 0) {
            res.send({ msg: "Produto não encontrado" });
        } else {
            db.query("UPDATE produtos SET nome = ?, preco = ? WHERE idprodutos = ?", [nome, preco, id], (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ msg: "Produto atualizado com sucesso!" })
                }
            })
        }
    })
});

app.put("/produto/:id", (req, res) => {

    const nome = req.body.nome;
    const preco = req.body.preco;
    const id = req.params.id;

    db.query("SELECT * FROM produtos WHERE idprodutos = ?", [id], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length == 0) {
            res.send({ msg: "Produto não encontrado" });
        } else {
            db.query("UPDATE produtos SET nome = ?, preco = ? WHERE idprodutos = ?", [nome, preco, id], (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ msg: "Produto atualizado com sucesso!" })
                }
            })
        }
    })
});

app.delete("/produto/:id", (req, res) => {

    const id = req.params.id;

    db.query("SELECT * FROM produtos WHERE idprodutos = ?", [id], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length == 0) {
            res.send({ msg: "Produto não encontrado" });
        } else {
            db.query("DELETE from produtos WHERE idprodutos = ?", [id], (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ msg: "Produto excluído com sucesso!" })
                }
            })
        }
    })
});

app.listen(3001, () => {
    console.log("Rodando na porta 3001")
});