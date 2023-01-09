function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

 const startBtnRef = document.querySelector('button[data-start]')
 const stopBtnRef = document.querySelector('button[data-stop]')
 const bodyRef = document.querySelector('body')

 startBtnRef.addEventListener('click',buttonStartClickHandler)
 stopBtnRef.addEventListener('click',buttonStopClickHandler)


let intervalId = null
stopBtnRef.setAttribute('disabled','')


 function buttonStartClickHandler(event){
   startBtnRef.setAttribute('disabled','')
   stopBtnRef.removeAttribute('disabled','')

     intervalId = setInterval(() =>{
    bodyRef.style.backgroundColor = getRandomHexColor()

    },1000) 
 }
 function buttonStopClickHandler(event){
    clearInterval(intervalId)

    startBtnRef.removeAttribute('disabled','')
    stopBtnRef.setAttribute('disabled','')
 }