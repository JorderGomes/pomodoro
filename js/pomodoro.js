// Containers de exibição
var displayPomodoro = document.getElementById("display-pomodoro");
var displayMinutes = document.getElementById("display-minutes");
var displaySeconds = document.getElementById("display-seconds");

// Inputs
var selects = document.getElementsByTagName("select");
var selectPomodoro = document.getElementById("pomo-minutes");
var selectShort = document.getElementById("short-minutes");
var selectLong = document.getElementById("long-minutes");
var inputRounds = document.getElementById("rounds");
var btnRodar = document.getElementById("rodar");
var btnParar = document.getElementById("parar");

const POMODORO_STORAGE_KEY = "pomodoro_timer_config";

// FLUXO REQUISITO 1: Inicialização de valores padrão ou leitura do localStorage
let listTimers = [25, 5, 10];
var qtdRoundsStarter = 4;

function carregarConfiguracoesIniciais() {
    const dadosSalvos = localStorage.getItem(POMODORO_STORAGE_KEY);
    
    if (dadosSalvos) {
        console.log(dadosSalvos);
        // Se já foi editado anteriormente, recupera os dados salvos (Requisito 3)
        const config = JSON.parse(dadosSalvos);
        listTimers[0] = config.pomodoro;
        listTimers[1] = config.short;
        listTimers[2] = config.long;
        qtdRoundsStarter = config.rounds;
    } else {
        // Primeiro acesso: Define os padrões e já inicializa o armazenamento (Requisito 1)
        const configPadrao = { pomodoro: 25, short: 5, long: 10, rounds: 4 };
        localStorage.setItem(POMODORO_STORAGE_KEY, JSON.stringify(configPadrao));
    }
}


// Executa a verificação de armazenamento antes do setup da tela
carregarConfiguracoesIniciais();
const segundosAtuais = "00";
// setTime(listTimers[0]);

let listPlayTimers = [];
let qtdTimers = listPlayTimers.length - 1;
let i = 0;

sessionStorage.setItem('qtd_rounds', '0');

let time = listPlayTimers[i] * 60;
var intervaloId;

var minutosAtuais = listTimers[0];

function gerenciarPermissaoNotificacao() {
    if (!("Notification" in window)) {
        console.log("Este navegador não suporta notificações de desktop.");
        return;
    }
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                console.log("Permissão para notificações concedida!");
            }
        });
    }
}
gerenciarPermissaoNotificacao();

// Chamar setup
SetarValores();
setListPlayTimers();

displayMinutes.innerHTML = minutosAtuais;
displaySeconds.innerHTML = segundosAtuais;

// Setar Valores Padrão dos inputs
function setarMinutos(seletor){
    for(let i = 1; i <= 60; i++){
        seletor.innerHTML += `<option value=${i}> ${i} </option>`
    }
}

function SetarValores(){
    for(select of selects){
        setarMinutos(select);
    }
    selectPomodoro.value = listTimers[0]; //selectPomodoro[24].value;
    selectShort.value = listTimers[1]; //selectShort[4].value;
    selectLong.value = listTimers[2]; //selectLong[9].value;
    inputRounds.value = qtdRoundsStarter;
}

function setTime(minutos){
    displayMinutes.innerHTML = minutos;
    displaySeconds.innerHTML = segundosAtuais;    
    time = listPlayTimers[i] * 60;
}

function setListPlayTimers(){
    listPlayTimers = [];
    for(let iterator = 0; iterator < qtdRoundsStarter ; iterator++){
        listPlayTimers.push(listTimers[0]);
        listPlayTimers.push(listTimers[1]);
    }
    listPlayTimers.push(listTimers[2]);
    qtdTimers = listPlayTimers.length;
    console.log("Devo Executar " + qtdTimers + " vezes");
    time = listPlayTimers[i] * 60;
    console.log(listPlayTimers); 
} 


