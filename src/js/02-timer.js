import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const UPDATE_INTERVAL = 1000;
const refs = {
  inputField: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysRef: document.querySelector('[data-days]'),
  hoursRef: document.querySelector('[data-hours]'),
  minutesRef: document.querySelector('[data-minutes]'),
  secondsRef: document.querySelector('[data-seconds]'),
};

refs.startButton.addEventListener('click', onStartButtonClick);

disableStartButton();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,

  onClose(data) {
    if (data[0] < Date.now()) {
      notifyFailure();
      return;
    }
    refs.startButton.removeAttribute('disabled');
    refs.startButton.style.backgroundColor = 'greenyellow';
  },
};

const fp = flatpickr(refs.inputField, options);

const countdown = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    disableStartButton();
    this.isActivev = true;

    const selectedDate = fp.selectedDates[0].getTime();

    function updateClockLook() {
      let startTime = Date.now();
      let deltaTime = selectedDate - startTime;
      let { days, hours, minutes, seconds } = convertMs(deltaTime);
      refs.daysRef.textContent = days;
      refs.hoursRef.textContent = hours;
      refs.minutesRef.textContent = minutes;
      refs.secondsRef.textContent = seconds;
    }
    updateClockLook();

    this.intervalId = setInterval(() => {
      startTime = Date.now();
      deltaTime = selectedDate - startTime;
      let { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateClockLook();

      if (
        days === '00' &&
        hours === '00' &&
        minutes === '00' &&
        seconds === '00'
      ) {
        clearInterval(this.intervalId);
      }
    }, UPDATE_INTERVAL);
  },
};

// ========================================================

function onStartButtonClick() {
  countdown.start();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let days = Math.floor(ms / day);
  if (days < 10) {
    days = addLeadingZero(days);
  } else {
    days = String(days);
  }

  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function disableStartButton() {
  refs.startButton.setAttribute('disabled', 'disabled');
  refs.startButton.style.backgroundColor = 'aliceblue';
}

function notifyFailure() {
  Notify.failure('Please choose a date in the future!', {
    timeout: 2000,
  });
}
