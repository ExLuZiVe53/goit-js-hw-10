import Notiflix from 'notiflix';

const elementForm = document.querySelector('form');
const submitBtn = document.querySelector('button[type="submit"]');

elementForm.addEventListener('submit', onClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`); // Fulfill
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`); // Reject
      }
    }, delay);
  });
}

function onClick(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    Notiflix.Report.failure(
      'You enter a negative number!',
      'Please enter valid value',
      {
        position: 'right-top',
        titleFontSize: '30px',
      }
    );
  } else {
    for (let i = 1; i <= amount.value; i += 1) {
      createPromise(i, Number(delay.value) + Number(step.value * (i - 1)))
        .then(message => {
          Notiflix.Notify.success(message);
        })
        .catch(message => {
          Notiflix.Notify.failure(message);
        });
      // delay.value += step.value;
    }
  }
}
