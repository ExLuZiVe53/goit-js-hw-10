import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs } from '../helpers/convertMs';

const refs = {
  inputText: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
};

let changeDays = 0;
refs.startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date() || selectedDates[0] === new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });

      refs.startBtn.setAttribute('disabled', 'true');
    } else {
      refs.startBtn.removeAttribute('disabled', 'true');
      refs.startBtn.setAttribute('active', 'true');
      refs.inputText.setAttribute('disabled', 'true');
      changeDays = selectedDates[0];
    }
  },
};

flatpickr(refs.inputText, options);

refs.startBtn.addEventListener('click', onClick);

function onClick() {
  const targetDates = changeDays;

  setInterval(() => {
    const currentDate = new Date();
    const ms = Number(targetDates - currentDate);
    if (ms > 0) {
      refs.startBtn.setAttribute('disabled', 'true');
      substitutionOfzero(convertMs(ms)), 1000;
    } else {
      refs.inputText.removeAttribute('disabled', 'true');
    }
  });

  function substitutionOfzero(value) {
    const values = Object.values(value);

    refs.day.textContent = values[0].toString().padStart(2, '0');
    refs.hour.textContent = values[1].toString().padStart(2, '0');
    refs.minute.textContent = values[2].toString().padStart(2, '0');
    refs.second.textContent = values[3].toString().padStart(2, '0');
  }
}
