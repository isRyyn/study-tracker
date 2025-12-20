let display = document.getElementById("display");

var start = document.getElementById("start");
var reset = document.getElementById("reset");


let miliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

var interval = null;
start.addEventListener("click", function () {
    if (interval !== null) {
        start.innerHTML = 'Start';
        clearInterval(interval);
        interval = null;

        return;
    }

    start.innerHTML = 'Stop';
    interval = setInterval(function () {
        updateTime();
        display.innerHTML = `${formatVal(hours)} : ${formatVal(minutes)} : ${formatVal(seconds)} : ${formatVal(miliseconds)}`;

    }, 10);
});

function updateTime() {
    miliseconds += 1;

    if (miliseconds > 99) {
        miliseconds = 0;
        seconds += 1;

        if (seconds > 59) {
            seconds = 0;
            minutes += 1;

            if (minutes > 59) {
                minutes = 0;
                hours += 1;
            }
        }
    }
}

reset.addEventListener("click", function () {
    start.innerHTML = 'Start';
    clearInterval(interval);
    interval = null;

    seconds = 0;
    minutes = 0;
    hours = 0;
    display.innerHTML = '00 : 00 : 00 : 00';
});

function formatVal(unit) {
    if (unit < 10) {
        return '0' + unit;
    }
    return unit;
}