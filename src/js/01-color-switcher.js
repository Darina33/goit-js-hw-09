const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');


startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);

let timerId = null;

function startChangeColor() {
    if (stopBtn.disabled)
        timerId = setInterval(changeColor, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function stopChangeColor() {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function changeColor(e) {
    document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}