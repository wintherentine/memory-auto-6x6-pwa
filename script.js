const carImages = [
  "images/auto1.jpg","images/auto2.jpg","images/auto3.jpg","images/auto4.jpg",
  "images/auto5.jpg","images/auto6.jpg","images/auto7.jpg","images/auto8.jpg",
  "images/auto9.jpg","images/auto10.jpg","images/auto11.jpg","images/auto12.jpg",
  "images/auto13.jpg","images/auto14.jpg","images/auto15.jpg","images/auto16.jpg",
  "images/auto17.jpg","images/auto18.jpg"
];

let cards = [...carImages, ...carImages].sort(() => 0.5 - Math.random());
const board = document.getElementById("game-board");
let flipped = [];
let matched = [];

cards.forEach(src => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.src = src;

  const img = document.createElement("img");
  img.src = src;
  img.alt = "Auto";

  card.appendChild(img);
  card.addEventListener("click", flipCard);
  board.appendChild(card);
});

function flipCard() {
  if (flipped.length < 2 && !this.classList.contains("flipped") && !matched.includes(this)) {
    this.classList.add("flipped");
    flipped.push(this);

    if (flipped.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [a, b] = flipped;
  if (a.dataset.src === b.dataset.src) {
    matched.push(a, b);
  } else {
    a.classList.remove("flipped");
    b.classList.remove("flipped");
  }
  flipped = [];
  if (matched.length === cards.length) {
    setTimeout(() => alert("Fantastisch! 🎉 Je hebt alle auto's gevonden!"), 400);
  }
}
