// =====================================================================
//  inscricoes.controller.js — TIME ALUNO
//  ESTE É O ARQUIVO DO TIME. Todo o resto do projeto já está pronto.
//
//  O controller recebe a requisição, usa o model e responde com o status certo.
//  Funções prontas do model (src/models/Inscricao.js):
//    Inscricao.validar(dados)                     → [] ou lista de mensagens de erro
//    Inscricao.oportunidadeExiste(id)             → true ou false
//    Inscricao.jaInscrito(opId, matricula, idIgnorado) → true ou false
//    Inscricao.listar(oportunidadeId)             → lista (oportunidadeId é opcional)
//    Inscricao.buscar(id)                         → a inscrição ou undefined
//    Inscricao.criar(dados)                       → a inscrição criada
//    Inscricao.atualizar(id, dados)               → a inscrição editada ou null
//    Inscricao.excluir(id)                        → true ou false
//
//  Lembretes:
//    req.params.id → o id da URL     req.query.oportunidade_id → o filtro
//    req.body      → o JSON enviado  erros sempre como { erro: "mensagem" }
//    Depois de responder um erro, use return.
//  Enquanto uma função não estiver pronta, ela responde 501.
// =====================================================================
const Inscricao = require('../models/Inscricao');

// GET /api/inscricoes                   → 200 com todas
// GET /api/inscricoes?oportunidade_id=1 → 200 só as daquela oportunidade
function listar(req, res) {
  // TODO (Entrega 1)
  res.status(501).json({ erro: 'Ainda não implementado: listar inscrições' });
}

// GET /api/inscricoes/:id → 200 com a inscrição | 404 se não existir
function buscar(req, res) {
  // TODO (Entrega 1)
  res.status(501).json({ erro: 'Ainda não implementado: buscar inscrição' });
}

// POST /api/inscricoes → 201 com a inscrição criada
//   Verifique NESTA ORDEM:
//   1. validar() devolveu erros?              → 400 { erro: erros.join('. ') }
//   2. a oportunidade não existe?             → 404
//   3. a matrícula já está nessa oportunidade? → 409
function criar(req, res) {
  // TODO (Entrega 1)
  res.status(501).json({ erro: 'Ainda não implementado: criar inscrição' });
}

// PUT /api/inscricoes/:id → 200 com a inscrição editada
//   Primeiro: a inscrição não existe? → 404
//   Depois, as mesmas 3 verificações do POST.
//   Atenção: passe req.params.id como idIgnorado em jaInscrito(),
//   senão editar mantendo a MESMA matrícula dá 409 por engano.
function atualizar(req, res) {
  // TODO (Entrega 1)
  res.status(501).json({ erro: 'Ainda não implementado: editar inscrição' });
}

// DELETE /api/inscricoes/:id → 204 sem corpo | 404 se não existir
function excluir(req, res) {
  // TODO (Entrega 1)
  res.status(501).json({ erro: 'Ainda não implementado: excluir inscrição' });
}

module.exports = { listar, buscar, criar, atualizar, excluir };
