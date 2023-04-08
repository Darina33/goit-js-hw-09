import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector(".form");

form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();

  let firstDelay = e.currentTarget.delay.valueAsNumber;
  const step = e.currentTarget.step.valueAsNumber;
  const amount = e.currentTarget.amount.valueAsNumber;;

  for (let i = 1; i <= amount; i++) {
    const position = i;
    createPromise(position, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}