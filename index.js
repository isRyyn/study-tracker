let display = document.getElementById("display");

var start = document.getElementById("start");
var reset = document.getElementById("reset");


let currentSec = 0;
let currentMin = 0;
let currentHour = 0;

var interval;
start.addEventListener("click", function () {

    interval = setInterval(function () {
        display.innerHTML = `${formatVal(currentHour)}: ${formatVal(currentMin)}: ${formatVal(currentSec)}`;
        updateTime();
    }, 1000);
});

function updateTime() {
    currentSec += 1;

    if (currentSec > 5) {
        currentSec = 0;
        currentMin += 1;

        if (currentMin > 5) {
            currentMin = 0;
            currentHour += 1;
        }
    }
}

reset.addEventListener("click", function () {
    clearInterval(interval);
    currentSec = 0;
    currentMin = 0;
    currentHour = 0;
    display.innerHTML = '00: 00: 00';
});

function formatVal(unit) {
    if (unit < 10) {
        return '0' + unit;
    } 
    return unit;
}