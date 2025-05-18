// clock
function setTime() {
  const clockElement = document.getElementById('clock');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  clockElement.innerHTML = `${hours}<span class="blinking">${':'}</span>${minutes}`;
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

let fontIndex = 0;

function updateClockFont() {
  clock.style.fontFamily = `"${fonts[fontIndex]}"`;
}

// Scroll to change font
clock.addEventListener("wheel", (e) => {
  e.preventDefault();
  fontIndex = (fontIndex + (e.deltaY > 0 ? 1 : -1) + fonts.length) % fonts.length;
  updateClockFont();
});

// Touch drag on mobile to change font
let touchStartX = null;

clock.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

clock.addEventListener("touchend", (e) => {
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
  default: '#ffffff',
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
