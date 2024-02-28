const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function handleCardClick(event) {
  if (lockBoard) return;
  const clickedCard = event.target;
  if (
    clickedCard.classList.contains("matched") ||
    clickedCard === firstCard ||
    clickedCard === secondCard
  ) {
    return;
  }

  // reveal the color of the clicked card
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    lockBoard = true;
    // check for a match
    if (secondCard.classList[0] === firstCard.classList[0]) {
      secondCard.classList.add("matched");
      firstCard.classList.add("matched");
      firstCard = null;
      secondCard = null;
      lockBoard = false; // unlock the board
      // check if all cards are matched
      if (document.querySelectorAll(".matched").length === COLORS.length) {
        setTimeout(() => {
          alert("Game Over: You Win!");
        }, 500);
      }
    } else {
      // if the colors don't match
      setTimeout(() => {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard = null;
        secondCard = null;
        lockBoard = false; // unlock the board
      }, 1000);
    }
  }
}

createDivsForColors(shuffledColors);
