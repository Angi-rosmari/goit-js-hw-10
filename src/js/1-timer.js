import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let timeRange;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onReady: function (selectedDates, dateStr, instance) {
    instance.input.value = 'Select date';
  },

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeRange = userSelectedDate.getTime() - new Date().getTime();

    if (timeRange <= 0) {
      startButton.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'center',
        backgroundColor: 'red',
        timeout: 3000,
        messageSize: '20',
        messageLineHeight: '55',
      });
    } else {
      startButton.disabled = false;
      return userSelectedDate;
    }
    return timeRange;
  },
};

flatpickr('#datetime-picker', options).calendarContainer.style.width = '320px';

const dayValues = document.querySelector('[data-days]');
const hourValues = document.querySelector('[data-hours]');
const minuteValues = document.querySelector('[data-minutes]');
const secondValues = document.querySelector('[data-seconds]');
const startButton = document.querySelector('button');
const inputArea = document.querySelector('#datetime-picker');

startButton.addEventListener('click', evt);

function evt() {
  if (userSelectedDate) {
    inputArea.disabled = true;
    startButton.disabled = true;

    const intervalID = setInterval(toCountSeconds, 1000);

    function toCountSeconds() {
      const timerValues = convertMs(timeRange);
      timeRange = timeRange - 1000;
      dayValues.textContent = timerValues.days.toString().padStart(2, '0');
      hourValues.textContent = timerValues.hours.toString().padStart(2, '0');
      minuteValues.textContent = timerValues.minutes
        .toString()
        .padStart(2, '0');
      secondValues.textContent = timerValues.seconds
        .toString()
        .padStart(2, '0');
      if (timeRange <= 0) {
        clearInterval(intervalID);
        inputArea.disabled = false;
        flatpickr('#datetime-picker', options).calendarContainer.style.width =
          '320px';
      }
    }
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
