// import { qtdRounds } from "./pomodoro"

// variáveis - Removido endpoint externo e criado chave estável do localStorage
const LOCAL_STORAGE_KEY = "pomodoro_tasks_data";
const taskList = [];

// Função auxiliar interna para simular o banco de dados local
function obterTarefasDoStorage() {
    const dados = localStorage.getItem(LOCAL_STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
}

function salvarTarefasNoStorage(tarefas) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tarefas));
}

// Emulação da listagem via API (Retorna uma Promise para manter compatibilidade com o .then())
function listarTasks() {
    return new Promise((resolve) => {
        const tasksLocal = obterTarefasDoStorage();
        taskList.push(...tasksLocal);
        resolve(tasksLocal);
    });
}

function renderTasks() {
    taskList.map(task => {
        montarItem(
            task.id, 
            task.concluido, 
            task.nome, 
            task.descricao, 
            task.data_conclusao.split('-').reverse().join('-')
        )
    })
}

listarTasks().then(() => { renderTasks() })
// renderTasks()

const btnSalvar = document.getElementById('salvar-tarefa')
const btnCancel = document.getElementById('cancelar-salvar')
const btnRelatorios = document.getElementById('report')

const inputIdTask = document.getElementById('id-task')
const inputNome = document.getElementById('task-name')
const inputDesc = document.getElementById('task-description')
const inputDate = document.getElementById('dataConclusao')

const toggle_btns = [...document.getElementsByClassName('toggle-btn')]

const popup = document.getElementById('popup')
const modals = document.getElementById('modals')
const new_task_form = document.getElementById('new-task-form')
const report_modal = document.getElementById('report-modal')
const close_report = document.getElementById('close-report')
const add_task = document.getElementById('new-task')

toggle_btns.map(toggle_btn => {
    toggle_btn.addEventListener('click', toggleTask)
})

function toggleTask(event) {
    const botao_toggle = event.target
    const taskId = botao_toggle.id.split('.')[0]
    console.log(taskId);
    const taskIcon = document.getElementById(taskId + '.toggle-icon')
    const taskBody = document.getElementById(taskId + '.body')
    if (taskBody.classList.contains('hide')) {
        taskBody.classList.remove('hide')

        taskIcon.classList.remove('fa-chevron-down')
        taskIcon.classList.add('fa-chevron-up')
    }
    else {
        taskBody.classList.add('hide')

        taskIcon.classList.remove('fa-chevron-up')
        taskIcon.classList.add('fa-chevron-down')

    }
}

// criar / atualizar localmente
btnSalvar.addEventListener('click', (event) => {
    event.preventDefault()
    const task = {}

    task.nome = inputNome.value
    task.descricao = inputDesc.value
    task.data_conclusao = inputDate.value

    const tarefasAtuais = obterTarefasDoStorage();

    if (inputIdTask.value === '') {
        // Criar nova tarefa
        task.id = Date.now(); // Gera um ID numérico único baseado no timestamp atual
        task.concluido = false;
        task.feito = false;
        task.qtd_rounds = 0;

        tarefasAtuais.push(task);
        salvarTarefasNoStorage(tarefasAtuais);
        taskList.push(task); // Sincroniza array em memória

        montarItem(task.id, task.feito, task.nome, task.descricao, task.data_conclusao);
    }
    else {
        // Editar tarefa existente
        task.id = parseInt(inputIdTask.value);
        
        const indexStorage = tarefasAtuais.findIndex(t => t.id === task.id);
        if (indexStorage !== -1) {
            // Preserva propriedades de estado que não estão no form
            task.concluido = tarefasAtuais[indexStorage].concluido;
            task.feito = tarefasAtuais[indexStorage].feito || tarefasAtuais[indexStorage].concluido;
            task.qtd_rounds = tarefasAtuais[indexStorage].qtd_rounds || 0;
            
            tarefasAtuais[indexStorage] = task;
            salvarTarefasNoStorage(tarefasAtuais);
        }

        const indexMemoria = taskList.findIndex(t => t.id === task.id);
        if (indexMemoria !== -1) {
            taskList[indexMemoria] = { ...taskList[indexMemoria], ...task };
        }

        const nomeCanva = document.getElementById(`tarefa-${task.id}.nome`)
        nomeCanva.innerHTML = ''
        nomeCanva.innerHTML = task.nome

        const descricaoCanva = document.getElementById(`tarefa-${task.id}.descricao`)
        descricaoCanva.innerHTML = ''
        descricaoCanva.innerHTML = task.descricao
    }
    hideFormAddTask()
})

