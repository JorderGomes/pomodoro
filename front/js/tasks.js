// import { qtdRounds } from "./pomodoro"

// variáveis
const tasksUrl = "http://127.0.0.1:8000/tarefas/"
const taskList = []
// const qtd_tasks_by_date = []

function listarTasks() {
    return fetch(tasksUrl)
        .then(response => {
            return response.json()
        })
        .then(tasksApi => {
            taskList.push(...tasksApi);
        })
        .catch(error => {
            console.log(error);
        })
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

// criar
btnSalvar.addEventListener('click', (event) => {
    event.preventDefault()
    const task = {}

    task.nome = inputNome.value
    task.descricao = inputDesc.value
    task.data_conclusao = inputDate.value

    if (inputIdTask.value === '') {
        task.feito = false
        fetch(tasksUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(task => {
            montarItem(task.id, task.feito, task.nome, task.descricao, task.data_conclusao);
        })
        .catch(error =>{
            console.error(error);
        })


    }
    else {
        task.id = inputIdTask.value
        const editTaskUrl = tasksUrl + task.id + '/'

        fetch(editTaskUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(task => {
            console.log(task);
        })
        .catch(error =>{
            console.error(error);
        })

        const nomeCanva = document.getElementById(`tarefa-${task.id}.nome`)
        nomeCanva.innerHTML = ''
        nomeCanva.innerHTML = task.nome

        const descricaoCanva = document.getElementById(`tarefa-${task.id}.descricao`)
        descricaoCanva.innerHTML = ''
        descricaoCanva.innerHTML = task.descricao

    }
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
}

// apagar
function deleteTask(event) {
    const listTasksArticle = document.getElementById('task-list')
    const cardTaskId = event.target.id.split('.')[0];
    const taskCard = document.getElementById(cardTaskId)
    listTasksArticle.removeChild(taskCard)

    const idTask = cardTaskId.split('-')[1]
    const deleteTaskUrl = tasksUrl + idTask + '/'
    console.log(deleteTaskUrl);

    fetch(deleteTaskUrl, {
        method: 'DELETE'
    })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        })

}

// editar
function showEditForm(event) {
    showFormAddTask(event)
    const idTask = event.target.id.split('.')[0]
    console.log(idTask);
    inputIdTask.value = idTask.split('-')[1]
    inputNome.value = document.getElementById(idTask + '.nome').innerHTML
    inputDesc.value = document.getElementById(idTask + '.descricao').innerHTML
    data_conclusao_edit = document.getElementById(idTask + '.data_conclusao').innerHTML.split(': ')[1]
    data_conclusao_edit = data_conclusao_edit.split('-').reverse().join('-')
    inputDate.value = data_conclusao_edit
}


// Marcar desmarcar

async function obterTask(id) {
    const getCurrentTaskUrl = tasksUrl + id + '/'
    try {
        const response = await fetch(getCurrentTaskUrl)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

async function toggleChecked(event) {
    const idTask = event.target.id.split('.')[0].split('-')[1];
    try {
        const task = await obterTask(idTask)
        task.concluido = !task.concluido
        
        if (task.concluido == true){
            task.qtd_rounds = parseInt(sessionStorage.getItem('qtd_rounds'));
        } else {
            task.qtd_rounds = 0
        }
        sessionStorage.setItem('qtd_rounds', '0');

        const editTaskUrl = tasksUrl + idTask + '/'
        fetch(editTaskUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(response => response.json())
            .then(task => {
                console.log(task);
            })
            .catch(error => {
                console.error(error);
            })

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }


}

// relatório
// 
// eficiência de trabalho:
// ordenar por data de conclusão
// obter qtd_rounds de cada uma


close_report.addEventListener('click', (event) => {
    modals.style.display = 'none'
    report_modal.style.display = 'none'
})

function displayChart(qtd_tasks_by_date) {
    const dateList = qtd_tasks_by_date.map(obj => obj.data_conclusao);
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
    const qtd_tasks_by_date = await fetch(tasksUrl+'qtd_tasks_by_date')
    .then(response => {
        return response.json()
    })
    console.log(qtd_tasks_by_date);
    modals.style.display = 'flex'
    report_modal.style.display = 'flex'
    displayChart(qtd_tasks_by_date)
})