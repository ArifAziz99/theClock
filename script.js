var clockEl = document.querySelector('#clock');

function getTime() {
  return new Date().toLocaleTimeString('en-US', 
     { hour12: false, hour: 'numeric', minute: 'numeric' }).toString();
}

function setTime() {
  var time = getTime();
  // check if the colon is there
  if (clockEl.innerText.split(':').length === 1) {
    // if it's not, set the actual time
    clockEl.innerText = time;
  } else {
    // if it is, remove the colon
    clockEl.innerText = time.split(':').join(' ');
  }
}

setInterval( setTime , 1000);
setTime();

if ('serviceWorker' in navigator){
navigator.serviceWorker.register('/sw.js');
}


/*function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

    
  if(hh > 12){
      session = "PM";
   }

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
   ss = (ss < 10) ? "0" + ss : ss;
    
   let time = hh + ":" + mm + ":" + ss + " ";

  document.getElementById("clock").innerText = time; 
  let t = setTimeout(function(){ currentTime() }, 1000); 

}

currentTime();*/
