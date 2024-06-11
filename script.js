let clock = document.querySelector('#clock');

function getTime() {
  return new Date().toLocaleTimeString('en-US', 
     { hour12: false, hour: 'numeric', minute: 'numeric' }).toString();
}

function setTime() {
  let time = getTime();
  // check if the colon is there
  if (clock.innerText.split(':').length === 1) {
    // if it's not, set the actual time
    clock.innerText = time;
  } else {
    // if it is, remove the colon
    clock.innerText = time.split(':').join(' ');
  }
}

setInterval( setTime , 1000);
setTime();


if ('serviceWorker' in navigator){
navigator.serviceWorker.register('/sw.js');
}


let colorInput = document.getElementById('colorInput');
colorInput.addEventListener('input', () =>{
  document.body.style.backgroundColor = colorInput.value;
});


let changingFontStyle = function (fontstyle) {
  document.getElementById("clock").style.fontFamily = fontstyle.value;
}
