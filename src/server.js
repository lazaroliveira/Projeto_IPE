const express = require('express');
const path = require('path');
const oportunidadesRoutes = require('./routes/oportunidades.routes');
const inscricoesRoutes = require('./routes/inscricoes.routes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // as telas

app.use('/api/oportunidades', oportunidadesRoutes); // time Professor
app.use('/api/inscricoes', inscricoesRoutes);       // time Aluno

// Qualquer erro não tratado vira uma resposta JSON
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido' });
  }
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

app.listen(3000, () => console.log('Rodando em http://localhost:3000'));
