// Selecting DOM elements
const screens = document.querySelectorAll('.screen');
const chooseInsectBtn = document.querySelectorAll('.choose-insect-btn');
const startBtn = document.getElementById('start-btn');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');
const gameContainer = document.getElementById('game-container');

// Initializing variables
let seconds = 0;
let score = 0;
let selectedInsect = {};

// Event listener for the "Start Game" button
startBtn.addEventListener('click', () => screens[0].classList.add('up'));

// Event listeners for insect selection buttons
chooseInsectBtn.forEach((btn) =>
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    selectedInsect = { src, alt };
    screens[1].classList.add('up');
    setTimeout(createInsect, 1000);
    startGame();
  })
);

// Function to create an insect and add it to the game container
function createInsect() {
  const insect = document.createElement('div');
  insect.classList.add('insect');
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selectedInsect.src}" alt="${
    selectedInsect.alt
  }" style="transform: rotate(${Math.round(Math.random() * 360)}deg)">`;

  // Event listener for catching the insect
  insect.addEventListener('click', catchInsect);

  gameContainer.appendChild(insect);
}

// Function to start the game and update time every second
function startGame() {
  setInterval(increaseTime, 1000);
}

// Function to increase the time displayed
function increaseTime() {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  timeEl.innerHTML = `Time ${min}:${sec}`;
  seconds++;
}

// Function to get a random location within the window
function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

// Function to handle catching an insect
function catchInsect() {
  increaseScore();
  this.classList.add('caught');
  setTimeout(() => this.remove(), 2000);
  addInsects();
}

// Function to add new insects after a certain delay
function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

// Function to increase the score and show a message when reaching a certain score
function increaseScore() {
  score++;
  if (score > 19) {
    messageEl.classList.add('visible');
  }

  scoreEl.innerHTML = `Score: ${score}`;
}
