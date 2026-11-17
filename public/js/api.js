// Usada pelos dois times para TODAS as chamadas à API
async function api(caminho, metodo = 'GET', corpo) {
  const resposta = await fetch('/api' + caminho, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: corpo ? JSON.stringify(corpo) : undefined
  });
  if (resposta.status === 204) return null;
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro);
  return dados;
}

// Mostra a mensagem de erro (ou limpa, se vazia)
function mostrarMensagem(texto = '') {
  document.getElementById('mensagem').textContent = texto;
}

// Evita que um texto digitado pelo usuário vire HTML na tabela
function esc(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}
