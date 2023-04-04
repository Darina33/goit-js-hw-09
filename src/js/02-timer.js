import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.getElementById('datetime-picker');
const btn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const fp = flatpickr(input, options);

let timerId = null;

input.addEventListener('input', activeBtn)
btn.addEventListener('click', activeTimer)

function activeBtn() {
    if (fp.selectedDates[0] < new Date()) {
        Notify.warning("Please choose a date in the future", {
            position: 'center-center'
        })
    } else {
        btn.disabled = false;
    }
}

function activeTimer() {
        timerId = setInterval(countDownTime, 1000);
}

function countDownTime() {
    const now = new Date();
    const diff = fp.selectedDates[0] - now;
    const date = convertMs(diff);
    
    days.textContent = date.days;
    hours.textContent = addLeadingZero(date.hours);
    minutes.textContent = addLeadingZero(date.minutes);
    seconds.textContent = addLeadingZero(date.seconds);

    if (diff < 1000)
        clearInterval(timerId);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
    
}