btnCancel.addEventListener('click', (event) => {
    event.preventDefault()
    hideFormAddTask()
})

// listar 
function montarItem(id, feito, nome, desc, data_conclusao) {
    // Criar botões de editar e apagar
    const btnEdit = document.createElement('button')
    btnEdit.innerHTML = 'Editar'
    btnEdit.id = `tarefa-${id}.edit`
    btnEdit.classList.add('btn', 'btn-info')
    btnEdit.addEventListener('click', showEditForm)
    const btnDelete = document.createElement('button')
    btnDelete.innerHTML = 'Apagar'
    btnDelete.id = `tarefa-${id}.delete`
    btnDelete.classList.add('btn', 'btn-danger')
    btnDelete.addEventListener('click', deleteTask)
    // Criar Footer e adicionar botões
    const footer = document.createElement('div')
    footer.classList.add('line', 'task-footer', 'control-btns')
    footer.appendChild(btnDelete)
    footer.appendChild(btnEdit)
    // Criar Seção
    const section = document.createElement('div')
    section.classList.add('line', 'task-section')
    section.id = `tarefa-${id}.descricao`
    section.innerHTML = desc
    // Criar Seção
    const sectionDate = document.createElement('div')
    sectionDate.classList.add('line', 'task-section')
    sectionDate.id = `tarefa-${id}.data_conclusao`
    sectionDate.innerHTML = `Data conclusão: ${data_conclusao}`
    // Criar Body
    const body = document.createElement('div')
    body.id = `tarefa-${id}.body`
    body.classList.add('hide', 'task-body')
    body.appendChild(section)
    body.appendChild(sectionDate)
    body.appendChild(footer)
    // Criar Toggle button icon
    const icon = document.createElement('i')
    icon.id = `tarefa-${id}.toggle-icon`
    icon.classList.add('fa-solid', 'fa-chevron-down')
    // Criar Toggle button
    const btnToggle = document.createElement('button')
    btnToggle.id = `tarefa-${id}.toggle`
    btnToggle.appendChild(icon)
    btnToggle.classList.add('btn', 'btn-secondary', 'toggle-btn', 'reveal')
    btnToggle.addEventListener('click', toggleTask)
    // Criar Nome
    const nameTask = document.createElement('label')
    nameTask.innerHTML = nome
    nameTask.classList.add('name')
    nameTask.id = `tarefa-${id}.nome`
    nameTask.htmlFor = `tarefa-${id}.done`
    // Criar input checkbox
    const done = document.createElement('input')
    done.type = 'checkbox'
    done.name = 'done'
    if (feito === true) done.checked = true
    done.id = `tarefa-${id}.done`
    done.classList.add('done')
    done.addEventListener('click', toggleChecked)
    // Criar Head
    const head = document.createElement('div')
    head.classList.add('line', 'task-head')
    head.appendChild(done)
    head.appendChild(nameTask)
    head.appendChild(btnToggle)
    // Criar Item
    const tarefa = document.createElement('div')
    tarefa.id = `tarefa-${id}`
    tarefa.classList.add('task', 'card')
    tarefa.appendChild(head)
    tarefa.appendChild(body)

    const listaTarefas = document.getElementById('task-list')
    listaTarefas.appendChild(tarefa)
}


// toggle
function toggleTarefa(event) {
    const botao_toggle = event.target
    const tarefaId = botao_toggle.id.split('.')[0]
    const tarefaIcon = document.getElementById(tarefaId + '.toggle-icon')
    const tarefaBody = document.getElementById(tarefaId + '.body')
    if (tarefaBody.classList.contains('hidden')) {
        tarefaBody.classList.remove('hidden')

        tarefaIcon.classList.remove('fa-chevron-down')
        tarefaIcon.classList.add('fa-chevron-up')
    }
    else {
        tarefaBody.classList.add('hidden')

        tarefaIcon.classList.remove('fa-chevron-up')
        tarefaIcon.classList.add('fa-chevron-down')

    }
}

add_task.addEventListener('click', showFormAddTask)

function showFormAddTask(event) {
    modals.style.display = 'flex'
    new_task_form.style.display = 'block'
}

function hideFormAddTask() {
    modals.style.display = 'none'
    new_task_form.style.display = 'none'
    inputNome.value = ""
    inputDesc.value = ""
    inputDate.value = ""
    inputIdTask.value = "" // Garante a limpeza do ID de edição oculto
}

