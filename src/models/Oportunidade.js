// =====================================================================
//  Oportunidade.js — PRONTO, NÃO PRECISA MEXER
//  O time Professor usa estas funções no controller:
//    validar(dados)        → lista de mensagens de erro ([] quando está tudo certo)
//    listar(tipo)          → lista; cada item tem "inscritos". tipo é opcional (?tipo=)
//    buscar(id)            → a oportunidade ou undefined
//    criar(dados)          → a oportunidade criada, com id
//    atualizar(id, dados)  → a oportunidade editada, ou null se o id não existe
//    excluir(id)           → true se apagou, false se o id não existia
// =====================================================================
const db = require('../db');

const TIPOS = ['monitoria', 'pesquisa', 'extensao'];

function validar(dados) {
  const erros = [];
  if (!dados.titulo) erros.push('Informe o título');
  if (!TIPOS.includes(dados.tipo)) erros.push('Tipo deve ser monitoria, pesquisa ou extensao');
  if (!dados.descricao) erros.push('Informe a descrição');
  if (!dados.professor) erros.push('Informe o professor');
  if (!(Number(dados.vagas) >= 1)) erros.push('Vagas deve ser 1 ou mais');
  return erros;
}

function listar(tipo) {
  let sql = `SELECT o.*, COUNT(i.id) AS inscritos
             FROM oportunidades o
             LEFT JOIN inscricoes i ON i.oportunidade_id = o.id`;
  const valores = [];
  if (tipo) {
    sql += ' WHERE o.tipo = ?';
    valores.push(tipo);
  }
  sql += ' GROUP BY o.id ORDER BY o.titulo';
  return db.prepare(sql).all(...valores);
}

function buscar(id) {
  return db.prepare('SELECT * FROM oportunidades WHERE id = ?').get(id);
}

function criar(dados) {
  const resultado = db.prepare(
    `INSERT INTO oportunidades (titulo, tipo, descricao, professor, vagas)
     VALUES (?, ?, ?, ?, ?)`
  ).run(dados.titulo, dados.tipo, dados.descricao, dados.professor, Number(dados.vagas));
  return buscar(resultado.lastInsertRowid);
}

function atualizar(id, dados) {
  const resultado = db.prepare(
    `UPDATE oportunidades SET titulo = ?, tipo = ?, descricao = ?, professor = ?, vagas = ?
     WHERE id = ?`
  ).run(dados.titulo, dados.tipo, dados.descricao, dados.professor, Number(dados.vagas), id);
  return resultado.changes > 0 ? buscar(id) : null;
}

function excluir(id) {
  return db.prepare('DELETE FROM oportunidades WHERE id = ?').run(id).changes > 0;
}

module.exports = { validar, listar, buscar, criar, atualizar, excluir };
