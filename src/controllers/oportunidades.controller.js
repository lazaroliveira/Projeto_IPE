const Oportunidade = require('../models/Oportunidade');

function listar(req, res) {
  const lista = Oportunidade.listar(req.query.tipo);
  res.status(200).json(lista);
}

function buscar(req, res) {
  const op = Oportunidade.buscar(req.params.id);
  if (!op) {
    return res.status(404).json({ erro: 'Oportunidade não encontrada' });
  }
  res.status(200).json(op);
}

function criar(req, res) {
  const dados = req.body || {};
  const erros = Oportunidade.validar(dados);
  if (erros.length > 0) {
    return res.status(400).json({ erro: erros.join('. ') });
  }
  const criada = Oportunidade.criar(dados);
  res.status(201).json(criada);
}

function atualizar(req, res) {
  const dados = req.body || {};
  if (!Oportunidade.buscar(req.params.id)) {
    return res.status(404).json({ erro: 'Oportunidade não encontrada' });
  }
  const erros = Oportunidade.validar(dados);
  if (erros.length > 0) {
    return res.status(400).json({ erro: erros.join('. ') });
  }
  const editada = Oportunidade.atualizar(req.params.id, dados);
  res.status(200).json(editada);
}

function excluir(req, res) {
  const apagou = Oportunidade.excluir(req.params.id);
  if (!apagou) {
    return res.status(404).json({ erro: 'Oportunidade não encontrada' });
  }
  res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, excluir };
