import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


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
const refs = {
    button: document.querySelector('button'),
    span: document.querySelector('.value'), 

    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.button.addEventListener('click',buttonClickHandler)
refs.button.setAttribute('disabled','')

const flatpicker = flatpickr("#datetime-picker",{ 
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
  
  const dateNow = Date.now()
  const chosenDate = selectedDates[0].getTime()
  
if(dateNow > chosenDate){
    Notiflix.Notify.failure('Please choose a date in the future')
    refs.button.setAttribute('disabled','')
    return
}
refs.button.removeAttribute('disabled')
    },
  })

function buttonClickHandler(){
refs.button.setAttribute('disabled','')
const timer = setInterval(() =>{
  const chosenDate = flatpicker.selectedDates[0].getTime()
  const dateNow = Date.now()

  if(dateNow > chosenDate){
    return
  }
  const timeToDate = chosenDate - dateNow
  const timeToDateMs = convertMs(timeToDate)
 
  renderTimer(timeToDateMs)
       
   },1000)
}
function addLeadingZero(value){
    return String(value).padStart(2, '0');
} 
function renderTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }
