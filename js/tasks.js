// variáveis

const tasksUrl = "http://127.0.0.1:8000/tarefas/"


function listarTasks(){
    fetch(tasksUrl)
        .then(response => {
            return response.json()
        })
        .then(tasksApi => {
            tasksApi.map(task => {
                montarItem(task.id, task.concluido, task.nome, task.descricao)
            })
        })
        .catch(error => {
            // return []
        })
}

listarTasks()


// TODO: obter botão
// const btnSalvar = document.getElementById('salvar-tarefa')
// const btnCancel = document.getElementById('cancelar-salvar')
const inputIdTask = document.getElementById('id-task')
const inputNome = document.getElementById('task-name')
const inputDesc = document.getElementById('task-description')

const toggle_btns = [...document.getElementsByClassName('toggle-btn')]

const popup = document.getElementById('popup')
const popup_body = document.getElementById('popup-body')
// const add_task = document.getElementById('add-task')

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

// btnCancel.addEventListener('click', (event) => {
//     event.preventDefault()
//     hideFormAddTask()
// })



// btnSalvar.addEventListener('click', (event) => {
//     event.preventDefault()
//     const task = {}

//     task.nome = inputNome.value
//     task.descricao = inputDesc.value

//     if (inputIdTask.value === '') {
//         task.feito = false
//         fetch(tasksUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(task)
//         })
//         .then(response => response.json())
//         .then(task => {
//             montarItem(task.id, task.feito, task.nome, task.descricao);
//         })
//         .catch(error =>{
//             console.error(error);
//         })

        
//     }
//     else {
//         task.id = inputIdTask.value
//         const editTaskUrl = tasksUrl + task.id + '/'

//         fetch(editTaskUrl, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(task)
//         })
//         .then(response => response.json())
//         .then(task => {
//             console.log(task);
//         })
//         .catch(error =>{
//             console.error(error);
//         })
        
//         const nomeCanva = document.getElementById(`tarefa-${task.id}.nome`)
//         nomeCanva.innerHTML = ''
//         nomeCanva.innerHTML = task.nome
        
//         const descricaoCanva = document.getElementById(`tarefa-${task.id}.descricao`)
//         descricaoCanva.innerHTML = ''
//         descricaoCanva.innerHTML = task.descricao

//     }
//     hideFormAddTask()
// })

// listar 


function montarItem(id, feito, nome, desc) {
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
    // Criar Body
    const body = document.createElement('div')
    body.id = `tarefa-${id}.body`
    body.classList.add('hide', 'task-body')
    body.appendChild(section)
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

// add_task.addEventListener('click', showFormAddTask)

function showFormAddTask(event) {
    popup.style.display = 'flex'
    popup_body.style.display = 'block'
}

function hideFormAddTask() {
    popup.style.display = 'none'
    popup_body.style.display = 'none'
    inputNome.value = ""
    inputDesc.value = ""
}

// apagar


function deleteTask(event) {
    const listTasksArticle = document.getElementById('lista-tarefas')
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
    .catch(error =>{
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
        .catch(error =>{
            console.error(error);
        })

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
    
    
}