// =====================================================================
//  PRONTO — NÃO PRECISA MEXER
//  Esta tela já usa a API. Ela funciona quando o controller do time
//  estiver pronto. Enquanto isso, mostra a mensagem que a API devolver
//  (por exemplo: "Ainda não implementado: listar ...").
// =====================================================================
const campos = ['oportunidade_id', 'nome', 'matricula', 'curso', 'email'];
let oportunidadeAtual = ''; // '' = todas as inscrições

// Usa o GET do time Professor para listar as oportunidades
async function carregarOportunidades() {
  try {
    const tipo = document.getElementById('filtro').value;
    const oportunidades = await api('/oportunidades' + (tipo ? '?tipo=' + tipo : ''));
    document.getElementById('oportunidades').innerHTML = oportunidades.map(o => `
      <tr>
        <td>${esc(o.titulo)}</td><td>${o.tipo}</td><td>${o.vagas}</td>
        <td>
          <button onclick="inscrever(${o.id})">Inscrever-se</button>
          <button onclick="verInscritos(${o.id})">Ver inscritos</button>
        </td>
      </tr>`).join('') || '<tr><td colspan="4">Nenhuma oportunidade.</td></tr>';

    const todas = await api('/oportunidades');
    document.getElementById('oportunidade_id').innerHTML =
      todas.map(o => `<option value="${o.id}">${esc(o.titulo)}</option>`).join('');
  } catch (e) {
    mostrarMensagem(e.message);
  }
}

async function carregar() {
  try {
    const filtro = oportunidadeAtual ? '?oportunidade_id=' + oportunidadeAtual : '';
    const inscricoes = await api('/inscricoes' + filtro);
    document.getElementById('tituloLista').textContent =
      oportunidadeAtual ? 'Inscrições da oportunidade selecionada' : 'Todas as inscrições';
    document.getElementById('lista').innerHTML = inscricoes.map(i => `
      <tr>
        <td>${esc(i.nome)}</td><td>${esc(i.matricula)}</td><td>${esc(i.curso)}</td>
        <td>${esc(i.email)}</td><td>${esc(i.oportunidade)}</td>
        <td>
          <button onclick="editar(${i.id})">Editar</button>
          <button onclick="excluir(${i.id})">Excluir</button>
        </td>
      </tr>`).join('') || '<tr><td colspan="6">Nenhuma inscrição.</td></tr>';
  } catch (e) {
    mostrarMensagem(e.message);
  }
}

function verInscritos(oportunidadeId) {
  oportunidadeAtual = oportunidadeId;
  carregar();
}

function inscrever(oportunidadeId) {
  limpar();
  document.getElementById('oportunidade_id').value = oportunidadeId;
  document.getElementById('nome').focus();
}

async function editar(id) {
  try {
    const i = await api('/inscricoes/' + id);
    document.getElementById('id').value = i.id;
    campos.forEach(c => document.getElementById(c).value = i[c]);
    document.getElementById('tituloForm').textContent = 'Editando inscrição';
  } catch (e) {
    mostrarMensagem(e.message);
  }
}

async function excluir(id) {
  if (!confirm('Excluir esta inscrição?')) return;
  try {
    await api('/inscricoes/' + id, 'DELETE');
    carregar();
  } catch (e) {
    mostrarMensagem(e.message);
  }
}

function limpar() {
  document.getElementById('formulario').reset();
  document.getElementById('id').value = '';
  document.getElementById('tituloForm').textContent = 'Nova inscrição';
  mostrarMensagem();
}

document.getElementById('formulario').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const dados = {};
  campos.forEach(c => dados[c] = document.getElementById(c).value);
  const id = document.getElementById('id').value;
  try {
    if (id) await api('/inscricoes/' + id, 'PUT', dados);
    else await api('/inscricoes', 'POST', dados);
    limpar();
    carregar();
  } catch (e) {
    mostrarMensagem(e.message);
  }
});

document.getElementById('cancelar').addEventListener('click', limpar);
document.getElementById('filtro').addEventListener('change', carregarOportunidades);
document.getElementById('todas').addEventListener('click', () => { oportunidadeAtual = ''; carregar(); });
carregarOportunidades();
carregar();
