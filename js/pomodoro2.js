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
var pomodoroStarter = 25, shortStarter = 5, longStarter = 10, qtdRoundsStarter;
let time = pomodoroStarter * 60;
var intervaloId;
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
    console.log("Rodar");
    
    intervaloId =  setInterval(updateCountDown, 1000);
});


function updateCountDown(){
    console.log("Update");
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    displayMinutes.innerHTML = minutes;
    displaySeconds.innerHTML = seconds;
    time--;

    if(time < 0 ){
        clearInterval(intervaloId);
    }
}



$("#resetar").click(function(){
    minutosAtuais = pomodoroStarter;
    setTime();
    console.log("Resetar");
});

// Botões Modal
$("#cancel").click(function(){
    $("#modals").hide();
});

function setTime(){
    displayMinutes.innerHTML = minutosAtuais;
    displaySeconds.innerHTML = segundosAtuais;    
}

$("#pomo-save").click(function(){
    pomodoroStarter = selectPomodoro.value;
    shortStarter = selectShort.value;
    longStarter = selectLong.value;
    qtdRoundsStarter = inputRounds.value;
    
    time = pomodoroStarter * 60;

    minutosAtuais = pomodoroStarter;
    segundosAtuais = "00";
    setTime();
    $("#modals").hide();
});

// Funções para contar tempo

// function pomodoro(){
//     minutosAtuais = pomodoroStarter;
//     segundosAtuais = 00;
//     timer();
// }

// function short(){
//     minutosAtuais = shortStarter;
//     segundosAtuais = 00;
//     timer();
// }








function timer(starter){
    minutosAtuais = starter;
    setTimeout(
        decrementarNoModuloClock(segundosAtuais), 
        1000
        );
    setTime();
    console.log(starter);
}

// Funções auxiliares

function decrementarNoModuloClock(decrementavel){
    decrementavel--;
    decrementavel = (decrementavel + 60) % 60;
    return decrementavel;
}