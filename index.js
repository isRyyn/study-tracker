// Elements
var display = document.getElementById("display");
var lapsScreen = document.getElementById("laps");

var playBtn = document.getElementById("playBtn");
var resetBtn = document.getElementById("resetBtn");
var clearLapsBtn = document.getElementById("clearLaps");
var changeDisplayBtn = document.getElementById("changeLapsType");

// Time
let miliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;


// Vars
let startTime = null;
let diff = null;
let isPaused = false;

let laps = [];
let lapsMinutes = [];
let minuteLapType = true;

var interval = null;
playBtn.addEventListener("click", function () {
    
    if (interval !== null) {
        diff = Date.now() - startTime;

        isPaused = true;

        setLaps();

        return;
    }
    

    startTime = Date.now() - (isPaused ? diff : 0);
    isPaused = false;
    playBtn.innerHTML = 'Lap';
    interval = setInterval(function () {
        updateTime();
        display.innerHTML = `${formatVal(hours)} : ${formatVal(minutes)} : ${formatVal(seconds)} : ${formatMiliseconds(miliseconds)}`;

    }, 1);
});
 

// Event listeners
resetBtn.addEventListener("click", function () {
    playBtn.innerHTML = 'Start';
    resetInterval();

    display.innerHTML = '00 : 00 : 00 : 000';
});

clearLapsBtn.addEventListener("click", function () {
    laps = [];
    lapsScreen.innerHTML = '';
    clearLapsBtn.hidden = true;
});


changeDisplayBtn.addEventListener("click", function() {
    minuteLapType = !minuteLapType;
    changeDisplayBtn.innerHTML = minuteLapType ? 'Show laps' : 'Show minutes';
    setLapsScreen();
});


function resetInterval() {
    clearInterval(interval);
    interval = null;
}


function updateTime() {
    diff = Date.now() - startTime;

    miliseconds = diff % 1000;    
    seconds = Math.floor(diff / 1000) % 60;
    minutes = Math.floor(diff / 60000) % 60;
    hours = Math.floor(diff/ 3600000);
     
}

function setLaps() {
    laps.push(display.innerHTML);
    lapsMinutes.push((Math.floor(diff / 60000) % 60));
    
    setLapsScreen();

    clearLapsBtn.hidden = false;
    changeDisplayBtn.hidden = false;
}

function setLapsScreen() {
    const arr = minuteLapType ? lapsMinutes : laps;

    lapsScreen.innerHTML = arr.map((lap, i) => {
        let type = i % 2 == 0 ? 'Study' : 'Break';
        let className = type.toLowerCase();

        return `
        <li>
            <span class="${className}">${ type }  : </span>
            <span>${ lap }</span>
        </li>
        `
    }).join('');
}

function formatVal(unit) {
    if (unit < 10) {
        return '0' + unit;
    }
    return unit;
}


function formatMiliseconds(unit) {
    if (unit < 10) {
        return '00' + unit;
    } else if (unit < 100) {
        return '0' + unit;
    } 
    return unit;
}