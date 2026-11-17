// =====================================================================
//  oportunidades.controller.js — TIME PROFESSOR
//  ESTE É O ARQUIVO DO TIME. Todo o resto do projeto já está pronto.
//
//  O controller recebe a requisição, usa o model e responde com o status certo.
//  Funções prontas do model (src/models/Oportunidade.js):
//    Oportunidade.validar(dados)       → [] ou lista de mensagens de erro
//    Oportunidade.listar(tipo)         → lista (tipo é opcional)
//    Oportunidade.buscar(id)           → a oportunidade ou undefined
//    Oportunidade.criar(dados)         → a oportunidade criada
//    Oportunidade.atualizar(id, dados) → a oportunidade editada ou null
//    Oportunidade.excluir(id)          → true ou false
//
//  Lembretes:
//    req.params.id  → o id da URL          req.query.tipo → o filtro ?tipo=
//    req.body       → o JSON enviado       erros sempre como { erro: "mensagem" }
//    Depois de responder um erro, use return.
//  Enquanto uma função não estiver pronta, ela responde 501.
// =====================================================================
const Oportunidade = require('../models/Oportunidade');

// GET /api/oportunidades              → 200 com a lista
// GET /api/oportunidades?tipo=pesquisa → 200 só com as do tipo pedido
function listar(req, res) {
  // TODO (Entrega 1)
  res.status(501).json({ erro: 'Ainda não implementado: listar oportunidades' });
}

// GET /api/oportunidades/:id → 200 com a oportunidade | 404 se não existir
function buscar(req, res) {
  // TODO (Entrega 1)
  res.status(501).json({ erro: 'Ainda não implementado: buscar oportunidade' });
}

// POST /api/oportunidades → 201 com a oportunidade criada
//   400 se validar() devolver erros: { erro: erros.join('. ') }
function criar(req, res) {
  // TODO (Entrega 1)
  res.status(501).json({ erro: 'Ainda não implementado: criar oportunidade' });
}

// PUT /api/oportunidades/:id → 200 com a oportunidade editada
//   400 se validar() devolver erros | 404 se o id não existir
function atualizar(req, res) {
  // TODO (Entrega 1)
  res.status(501).json({ erro: 'Ainda não implementado: editar oportunidade' });
}

// DELETE /api/oportunidades/:id → 204 sem corpo | 404 se não existir
//   As inscrições dela são apagadas pelo banco (ON DELETE CASCADE)
function excluir(req, res) {
  // TODO (Entrega 1)
  res.status(501).json({ erro: 'Ainda não implementado: excluir oportunidade' });
}

module.exports = { listar, buscar, criar, atualizar, excluir };
