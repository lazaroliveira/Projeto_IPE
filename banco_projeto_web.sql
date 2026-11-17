-- =============================================================
-- Plataforma de Oportunidades (IPE) — Projeto da 2ª Unidade, LPW III
-- Versão de 04/11/2026: 2 tabelas, 2 CRUDs, sem login
-- Banco SQLite com dados de exemplo
--
-- Para recriar o banco do zero (volta aos dados de exemplo):
--     DBeaver: abrir o banco_projeto_web.db, abrir este script e executar (Alt+X)
--     ou terminal: sqlite3 banco_projeto_web.db < banco_projeto_web.sql
-- =============================================================

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS inscricoes;
DROP TABLE IF EXISTS oportunidades;

-- CRUD 1 (time Professor)
CREATE TABLE oportunidades (
  id        INTEGER PRIMARY KEY,
  titulo    TEXT NOT NULL,
  tipo      TEXT NOT NULL CHECK (tipo IN ('monitoria', 'pesquisa', 'extensao')),
  descricao TEXT NOT NULL,
  professor TEXT NOT NULL,                 -- nome do professor responsável
  vagas     INTEGER NOT NULL CHECK (vagas >= 1),
  criado_em TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- CRUD 2 (time Aluno)
CREATE TABLE inscricoes (
  id              INTEGER PRIMARY KEY,
  oportunidade_id INTEGER NOT NULL REFERENCES oportunidades(id) ON DELETE CASCADE,
  nome            TEXT NOT NULL,
  matricula       TEXT NOT NULL,
  curso           TEXT NOT NULL,
  email           TEXT NOT NULL,
  criado_em       TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
  UNIQUE (oportunidade_id, matricula)      -- a mesma matrícula não se inscreve duas vezes na mesma oportunidade
);

INSERT INTO oportunidades (id, titulo, tipo, descricao, professor, vagas) VALUES
  (1, 'Monitoria de Algoritmos', 'monitoria',
   'Plantões de dúvidas e apoio nas listas de exercícios, 6 h semanais.', 'Ana Paula Ferreira', 2),
  (2, 'Monitoria de Banco de Dados', 'monitoria',
   'Atendimento nos plantões de SQL e modelagem, 6 h semanais.', 'Ana Paula Ferreira', 1),
  (3, 'Pesquisa: visão computacional na caatinga', 'pesquisa',
   'Coleta e rotulagem de imagens e treino de modelos de classificação.', 'Carlos Eduardo Lima', 2),
  (4, 'Extensão: Horta Comunitária', 'extensao',
   'Manejo de horta agroecológica e oficinas com a comunidade aos sábados.', 'Juliana Santos', 3),
  (5, 'Monitoria de Física I', 'monitoria',
   'Plantões de dúvidas para as turmas do primeiro ano.', 'Carlos Eduardo Lima', 2),
  (6, 'Extensão: Robótica nas Escolas', 'extensao',
   'Oficinas de robótica para turmas do 6º ao 9º ano da rede municipal.', 'Juliana Santos', 2);

INSERT INTO inscricoes (oportunidade_id, nome, matricula, curso, email) VALUES
  (1, 'Lucas Almeida',           '2024INFO001',  'Técnico em Informática',     'lucas.almeida@aluno.exemplo.edu.br'),
  (1, 'Maria Eduarda Souza',     '2024INFO002',  'Técnico em Informática',     'maria.souza@aluno.exemplo.edu.br'),
  (1, 'Fernanda Ribeiro',        '2023LCOMP004', 'Licenciatura em Computação', 'fernanda.ribeiro@aluno.exemplo.edu.br'),
  (2, 'Pedro Henrique Carvalho', '2024LCOMP009', 'Licenciatura em Computação', 'pedro.carvalho@aluno.exemplo.edu.br'),
  (3, 'Rafael Pereira',          '2024AGRO005',  'Técnico em Agroindústria',   'rafael.pereira@aluno.exemplo.edu.br'),
  (3, 'Camila Martins',          '2022LCOMP017', 'Licenciatura em Computação', 'camila.martins@aluno.exemplo.edu.br'),
  (4, 'Gabriel Oliveira',        '2024EDIF003',  'Técnico em Edificações',     'gabriel.oliveira@aluno.exemplo.edu.br'),
  (5, 'Thiago Araújo',           '2023ECIV002',  'Engenharia Civil',           'thiago.araujo@aluno.exemplo.edu.br'),
  (5, 'Lucas Almeida',           '2024INFO001',  'Técnico em Informática',     'lucas.almeida@aluno.exemplo.edu.br');
