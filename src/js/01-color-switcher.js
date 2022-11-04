const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');
let timerId = null;

btnStartRef.addEventListener('click', onButtonStart);
btnStopRef.addEventListener('click', onButtonStop);

disableStopButton();

function onButtonStart() {
  disableStartButton();
  setBodyColor();
  timerId = setInterval(setBodyColor, 1000);
}

function onButtonStop() {
  disableStopButton();
  clearInterval(timerId);
}

function disableStartButton() {
  btnStartRef.setAttribute('disabled', 'disabled');
  btnStopRef.removeAttribute('disabled');
}

function disableStopButton() {
  btnStopRef.setAttribute('disabled', 'disabled');
  btnStartRef.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase()}`;
}

function setBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
