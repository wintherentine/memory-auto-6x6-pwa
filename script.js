const board = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const attemptsDisplay = document.getElementById("attempts");

let flipped = [];
let matched = [];
let cards = [];
let attempts = 0;

function initGame() {
  const values = [];
  for (let i = 1; i <= 18; i++) values.push(i);
  cards = [...values, ...values].sort(() => 0.5 - Math.random());

  board.innerHTML = "";
  flipped = [];
  matched = [];
  attempts = 0;
  attemptsDisplay.textContent = "Aantal pogingen: 0";

  cards.forEach(value => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = "url('images/back.jpg')";
    card.dataset.value = value;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (flipped.length < 2 && !this.classList.contains("flipped") && !matched.includes(this)) {
    this.classList.add("flipped");
    this.style.backgroundImage = `url('images/${this.dataset.value}.jpg')`;
    flipped.push(this);

    if (flipped.length === 2) {
      attempts++;
      attemptsDisplay.textContent = "Aantal pogingen: " + attempts;
      setTimeout(checkMatch, 1500);
    }
  }
}

function checkMatch() {
  const [a, b] = flipped;
  if (a.dataset.value === b.dataset.value) {
    matched.push(a, b);
  } else {
    a.classList.remove("flipped");
    b.classList.remove("flipped");
    a.style.backgroundImage = "url('images/back.jpg')";
    b.style.backgroundImage = "url('images/back.jpg')";
  }
  flipped = [];

  if (matched.length === cards.length) {
    setTimeout(() => {
      alert("Fantastisch! 🎉 Je hebt alle paren gevonden in " + attempts + " pogingen!");
    }, 300);
  }
}

resetButton.addEventListener("click", initGame);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

initGame();