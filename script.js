// add toggle for blinking seconds
const toggleBlink = document.getElementById('toggle-blink')

let blinkEnabled = true;

toggleBlink.addEventListener('click', () => {
blinkEnabled = !blinkEnabled;
toggleBlink.textContent = blinkEnabled ? "Turn Off" : "Turn On";
})

// clock
function setTime() {
  const clockElement = document.getElementById('clock');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  clockElement.innerHTML = blinkEnabled
  ? `${hours}<span class="blinking">${':'}</span>${minutes}`
  : `${hours} ${minutes}`;
}

setInterval(setTime, 1000);
setTime();

// service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Toggle the rotation setting icon
document.getElementById("settings-icon").addEventListener("click", function () {
  this.classList.toggle("rotated");  // Toggle the rotation class
});

// navbar toggle
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

// font style picker
let changingFontStyle = function (fontstyle) {
  document.getElementById("clock").style.fontFamily = fontstyle.value;
}

// font size slider
document.getElementById('slider').addEventListener('input', function () {
  document.getElementById('clock').style.fontSize = this.value + 'px';
});

// text color picker
function changeTextColor() {
  const textElement = document.getElementById('clock');
  const colorPicker = document.getElementById('colorPicker');
  textElement.style.color = colorPicker.value;
}

// background color picker
let colorInput = document.getElementById('colorInput');
colorInput.addEventListener('input', () => {
  document.body.style.backgroundColor = colorInput.value;
});

// background Image Picker
const filePicker = document.getElementById('filePicker');
const resetButton = document.getElementById('resetButton');

filePicker.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    // Read the selected image file
    reader.onload = (e) => {
      document.body.style.backgroundImage = `url(${e.target.result})`;
    };

    reader.readAsDataURL(file);
  }
});

// reset background image
resetButton.addEventListener('click', () => {
  document.body.style.backgroundImage = "";
  filePicker.value = ""; // Reset the file input
});

// about section toggle
const linkAbout = document.getElementsByClassName('linkAbout')[0]
const toggleAbout = document.getElementsByClassName('toggleAbout')[0]

linkAbout.addEventListener('click', () => {
  toggleAbout.classList.toggle('active')
})

// Font style change on scroll or drag
const clock = document.getElementById("clock");

// All your local font family names
const fonts = [
  "Azonix", "OpenSans", "TrenchThin", "Digital7Mono", "OrdinaryLove", "PegHoles", "chintzy",
  "chintzys", "DOTMATRI", "DOTMBold", "DS-DIGIB", "DS-DIGI", "MINECRAFTPE", "Sparks",
  "Okesip", "Roller", "Sextape", "RitaOfCascia", "Mockery", "HocusPocusFilled", "HocusPocusHollow",
  "HocusPocus", "Storycan", "Showthat", "BroshkLime", "Pasti", "Library3am", "DigitaltsLime",
  "Digitaltech", "InflammableAge", "DignityofLabour", "Minisystem", "HokjesgeestCubeLeft",
  "HokjesgeestCubeRight", "McGareyRegular", "Oslo", "Oslo_Bold", "Segment14", "ninepin",
  "HartingPlain", "LCD14", "Taurus-Mono-Outline", "AmericanStencil", "software_tester_7",
  "Dotrice", "repet", "UbuntuMono-R", "gabriele-d", "zig", "origa", "origap", "micrenc",
  "saxmono", "Hack", "FiraMono"
];


// let fontColorPicker = "#ffffff";

// function updateClockColor() {
//   textElement.style.color = `"${colors[fontColorPicker]}"`;
// }
 

// // arrowkey to change color
// document.addEventListener("keydown", (e) => {
//   if (e.key === "ArrowUp" || e.key === "ArrowRight") {
//     fontColorPicker = (fontColorPicker + 1) % colors.length;
//   } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
//     fontColorPicker = (fontColorPicker - 1 + colors.length) % colors.length;
//   }
// });


let fontIndex = 0;

function updateClockFont() {
  clock.style.fontFamily = `"${fonts[fontIndex]}"`;
}

// arrowkey to change font
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowRight") {
    fontIndex = (fontIndex + 1) % fonts.length;
  } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
    fontIndex = (fontIndex - 1 + fonts.length) % fonts.length;
  }
  updateClockFont();
});

// Scroll to change font
document.addEventListener("wheel", (e) => {
  e.preventDefault();
  fontIndex = (fontIndex + (e.deltaY > 0 ? 1 : -1) + fonts.length) % fonts.length;
  updateClockFont();
});

// Touch drag on mobile to change font
let touchStartX = null;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  if (touchStartX !== null) {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 30) {
      fontIndex = (fontIndex + (deltaX > 0 ? 1 : -1) + fonts.length) % fonts.length;
      updateClockFont();
    }

    touchStartX = null;
  }
});

updateClockFont(); // Initialize font on load

// Initialize Pickr
// Font color picker
const fontColorPickr = Pickr.create({
  el: '#fontColorPicker',
  theme: 'classic',
  default: '#CDDC39',
  swatches: [
    '#000000', '#ffffff', '#F44336', '#E91E63',
    '#2196F3', '#4CAF50', '#FF9800', '#FFEB3B',
    '#9C27B0', '#673AB7', '#FF5722', '#795548',
    '#607D8B', '#3F51B5', '#009688', '#CDDC39'
  ],
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      input: true,
      save: true
    }
  }
});

// Background color picker
const bgColorPickr = Pickr.create({
  el: '#bgColorPicker',
  theme: 'classic',
  default: '#000000',
  swatches: [
    '#000000', '#ffffff', '#3F51B5', '#009688',
    '#CDDC39', '#FF5722', '#795548', '#607D8B',
    '#F44336', '#E91E63', '#2196F3', '#4CAF50',
    '#FF9800', '#FFEB3B', '#FFBF52', '#673AB7'
  ],
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      input: true,
      save: true
      
    }
  }
});


// Add event listener to the color picker
document.getElementById('colorPicker').addEventListener('input', changeTextColor);

// Apply selected colors
fontColorPickr.on('change', (color) => {
  document.getElementById('clock').style.color = color.toHEXA().toString();
});

bgColorPickr.on('change', (color) => {
  document.body.style.backgroundColor = color.toHEXA().toString();
});


// for session storage blink state

// // add toggle for blinking seconds
// const toggleBlink = document.getElementById('toggle-blink')

// // add session storage 
// let blink =sessionStorage.getItem('blink');
// blink = blink === null ? true : blink === 'ture';
// // let blink = true;

// toggleBlink.textContent = blink ? "Turn Off" : "Turn On";

// toggleBlink.addEventListener('click', () => {
// blink = !blink;

// sessionStorage.setItem('blink', blink)

// toggleBlink.textContent = blink ? "Turn Off" : "Turn On";
// // setTime();
// })



// add date and day 
function dateDay() {
  const now = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[now.getDay()];

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const date = String(now.getDate()).padStart(2, '0');

  document.getElementById("day").textContent = dayName;
  document.getElementById("date").textContent = `${year}-${month}-${date}`;
  
  
}

dateDay();

// add toggle DateDay
const toggleDateDay = document.getElementById('toggle-dateDay')

let dateDayOn = true;

toggleDateDay.addEventListener('click', () => {
dateDayOn = !dateDayOn;
document.getElementById("dateDay").style.display = dateDayOn ? "" : "none";
toggleDateDay.textContent = dateDayOn ? "Turn Off" : "Turn On";
dateDayOn.innerHTML = dateDay;
})