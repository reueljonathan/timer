'use strict';

const numberRegex = new RegExp('^([0-9]|[0-5][0-9])(\n|$)'); //Number between 0-59
const letterRegex = new RegExp('^([a-z]|[A-Z])$');
let second = 0;
let circle = document.getElementById("timer-circle");
let timer = document.getElementById("remaining-time");

function setup() {
  addInputFilters(document.getElementById('minutes'));
  addInputFilters(document.getElementById('seconds'));

  showControls();
}

function addInputFilters(inputElement) {
  inputElement.onkeydown = (event) => {
    if (letterRegex.test(event.key)) {
      event.preventDefault();
    }
  }

  inputElement.oninput = (event) => {
    const value = parseInt(event.target.value);

    if (value > 59) {
      event.target.value = 59;
    } else if (value < 0) {
      event.target.value = 0;
    }
  }
}

function startTimer() {
  const minutes = parseInt(document.getElementById('minutes').value);
  const seconds = parseInt(document.getElementById('seconds').value);
  let totalSeconds; 
  let remainingSeconds;
  
  if (!isNaN(minutes) && !isNaN(seconds)) {
    totalSeconds = minutes * 60 + seconds; 
    remainingSeconds = totalSeconds;
    timer.innerText = formatSeconds(totalSeconds);
    circle.style["stroke-dasharray"] = "1 1";

    showTimer();

    let loop = setInterval((t) => {
      remainingSeconds -= 1;

      circle.style["stroke-dasharray"] = (remainingSeconds / totalSeconds) + " 1";

      timer.innerText = formatSeconds(remainingSeconds);
      
      if (remainingSeconds === 0) {
        clearInterval(loop);
        showControls();
      }
    }, 1000);
  }
}

function showTimer() {
  document.getElementById('controls-container').style.top = '999px';
  document.getElementById('controls-container').style.opacity = 0;
  document.getElementById('timer-svg').style.top = 0;
  document.getElementById('timer-svg').style.opacity = 1;
  document.getElementById('remaining-timer-container').style.top = 'calc(50% - 50px)';
  document.getElementById('remaining-timer-container').style.opacity = 1;
}

function showControls() {
  document.getElementById('controls-container').style.top = 0;
  document.getElementById('controls-container').style.opacity = 1;
  document.getElementById('timer-svg').style.top = 999;
  document.getElementById('timer-svg').style.opacity = 0;
  document.getElementById('remaining-timer-container').style.top = '999px';
  document.getElementById('remaining-timer-container').style.opacity = 0;
}


function formatSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (minutes < 10 ? '0' : '') +
    minutes +
    ":" +
    (seconds < 10 ? '0' : '') +
    seconds;
}

setup();
