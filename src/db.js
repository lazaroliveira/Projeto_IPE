const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname, '..', 'banco_projeto_web.db'));
db.pragma('foreign_keys = ON'); // sem isso, a exclusão em cascata não funciona

module.exports = db;
