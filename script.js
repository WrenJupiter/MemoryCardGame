const gameContainer = document.getElementById("game");
let card1 = null;
//first card clicked
let card2 = null;
//second card clicked
let cardsFlipped = 0;
//start with no cards turned over
let noClick = false;

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
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in array
  while (counter > 0) {
    // random number
    let index = Math.floor(Math.random() * counter);
    counter--;
    //count down
    // swap last element
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
//so that everytime a new game starts cards are in a random place
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

// TODO: Implement this function!
function handleCardClick(e) {
  if (noClick) return;
  if (e.target.classList.contains('flipped')) return;
  // you can use event.target to see which element was clicked
  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];
  //style the flipped over card

  if(!card1 || !card2) {
    currentCard.classList.add('flipped')
    card1 = card1 || currentCard
    card2 = currentCard === card1 ? null : currentCard;
  }

  if(card1 && card2) {
    noClick = true;
  }

  if (card1 && card2) {
    noClick = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClick = false;
      //if they match dont reflip
    } else {
      setTimeout(function flip () {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClick = false;
        //if they dont match make them stay flipped for a sec and flip back over
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("game over!");
  //if all the cards match its done
}

// when the DOM loads
createDivsForColors(shuffledColors);
