// =====================================================================
//  PRONTO — NÃO PRECISA MEXER
//  Esta tela já usa a API. Ela funciona quando o controller do time
//  estiver pronto. Enquanto isso, mostra a mensagem que a API devolver
//  (por exemplo: "Ainda não implementado: listar ...").
// =====================================================================
const campos = ['titulo', 'tipo', 'descricao', 'professor', 'vagas'];

async function carregar() {
  try {
    const tipo = document.getElementById('filtro').value;
    const oportunidades = await api('/oportunidades' + (tipo ? '?tipo=' + tipo : ''));
    const lista = document.getElementById('lista');
    if (oportunidades.length === 0) {
      lista.innerHTML = '<tr><td colspan="6">Nenhuma oportunidade cadastrada.</td></tr>';
      return;
    }
    lista.innerHTML = oportunidades.map(o => `
      <tr>
        <td>${esc(o.titulo)}</td><td>${o.tipo}</td><td>${esc(o.professor)}</td>
        <td>${o.vagas}</td><td>${o.inscritos}</td>
        <td>
          <button onclick="editar(${o.id})">Editar</button>
          <button onclick="excluir(${o.id})">Excluir</button>
        </td>
      </tr>`).join('');
  } catch (e) {
    mostrarMensagem(e.message);
  }
}

async function editar(id) {
  try {
    const o = await api('/oportunidades/' + id);
    document.getElementById('id').value = o.id;
    campos.forEach(c => document.getElementById(c).value = o[c]);
    document.getElementById('tituloForm').textContent = 'Editando oportunidade';
  } catch (e) {
    mostrarMensagem(e.message);
  }
}

async function excluir(id) {
  if (!confirm('Excluir a oportunidade? As inscrições dela também serão apagadas.')) return;
  try {
    await api('/oportunidades/' + id, 'DELETE');
    carregar();
  } catch (e) {
    mostrarMensagem(e.message);
  }
}

function limpar() {
  document.getElementById('formulario').reset();
  document.getElementById('id').value = '';
  document.getElementById('tituloForm').textContent = 'Nova oportunidade';
  mostrarMensagem();
}

document.getElementById('formulario').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const dados = {};
  campos.forEach(c => dados[c] = document.getElementById(c).value);
  const id = document.getElementById('id').value;
  try {
    if (id) await api('/oportunidades/' + id, 'PUT', dados);
    else await api('/oportunidades', 'POST', dados);
    limpar();
    carregar();
  } catch (e) {
    mostrarMensagem(e.message);
  }
});

document.getElementById('cancelar').addEventListener('click', limpar);
document.getElementById('filtro').addEventListener('change', carregar);
carregar();
