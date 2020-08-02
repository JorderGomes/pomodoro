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

// Valores atuais
var pomodoroStarter, shortStarter, longStarter, qtdRoundsStarter;
var minutosAtuais, segundosAtuais;

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
    selectPomodoro.value = selectPomodoro[24].value;
    selectShort.value = selectShort[4].value;
    selectLong.value = selectLong[9].value;
    inputRounds.value = 4;

    pomodoroStarter = selectPomodoro.value;
    shortStarter = selectShort.value;
    longStarter = selectLong.value;
    qtdRoundsStarter = inputRounds.value;
}

SetarValores();


// Botões Controle
$("#config").click(function(){
    $("#modals").show();
});

$("#rodar").click(function(){
    console.log("Vou executar um pomodoro de " + pomodoroStarter + " minutos");
    console.log("Com " + shortStarter + " de pausa curta");
    console.log("E " + longStarter + " de pausa longa");
    console.log(qtdRoundsStarter + " vezes");
});

$("#resetar").click(function(){
    console.log("Resetar");
});

// Botões Modal
$("#cancel").click(function(){
    $("#modals").hide();
});

function setTime(){
    displayMinutes.innerHTML = minutosAtuais;    
}

$("#pomo-save").click(function(){
    pomodoroStarter = selectPomodoro.value;
    shortStarter = selectShort.value;
    longStarter = selectLong.value;
    qtdRoundsStarter = inputRounds.value;
    
    minutosAtuais = pomodoroStarter;
    setTime();
    $("#modals").hide();
});
