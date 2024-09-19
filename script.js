function setTime() {
  const clockElement = document.getElementById('clock');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  clockElement.innerHTML = `${hours}<span class="blinking">${':'}</span>${minutes}`;
}

setInterval(setTime, 1000);
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

document.getElementById("settings-icon").addEventListener("click", function() {
  this.classList.toggle("rotated");  // Toggle the rotation class
}); 

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

const linkAbout = document.getElementsByClassName('linkAbout')[0]
const toggleH1 = document.getElementsByClassName('toggleH1')[0]

linkAbout.addEventListener('click', () => {
  toggleH1.classList.toggle('active')
})

// Function to change the text color based on the selected color
function changeTextColor() {
  const textElement = document.getElementById('clock');
  const colorPicker = document.getElementById('colorPicker');
  textElement.style.color = colorPicker.value;
}


// Add event listener to the color picker
document.getElementById('colorPicker').addEventListener('input', changeTextColor);


//font size slider
 document.getElementById('slider').addEventListener('input', function() {
            document.getElementById('clock').style.fontSize = this.value + 'px';
        });