// Імпортуємо головну функцію getRandomHexColor
import { getRandomHexColor } from '../helpers/getRandomHexColor';

// Оголошуємо зміні та знаходимо іх кліки по вікну, та кнопкам
const body = document.querySelector('body');
const startBtn = document.querySelector('body button[data-start]');
const stopBtn = document.querySelector('body button[data-stop]');

// Встановлюємо прослуховувач подій на кнопку start, по події клік та передаємо колбек функцію
startBtn.addEventListener('click', onClick);
// Оголошуємо зміну colorChange та присвоюємо їй пустоту(null)
let colorChange = null;

// Створюємо функцію onClick та запускаємо таймер з інтервалом на 1сек
function onClick() {
  startBtn.setAttribute('disabled', 'true');

  colorChange = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
}

//Вішаємо прослуховувач подій на кнопку onClick
stopBtn.addEventListener('click', onStopClick);

// Зупиняємо створюємо функцію onStopClick, в якій зупиняємо наш інтервал, та робимо кнопку старт не активно
function onStopClick() {
  clearInterval(colorChange);
  startBtn.removeAttribute('disabled', 'true');
  startBtn.setAttribute('active', 'true');
}
