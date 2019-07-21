const max_level = 10;
let gamelevel = 9;
let gamePatternArray = [];
let userPatternArray= [];
let colorRange="RGBY";
let toggletopleft =false;
let toggletopright =false;
let togglebottomleft =false;
let togglebottomright =false;
let interval;
let gameCountertemp;
let patternString;
let playMode = false;
let userInputStringPattern = "";

for(let i = 0; i < max_level; i++){
    let colorpick = colorRange.charAt(Math.floor(Math.random()*4));
    gamePatternArray.push(colorpick);
}
console.log(gamePatternArray);

const topleft = document.querySelector("#topleft");
const topright = document.querySelector("#topright");
const bottomleft = document.querySelector("#bottomleft");
const bottomright = document.querySelector("#bottomright");
const playbutton = document.getElementById('play');
const counter = document.getElementById('count');

function resetColor(){
    topleft.style.backgroundColor="darkgreen";
    topright.style.backgroundColor="darkred";
    bottomleft.style.backgroundColor="yellow";
    bottomright.style.backgroundColor="darkblue";
};

function green(){
    topleft.style.backgroundColor="lightgreen";
}
function red(){
    topright.style.backgroundColor="lightgreen";
}
function yellow(){
    bottomleft.style.backgroundColor="lightyellow";
}
function blue(){
    bottomright.style.backgroundColor="lightblue";
}

function changegamelevel(level,status){
    if(status === "next"){
        gamelevel = level + 1;
    }
    else{
        gamelevel = level - 1;
    }
}

function validateUserPatternWithGame(userInputStringPattern){
    if(userInputStringPattern.length !== patternString.length){
        messageLogs("wrong");
    }
    if(userInputStringPattern.length === patternString.length){
        if(userInputStringPattern === patternString){
            messageLogs("levelcomplete");
            changegamelevel(gamelevel, "next");
            messageLogs("gamelevel");
        }
        else{
            changegamelevel(gamelevel, "degrade");
            messageLogs("fail");
        }
    }
}

topleft.addEventListener('click',  function(event){
    if(!playMode){
        messageLogs("info");
        event.stopImmediatePropagation();
        return;
    }
    resetColor();
    messageLogs("");
    green();
    userInputStringPattern += "G";
    validateUserPatternWithGame(userInputStringPattern);
});
topright.addEventListener('click',  function(event){
    if(!playMode){
        messageLogs("info");
        event.stopImmediatePropagation();
        return;
    }
    resetColor();
    messageLogs("");
    red();
    userInputStringPattern += "R";
    validateUserPatternWithGame(userInputStringPattern);
});
bottomleft.addEventListener('click',  function(event){
    if(!playMode){
        messageLogs("info");
        event.stopImmediatePropagation();
        return;
    }
    resetColor();
    messageLogs("");
    yellow();
    userInputStringPattern += "Y";
    validateUserPatternWithGame(userInputStringPattern);
});
bottomright.addEventListener('click',  function(event){
    if(!playMode){
        messageLogs("info");
        event.stopImmediatePropagation();
        return;
    }
    resetColor();
    messageLogs("");
    blue();
    userInputStringPattern += "B";
    validateUserPatternWithGame(userInputStringPattern);
});

function messageLogs(key){
    switch(key){
        case "win" :
        counter.innerHTML = "You Won :):):)";
        break;
        case "wrong" :
        counter.innerHTML = "Wrong Input!";
        break;
        case "fail" :
        counter.innerHTML = "Failed Attempt !!! Level Degraded :(:(:(";
        break;
        case "levelcomplete" :
        counter.innerHTML = "Level Completed !!!";
        break;
        case "userinput" :
        counter.innerHTML = "Waiting for user input...";
        break;
        case "info" :
        counter.innerHTML = "Let the computer turn be over!!!";
        break;
        case "gamelevel" : 
        counter.innerHTML = "Gamelevel >>> " + gamelevel;
        break;
        case "" : 
        counter.innerHTML = "";
        break;
        default:
        counter.innerHTML = "Some error has occurred. Please try again after sometime !!!";
    }
}

function glowSectors(){

    if(gameCountertemp === patternString.length){
        clearInterval(interval);
        playMode = true;
        messageLogs("userinput");
    return;
    }

    if(patternString[gameCountertemp] === "G"){
        green(); 
    } else if(patternString[gameCountertemp] === "R"){
        red();
    } else if(patternString[gameCountertemp] === "Y"){
        yellow();
    } else if(patternString[gameCountertemp] === "B"){
        blue();
    }

    ++gameCountertemp;

    setTimeout(function(){
        resetColor();
    }, 750);
}

function gameCompleted(){
    if(gamelevel < max_level){
        return false;
    }
    if(gamelevel > max_level){
        playMode = false;
        messageLogs("win");
        return true;
    }
}

function playGame(){
    if(!gameCompleted()){
        gameCountertemp = 0;
        gamePatternArray=["R","RGB","YGRR","RR","RYGG","YYGR","BBRG","GRGRR","BYRYG","GGRBGYB"];
        patternString = gamePatternArray[gamelevel-1];
        userInputStringPattern = "";
        interval = setInterval(glowSectors, 800);
    }
    else if(gameCompleted){
        clearInterval(interval);
    }
}

function startGame(){
    resetColor();
    clearInterval(interval);
    playGame();
}