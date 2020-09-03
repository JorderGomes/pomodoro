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
// Valores atuais
let listTimers = [25, 5, 10];
const qtdTimers = listTimers.length;
let i = 0;
var qtdRoundsStarter = 4;
let time = listTimers[i] * 60;
var intervaloId;


var minutosAtuais = 25;
const segundosAtuais = "00";

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
    inputRounds.value = qtdRoundsStarter;
}

function setTime(minutos){
    displayMinutes.innerHTML = minutos;
    displaySeconds.innerHTML = segundosAtuais;    
}

$("#pomo-save").click(function(){
    listTimers[0] = selectPomodoro.value;
    listTimers[1] = selectShort.value;
    listTimers[2] = selectLong.value;
    qtdRoundsStarter = inputRounds.value;
    
    time = listTimers[0] * 60;

    minutosAtuais = listTimers[0];
    
    setTime(minutosAtuais);
    $("#modals").hide();
});

SetarValores();


// Botões Controle
$("#config").click(function(){
    $("#modals").show();
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

function updateCountDown(){
    time--;
    if(time < 0 ){
        // i = (i + 1) % 2;
        i++;
        // tetse
        i = i % 2;
        time = listTimers[i] * 60;
        // clearInterval(intervaloId);
    }

    if(i == qtdTimers ){
        clearInterval(intervaloId);
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
    setTime(listTimers[0]);
    console.log("Resetar");
});

// Botões Modal
$("#cancel").click(function(){
    $("#modals").hide();
    selectPomodoro.value = listTimers[0];
    selectShort.value = listTimers[1];
    selectLong.value = listTimers[2];
    inputRounds.value = qtdRoundsStarter;
});





// Funções para contar tempo







