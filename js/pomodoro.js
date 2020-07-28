var displaySelected = "pomo";
var displayPomodoro = document.getElementById("display-pomodoro");
var timePomo = "25:00", timeLong = "15:00", timeShort = "03:00";
var
    fieldPomo = document.getElementById("pomo-field"),
    fieldShort = document.getElementById("short-field"),
    fieldLong = document.getElementById("long-field")
    ;

function setTime(){
    if(displaySelected === "pomo"){
        displayPomodoro.innerHTML = timePomo;
    }else if(displaySelected === "long"){
        displayPomodoro.innerHTML= timeLong;
    }else if(displaySelected === "short"){
        displayPomodoro.innerHTML = timeShort;
    }else{
        console.error("erro");
    }
}

$("#config").click(function(){
    fieldPomo.value = timePomo;
    fieldShort.value = timeShort;
    fieldLong.value = timeLong;
    $("#modals").show();
});

$("#cancel").click(function(){
    $("#modals").hide();
});

$("#pomo-save").click(function(){
    timePomo = fieldPomo.value;
    timeLong = fieldLong.value;
    timeShort = fieldShort.value;
    setTime();
    $("#modals").hide();
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
