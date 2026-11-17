# Plataforma de Oportunidades (IPE) — kit inicial

Projeto da 2ª Unidade · Linguagem de Programação para Web III

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. As telas já estão prontas. Enquanto os controllers
não estiverem implementados, a API responde `501` e as telas mostram a mensagem
"Ainda não implementado".

## O que cada time escreve

| Time | Arquivo |
| --- | --- |
| Professor | `src/controllers/oportunidades.controller.js` |
| Aluno | `src/controllers/inscricoes.controller.js` |

Todo o resto já vem pronto: `server.js`, `db.js`, as rotas, os models (SQL e
validação), as telas (`public/`) e o banco.

## Banco

`banco_projeto_web.db` já vem com 6 oportunidades e 9 inscrições.
Para voltar aos dados de exemplo, execute `banco_projeto_web.sql` no DBeaver.

## Endpoints

(Complete esta seção na Entrega 2: método, caminho e status de cada endpoint,
e os integrantes de cada time.)
