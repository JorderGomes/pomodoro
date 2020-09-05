var displaySelected = "pomo";
var displayPomodoro = document.getElementById("display-pomodoro");
var displayMinutes = document.getElementById("display-minutes");
var timePomo , timeLong , timeShort , rounds;

var minutes = 25; 
var seconds = 0;

var selects = document.getElementsByTagName("select");
var pomoMinutes = document.getElementById("pomo-minutes");
var shortMinutes = document.getElementById("short-minutes");
var longMinutes = document.getElementById("long-minutes");
var inputRounds = document.getElementById("rounds");

iniciarTimer();

function setTime(){
    displayMinutes.innerHTML = minutes;
}

$("#config").click(function(){
    $("#modals").show();
});

$("#cancel").click(function(){
    $("#modals").hide();
});

$("#pomo-save").click(function(){
    timePomo = pomoMinutes.value;
    timeShort = shortMinutes.value;
    timeLong = longMinutes.value;
    rounds = inputRounds.value;
    
    minutes = timePomo; 
    setTime();
    $("#modals").hide();
});

$("#rodar").click(function(){
    console.log("Vou executar um pomodoro de " + timePomo + " minutos");
    console.log("Com " + timeShort + " de pausa curta");
    console.log("E " + timeLong + " de pausa longa");
    console.log(rounds + " vezes");
});

function setarMinutos(seletor){
    for(let i = 1; i <= 60; i++){
        seletor.innerHTML += `<option value=${i}> ${i} </option>`
    }
}

function iniciarTimer(){
    for(select of selects){
        setarMinutos(select);
    }
    pomoMinutes.value = pomoMinutes[24].value;
    shortMinutes.value = shortMinutes[4].value;
    longMinutes.value = longMinutes[9].value;
    inputRounds.value = 4;

    timePomo = pomoMinutes.value;
    timeShort = shortMinutes.value;
    timeLong = pomoMinutes.value;
    rounds = inputRounds.value;
}



$("#btn-menu").click(function(){
    $("#menu").fadeIn();
    $("#menu").show();
    
    $("#btn-menu").hide();
    $("#btn-close").show();
    // $("#btn-menu").removeClass("btn-menu");
    // $("#btn-menu").addClass("btn-close");
    console.log("menu aparecendo");
});

$("#btn-close").click(function(){
    $("#menu").fadeOut();
    $("#menu").hide();
    $("#btn-menu").show();
    $("#btn-close").hide();
    // $("#btn-menu").removeClass("btn-close");
    // $("#btn-menu").addClass("btn-menu");
    console.log("menu sumido");
});






$("#setPomo").click(function(){
    displaySelected = "pomo";
    displayPomodoro.innerHTML = timePomo;
});

$("#setShort").click(function(){
    displaySelected = "short";
    displayPomodoro.innerHTML = timeShort;
});

$("#setLong").click(function(){
    displaySelected = "long";
    displayPomodoro.innerHTML = timeLong;
});