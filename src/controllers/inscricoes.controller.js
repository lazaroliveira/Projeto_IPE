const Inscricao = require('../models/Inscricao');

function listar(req, res) {
  const oportunidadeId = req.query.oportunidade_id;
  const inscricoes = Inscricao.listar(oportunidadeId);
  return res.status(200).json(inscricoes);
}

function buscar(req, res) {
  const id = req.params.id;
  const inscricao = Inscricao.buscar(id);
    
  if (!inscricao) {
    return res.status(404).json({ erro: 'Inscrição não encontrada' });
  }

  return res.status(200).json(inscricao);
}

function criar(req, res) {
  const dados = req.body;
  const erros = Inscricao.validar(dados);

  if (erros.length > 0) {
    return res.status(400).json({ erro: erros.join('. ') });
  }
  if (!Inscricao.oportunidadeExiste(dados.oportunidade_id)) {
    return res.status(404).json({ erro: 'Oportunidade não encontrada' });
  }
  if (Inscricao.jaInscrito(dados.oportunidade_id, dados.matricula)) {
    return res.status(409).json({ erro: 'Aluno já inscrito nesta oportunidade' });
  }

  const inscricao = Inscricao.criar(dados);
  return res.status(201).json(inscricao);
}

function atualizar(req, res) {
  const id = req.params.id;
  const dados = req.body;
  const inscricaoExistente = Inscricao.buscar(id);

  if (!inscricaoExistente) {
    return res.status(404).json({ erro: 'Inscrição não encontrada' });
  }

  const erros = Inscricao.validar(dados);

  if (erros.length > 0) {
    return res.status(400).json({ erro: erros.join('. ') });
  }

  if (!Inscricao.oportunidadeExiste(dados.oportunidade_id)) {
    return res.status(404).json({ erro: 'Oportunidade não encontrada' });
  }

  if (Inscricao.jaInscrito(dados.oportunidade_id, dados.matricula, id)) {
    return res.status(409).json({ erro: 'Aluno já inscrito nesta oportunidade' });
  }

  const inscricao = Inscricao.atualizar(id, dados);

  if (!inscricao) {
    return res.status(404).json({ erro: 'Inscrição não encontrada' });
  }
  return res.status(200).json(inscricao);
}

function excluir(req, res) {
  const id = req.params.id;
  const excluiu = Inscricao.excluir(id);

  if (!excluiu) {
    return res.status(404).json({ erro: 'Inscrição não encontrada' });
  }
  return res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, excluir };