// apagar localmente
function deleteTask(event) {
    const listTasksArticle = document.getElementById('task-list')
    const cardTaskId = event.target.id.split('.')[0];
    const taskCard = document.getElementById(cardTaskId)
    listTasksArticle.removeChild(taskCard)

    const idTask = parseInt(cardTaskId.split('-')[1]);
    
    // Remove do localStorage
    let tarefasAtuais = obterTarefasDoStorage();
    tarefasAtuais = tarefasAtuais.filter(t => t.id !== idTask);
    salvarTarefasNoStorage(tarefasAtuais);

    // Remove do array em memória
    const indexMemoria = taskList.findIndex(t => t.id === idTask);
    if (indexMemoria !== -1) {
        taskList.splice(indexMemoria, 1);
    }
    console.log(`Tarefa ${idTask} deletada do localStorage.`);
}

// editar
function showEditForm(event) {
    showFormAddTask(event)
    const idTask = event.target.id.split('.')[0]
    console.log(idTask);
    inputIdTask.value = idTask.split('-')[1]
    inputNome.value = document.getElementById(idTask + '.nome').innerHTML
    inputDesc.value = document.getElementById(idTask + '.descricao').innerHTML
    let data_conclusao_edit = document.getElementById(idTask + '.data_conclusao').innerHTML.split(': ')[1]
    data_conclusao_edit = data_conclusao_edit.split('-').reverse().join('-')
    inputDate.value = data_conclusao_edit
}


// Marcar desmarcar localmente
function obterTask(id) {
    // Retorna imediatamente o objeto correspondente simulando a chamada REST
    const tarefas = obterTarefasDoStorage();
    const taskFound = tarefas.find(t => t.id === parseInt(id));
    return Promise.resolve(taskFound);
}

async function toggleChecked(event) {
    const idTask = event.target.id.split('.')[0].split('-')[1];
    try {
        const task = await obterTask(idTask)
        if (!task) return;

        task.concluido = !task.concluido
        task.feito = task.concluido; // Sincroniza a propriedade estrutural 'feito'
        
        if (task.concluido == true){
            task.qtd_rounds = parseInt(sessionStorage.getItem('qtd_rounds')) || 0;
        } else {
            task.qtd_rounds = 0
        }
        sessionStorage.setItem('qtd_rounds', '0');

        // Atualiza no localStorage
        const tarefasAtuais = obterTarefasDoStorage();
        const indexStorage = tarefasAtuais.findIndex(t => t.id === task.id);
        if (indexStorage !== -1) {
            tarefasAtuais[indexStorage] = task;
            salvarTarefasNoStorage(tarefasAtuais);
        }

        // Atualiza no array em memória
        const indexMemoria = taskList.findIndex(t => t.id === task.id);
        if (indexMemoria !== -1) {
            taskList[indexMemoria] = task;
        }

        console.log("Status atualizado no localStorage:", task);

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

// relatório
// emulação do endpoint de agregação 'qtd_tasks_by_date' baseado no localStorage
function calcularQtdTasksByDate() {
    const tarefas = obterTarefasDoStorage();
    const contagemMapa = {};

    tarefas.forEach(task => {
        // Consideramos apenas tarefas marcadas como concluídas para o relatório de workload
        if (task.concluido && task.data_conclusao) {
            contagemMapa[task.data_conclusao] = (contagemMapa[task.data_conclusao] || 0) + 1;
        }
    });

    // Mapeia o objeto agregado para o formato de array esperado pelo Chart.js original
    return Object.keys(contagemMapa).map(data => {
        return {
            data_conclusao: data,
            count: contagemMapa[data]
        };
    }).sort((a, b) => new Date(a.data_conclusao) - new Date(b.data_conclusao));
}

close_report.addEventListener('click', (event) => {
    modals.style.display = 'none'
    report_modal.style.display = 'none'
})

function displayChart(qtd_tasks_by_date) {
    const dateList = qtd_tasks_by_date.map(obj => obj.data_conclusao.split('-').reverse().join('-')); // Formatado para exibição amigável
    const qtdTasksList = qtd_tasks_by_date.map(obj => obj.count);

    const ctx = document.getElementById('workload').getContext('2d');
    const workload = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico
        data: {
            labels: dateList,
            datasets: [{
                label: 'Qtd tarefas',
                data: qtdTasksList,
                backgroundColor: 'blue',
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Quantidade de tarefas por dia'
            }
        }
    });
    workload.update(); // Para atualizar o gráfico
}

btnRelatorios.addEventListener('click', async (event) => {
    // Simula a requisição fetch resolvendo a agregação local instantaneamente
    const qtd_tasks_by_date = calcularQtdTasksByDate();
    
    console.log(qtd_tasks_by_date);
    modals.style.display = 'flex'
    report_modal.style.display = 'flex'
    displayChart(qtd_tasks_by_date)
})