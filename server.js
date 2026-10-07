const express = require("express");
const app = express ();
const PORTA = 3000;

app.get("/", (req,res) =>{
    res.send("Meu servidor está funcionando!");
});

app.listen(PORTA, () => {
    console.log(`Servidor em http://localhost:${PORTA}`);
});

produtos = [
{
    id: 1,
    nome: "Pão de queijo",
    categoria: "Comida",
    preco: 3,
    quantidade: 8
},
{
    id: 2,
    nome: "Biscoito com goiabada",
    categoria: "Comida",
    preco: 1,
    quantidade: 4
},
{
    id: 3,
    nome: "Biscoito de leite",
    categoria: "Comida",
    preco: 1,
    quantidade: 3
},
{
    id: 4,
    nome: "Café com leite",
    categoria: "Bebida",
    preco: 2,
    quantidade: 21
}];

app.get("/produtos", (req,res) => {
    res.status(200).json(produtos);
});

app.get("/produtos/:id", (req,res) => {
    const id = Number(req.params.id);
    const produto = produtos.find((p) => p.id === id);

    if (!produto) {
        return res.status(404).json({
            erro: `Produto com id ${id} não encontrado.`});
    }

    res.status(200).json(produto);
});

app.post("/produtos", (req, res) =>{
    const dados = req.body;
    
    if (!corpoDoProdutoEstaValido(dados)){
        return res.status(400).json({
            erro: "Dados inválidos. Envie nome, categoria, preco e quantidade"
        });
    }

    const novoProduto = {
        id: proximoId++,
        nome: dados.nome,
        categoria: dados.categoria,
        preco: dados.preco,
        quantidade: dados.quantidade
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});