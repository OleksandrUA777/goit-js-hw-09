import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve,reject) => {
    setTimeout(() =>{
      if (shouldResolve) {
        resolve({position,delay})
      } else {
        reject({position,delay})
      }    },delay)
  })
  
}
const refs = {
  // button:document.querySelector('button'),
  form: document.querySelector('.form'),

  delayInp: document.querySelector('input[name="delay"'),
  stepInp: document.querySelector('input[name="step"'),
  amountInp: document.querySelector('input[name="amount"'),

}
refs.form.addEventListener('submit',submitFormHandler)

function submitFormHandler(event){
  event.preventDefault()

let amount = Number(refs.amountInp.value)
let delay = Number(refs.delayInp.value)
let step = Number(refs.stepInp.value)

for(let i = 1; i<= amount; i += 1){
  console.log('position: ', i)
  let position = i

  createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  delay += step
}


}