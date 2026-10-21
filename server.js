// server.js
// Atividade Prática - CRUD de Produtos com Node.js e Express
// Endpoints: GET, GET/:id, POST, PUT/:id, DELETE/:id

const express = require("express");
const path = require("path");

const app = express();
const PORTA = 3000;

// Middleware para o Express entender corpo de requisição em JSON
// (equivalente ao "Content-Type: application/json" visto na Aula 01/03)
app.use(express.json());

// Serve a pasta "public" (o front-end de teste feito com fetch())
app.use(express.static(path.join(__dirname, "public")));

// "Banco de dados" em memória: um array de objetos, igual ao visto na Aula 02
let produtos = [
  { id: 1, nome: "Teclado", categoria: "Informática", preco: 150.0, quantidade: 5 },
  { id: 2, nome: "Mouse", categoria: "Informática", preco: 70.0, quantidade: 20 },
  { id: 3, nome: "Monitor", categoria: "Informática", preco: 890.0, quantidade: 8 },
];

// Controla o próximo id a ser gerado nos cadastros (POST)
let proximoId = 4;

// Função auxiliar: verifica se o produto enviado no corpo da requisição
// tem todos os campos obrigatórios preenchidos.
function corpoDoProdutoEstaValido(corpo) {
  return (
    corpo &&
    typeof corpo.nome === "string" &&
    corpo.nome.trim() !== "" &&
    typeof corpo.categoria === "string" &&
    corpo.categoria.trim() !== "" &&
    typeof corpo.preco === "number" &&
    typeof corpo.quantidade === "number"
  );
}

// -----------------------------------------------------------------
// GET /produtos -> lista todos os produtos
// -----------------------------------------------------------------
app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

// -----------------------------------------------------------------
// GET /produtos/:id -> retorna um único produto
// -----------------------------------------------------------------
app.get("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: `Produto com id ${id} não encontrado.` });
  }

  res.status(200).json(produto);
});

// -----------------------------------------------------------------
// POST /produtos -> cadastra um novo produto
// -----------------------------------------------------------------
app.post("/produtos", (req, res) => {
  const dados = req.body;

  if (!corpoDoProdutoEstaValido(dados)) {
    return res.status(400).json({
      erro: "Dados inválidos. Envie nome, categoria, preco e quantidade.",
    });
  }

  const novoProduto = {
    id: proximoId++,
    nome: dados.nome,
    categoria: dados.categoria,
    preco: dados.preco,
    quantidade: dados.quantidade,
  };

  produtos.push(novoProduto);

  // 201 Created: recurso criado com sucesso
  res.status(201).json(novoProduto);
});

// -----------------------------------------------------------------
// PUT /produtos/:id -> atualiza todos os dados de um produto existente
// -----------------------------------------------------------------
app.put("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = produtos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: `Produto com id ${id} não encontrado.` });
  }

  const dados = req.body;

  if (!corpoDoProdutoEstaValido(dados)) {
    return res.status(400).json({
      erro: "Dados inválidos. Envie nome, categoria, preco e quantidade.",
    });
  }

  produtos[indice] = {
    id,
    nome: dados.nome,
    categoria: dados.categoria,
    preco: dados.preco,
    quantidade: dados.quantidade,
  };

  res.status(200).json(produtos[indice]);
});

// -----------------------------------------------------------------
// DELETE /produtos/:id -> remove um produto existente
// -----------------------------------------------------------------
app.delete("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = produtos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: `Produto com id ${id} não encontrado.` });
  }

  produtos.splice(indice, 1);

  // 204 No Content: sucesso, mas sem corpo na resposta
  res.status(204).send();
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
  console.log(`API de produtos disponível em http://localhost:${PORTA}/produtos`);
});
