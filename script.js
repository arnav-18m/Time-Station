const clockDisplay = document.getElementById('clock-display');

const stopwatchDisplay = document.getElementById('stopwatch-display');
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchPauseBtn = document.getElementById('stopwatch-pause');
const stopwatchResetBtn = document.getElementById('stopwatch-reset');

const timerDisplay = document.getElementById('timer-display');
const timerInput = document.getElementById('timer-input');
const timerMessage = document.getElementById('timer-message');
const timerStartBtn = document.getElementById('timer-start');
const timerPauseBtn = document.getElementById('timer-pause');
const timerResetBtn = document.getElementById('timer-reset');

let stopwatchSeconds = 0;
let stopwatchInterval = null;

let timerSeconds = 0;
let timerInterval = null;

function padZero(number) {
    return number < 10 ? '0' + number : number;
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    clockDisplay.textContent = padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds) + ' ' + ampm;
}

function startStopwatch() {
    if (stopwatchInterval === null) {
        stopwatchInterval = setInterval(function() {
            stopwatchSeconds++;
            stopwatchDisplay.textContent = formatTime(stopwatchSeconds);
        }, 1000);
    }
}

function pauseStopwatch() {
    if (stopwatchInterval !== null) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
}

function resetStopwatch() {
    pauseStopwatch();
    stopwatchSeconds = 0;
    stopwatchDisplay.textContent = formatTime(stopwatchSeconds);
}

function startTimer() {
    if (timerInterval === null) {
        if (timerSeconds <= 0) {
            const inputValue = parseInt(timerInput.value, 10);
            if (isNaN(inputValue) || inputValue <= 0) {
                return;
            }
            timerSeconds = inputValue;
            timerInput.value = '';
        }

        timerMessage.classList.add('hidden');
        timerInput.disabled = true;
        timerDisplay.textContent = formatTime(timerSeconds);

        timerInterval = setInterval(function() {
            timerSeconds--;
            timerDisplay.textContent = formatTime(timerSeconds);

            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                timerSeconds = 0;
                timerMessage.classList.remove('hidden');
                timerInput.disabled = false;
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    pauseTimer();
    timerSeconds = 0;
    timerInput.value = '';
    timerInput.disabled = false;
    timerMessage.classList.add('hidden');
    timerDisplay.textContent = formatTime(timerSeconds);
}

setInterval(updateClock, 1000);
updateClock();

stopwatchStartBtn.addEventListener('click', startStopwatch);
stopwatchPauseBtn.addEventListener('click', pauseStopwatch);
stopwatchResetBtn.addEventListener('click', resetStopwatch);

timerStartBtn.addEventListener('click', startTimer);
timerPauseBtn.addEventListener('click', pauseTimer);
timerResetBtn.addEventListener('click', resetTimer);