// FLUXO REQUISITO 2 e 3: Salva os novos valores editados e persistidos no localStorage
$("#pomo-save").click(function(){ //
    listTimers[0] = parseInt(selectPomodoro.value); //
    listTimers[1] = parseInt(selectShort.value); //
    listTimers[2] = parseInt(selectLong.value); //
    qtdRoundsStarter = parseInt(inputRounds.value); //
    
    // Grava permanentemente no navegador do usuário
    const novaConfig = {
        pomodoro: listTimers[0],
        short: listTimers[1],
        long: listTimers[2],
        rounds: qtdRoundsStarter
    };
    localStorage.setItem(POMODORO_STORAGE_KEY, JSON.stringify(novaConfig));

    setListPlayTimers(); //
    time = listPlayTimers[0] * 60; //

    minutosAtuais = listTimers[0]; //
    
    setTime(minutosAtuais); //
    
    $("#modals").hide(); //
    $("#pomodoro-modal").hide(); //
});

// Botões Controle
$("#config").click(function(){
    gerenciarPermissaoNotificacao();
    $("#modals").show();
    $("#pomodoro-modal").show();
});

$("#rodar").click(function(){
    btnRodar.classList.add("hide");
    btnParar.classList.remove("hide");
    intervaloId =  setInterval(updateCountDown, 1000);
});

$("#parar").click(function(){
    btnParar.classList.add("hide");
    btnRodar.classList.remove("hide");
    clearInterval(intervaloId);
    minutosAtuais = displayMinutes.innerHTML;
});

function showNotification(i) {
    if (Notification.permission === "granted") {
        let tituloNotificacao = "";
        let corpoNotificacao = "";

        // Mapeia o próximo bloco baseado nas regras da estrutura listPlayTimers
        if (i === (qtdTimers - 1)) {
            // Último item da lista é sempre a Pausa Longa
            tituloNotificacao = "🔔 Hora do Descanso Longo!";
            corpoNotificacao = `Aproveite para relaxar por ${listPlayTimers[i]} minutos antes da próxima jornada.`;
        } else if (i % 2 === 1) {
            // Índices ímpares correspondem a Pausas Curtas
            tituloNotificacao = "☕ Pausa Curta Iniciada!";
            corpoNotificacao = `Dê uma pausa de ${listPlayTimers[i]} minutos para esticar as pernas.`;
        } else {
            // Índices pares correspondem ao Pomodoro (Foco)
            tituloNotificacao = "🎯 Hora de Focar!";
            corpoNotificacao = `Ciclo de foco iniciado. Concentre-se totalmente pelos próximos ${listPlayTimers[i]} minutos.`;
        }

        // Cria e dispara o alerta visual na área de trabalho
        new Notification(tituloNotificacao, {
            body: corpoNotificacao,
            icon: "img/time.svg" // Usa o ícone do projeto na notificação
        });
    }
}

function updateCountDown(){
    time--;
    if(time == 0){
        document.getElementById('sound').play();
    }

    if(time < 0 ){
        console.log("Estou em " + i);
        if (i % 2 == 1){
            const qtdRounds = parseInt(sessionStorage.getItem('qtd_rounds')) + 1
            console.log(`Estou no round: ${qtdRounds}`);
            sessionStorage.setItem('qtd_rounds', qtdRounds.toString());
        }
        i++;
        if (i < qtdTimers) {
            time = listPlayTimers[i] * 60;
            console.log("Passei para " + i);
            showNotification(i);
        }
    }

    if(i == qtdTimers){
        console.log("Vou parar em " + i);
        clearInterval(intervaloId);
        if (Notification.permission === "granted") {
            new Notification("🎉 Sessão Finalizada!", {
                body: "Todos os rounds do Pomodoro foram concluídos com sucesso!",
                icon: "img/time.svg"
            });
        }
        return 0;
    }

    console.log("Update " + time);
    
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    displayMinutes.innerHTML = minutes;
    displaySeconds.innerHTML = seconds;
    
}

$("#resetar").click(function(){
    clearInterval(intervaloId);
    btnParar.classList.add("hide");
    btnRodar.classList.remove("hide");
    setTime(listPlayTimers[i]);
    console.log("Resetar");
});

// Botões Modal
$("#cancel").click(function(){
    $("#modals").hide();
    $("#pomodoro-modal").hide();
    selectPomodoro.value = listTimers[0];
    selectShort.value = listTimers[1];
    selectLong.value = listTimers[2];
    inputRounds.value = qtdRoundsStarter;
});
 