// =====================================================================
//  Inscricao.js — PRONTO, NÃO PRECISA MEXER
//  O time Aluno usa estas funções no controller:
//    validar(dados)                    → lista de mensagens de erro ([] = tudo certo)
//    oportunidadeExiste(id)            → true ou false              (para o 404)
//    jaInscrito(opId, matricula, idIgnorado) → true ou false        (para o 409)
//        no PUT, passe o id da própria inscrição em idIgnorado
//    listar(oportunidadeId)            → lista; cada item tem "oportunidade" (o título)
//    buscar(id)                        → a inscrição ou undefined
//    criar(dados)                      → a inscrição criada, com id
//    atualizar(id, dados)              → a inscrição editada, ou null se o id não existe
//    excluir(id)                       → true se apagou, false se o id não existia
// =====================================================================
const db = require('../db');

function validar(dados) {
  const erros = [];
  if (!dados.oportunidade_id) erros.push('Escolha a oportunidade');
  if (!dados.nome) erros.push('Informe o nome');
  if (!dados.matricula) erros.push('Informe a matrícula');
  if (!dados.curso) erros.push('Informe o curso');
  if (!dados.email) erros.push('Informe o e-mail');
  return erros;
}

function oportunidadeExiste(oportunidadeId) {
  return !!db.prepare('SELECT 1 FROM oportunidades WHERE id = ?').get(oportunidadeId);
}

// idIgnorado: na edição, a própria inscrição não conta como repetida
function jaInscrito(oportunidadeId, matricula, idIgnorado = 0) {
  return !!db.prepare(
    'SELECT 1 FROM inscricoes WHERE oportunidade_id = ? AND matricula = ? AND id <> ?'
  ).get(oportunidadeId, matricula, idIgnorado);
}

function listar(oportunidadeId) {
  let sql = `SELECT i.*, o.titulo AS oportunidade
             FROM inscricoes i
             JOIN oportunidades o ON o.id = i.oportunidade_id`;
  const valores = [];
  if (oportunidadeId) {
    sql += ' WHERE i.oportunidade_id = ?';
    valores.push(oportunidadeId);
  }
  sql += ' ORDER BY i.nome';
  return db.prepare(sql).all(...valores);
}

function buscar(id) {
  return db.prepare(
    `SELECT i.*, o.titulo AS oportunidade
     FROM inscricoes i JOIN oportunidades o ON o.id = i.oportunidade_id
     WHERE i.id = ?`
  ).get(id);
}

function criar(dados) {
  const resultado = db.prepare(
    `INSERT INTO inscricoes (oportunidade_id, nome, matricula, curso, email)
     VALUES (?, ?, ?, ?, ?)`
  ).run(dados.oportunidade_id, dados.nome, dados.matricula, dados.curso, dados.email);
  return buscar(resultado.lastInsertRowid);
}

function atualizar(id, dados) {
  const resultado = db.prepare(
    `UPDATE inscricoes SET oportunidade_id = ?, nome = ?, matricula = ?, curso = ?, email = ?
     WHERE id = ?`
  ).run(dados.oportunidade_id, dados.nome, dados.matricula, dados.curso, dados.email, id);
  return resultado.changes > 0 ? buscar(id) : null;
}

function excluir(id) {
  return db.prepare('DELETE FROM inscricoes WHERE id = ?').run(id).changes > 0;
}

module.exports = { validar, oportunidadeExiste, jaInscrito, listar, buscar, criar, atualizar, excluir };
