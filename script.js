
// 1. ESTRUTURA DE DADOS

let tarefas = [];



// 2. SELEÇÃO DE ELEMENTOS DO DOM

const taskInput  = document.getElementById('taskInput');
const addBtn     = document.getElementById('addBtn');
const taskList   = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');



// 3. CONTROLE DE ESTADO


let filtroAtual = 'todas';


// ================================
// 4. FUNÇÃO: ADICIONAR TAREFA
// ================================

function adicionarTarefa() {
  const texto = taskInput.value.trim();

  if (texto === '') return;

  const novaTarefa = {
    id: Date.now(),
    texto: texto,
    concluida: false
  };

  tarefas.push(novaTarefa);
  taskInput.value = '';
  renderizarTarefas();
}



// 5. FUNÇÃO: RENDERIZAR TAREFAS


function renderizarTarefas() {
  taskList.innerHTML = '';

  let tarefasFiltradas = tarefas;

  if (filtroAtual === 'ativas') {
    tarefasFiltradas = tarefas.filter(t => !t.concluida);
  }

  if (filtroAtual === 'concluidas') {
    tarefasFiltradas = tarefas.filter(t => t.concluida);
  }

  tarefasFiltradas.forEach(tarefa => {
    const li       = document.createElement('li');
    const checkbox = document.createElement('input');
    const span     = document.createElement('span');
    const btnRemover = document.createElement('button');

    checkbox.type    = 'checkbox';
    checkbox.checked = tarefa.concluida;
    span.textContent = tarefa.texto;
    btnRemover.textContent = 'X';

    checkbox.addEventListener('click', () => toggleConcluida(tarefa.id));
    btnRemover.addEventListener('click', () => removerTarefa(tarefa.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnRemover);
    taskList.appendChild(li);
  });
}



// 6. FUNÇÃO: REMOVER TAREFA


function removerTarefa(id) {
  tarefas = tarefas.filter(tarefa => tarefa.id !== id);
  renderizarTarefas();
}



// 7. FUNÇÃO: TOGGLE CONCLUÍDA


function toggleConcluida(id) {
  const tarefa = tarefas.find(t => t.id === id);
  tarefa.concluida = !tarefa.concluida;
  renderizarTarefas();
}



// 8. EVENT LISTENERS


addBtn.addEventListener('click', adicionarTarefa);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') adicionarTarefa();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filtroAtual = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderizarTarefas();
  });
});
