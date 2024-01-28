"use strict";
const player01 = document.querySelector(".player--0");
const player02 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const diceHidden = document.querySelector(".dice");
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");

//Starting condition

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function () {
  diceHidden.classList.add("hidden");
  score0.textContent = 0;
  score1.textContent = 0;
  playing = true;
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player01.classList.remove("player--winner");
  player02.classList.remove("player--winner");
  player01.classList.add("player--active");
  player02.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // playerPlaying.classList.add;
  player01.classList.toggle("player--active");
  player02.classList.toggle("player--active");
};
//Rolling dice function

rollDice.addEventListener("click", function () {
  if (playing) {
    const diceNo = Math.trunc(Math.random() * 6 + 1);

    diceHidden.classList.remove("hidden");
    diceHidden.src = `img/dice-${diceNo}.png`;
    //Check if dice has 1 or not
    if (diceNo !== 1) {
      // add score to current score
      currentScore += diceNo;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

hold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      diceHidden.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener("click", init);
