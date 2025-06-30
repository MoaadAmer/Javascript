let guessCount;
let random;

const submitGuessBtn = document.querySelector("#submitGuess");
const userInput = document.querySelector("#userInput");

const guesses = document.querySelector("#guesses");
const currentResult = document.querySelector("#currentResult");
const indicator = document.querySelector("#indicator");

const startNewGameBtn = document.querySelector("#startNewGame");

function startGame() {
  resetState();

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  });

  submitGuessBtn.addEventListener("click", () => {
    handleUserInput();
  });
  startNewGameBtn.addEventListener("click", () => {
    resetState();
  });
}

function handleUserInput() {
  const userGuessNumber = Number(userInput.value);
  if (userGuessNumber > 0 && userGuessNumber < 101) {
    handleButtonClick(userGuessNumber);
    userInput.value = "";
  } else {
    alert("enter a number between 1 and 100 (inclusive)");
  }
}

function resetState() {
  guessCount = 1;
  random = getRandomNumber(1, 100);
  userInput.value = "";
  userInput.disabled = false;
  submitGuessBtn.disabled = false;

  currentResult.className = "";
  for (const p of document.querySelectorAll(".gameStatus p")) {
    p.textContent = "";
  }

  startNewGameBtn.style.display = "none";
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleButtonClick(userInputNumber) {
  if (guessCount === 1) {
    guesses.textContent = "Presvious guesses";
  }
  guesses.textContent += ` ${userInputNumber}`;
  const diff = Math.abs(random - userInputNumber);
  if (diff !== 0) {
    currentResult.textContent = "Wrong";
    currentResult.className = "red";
    if (diff > 10) {
      if (userInputNumber > random) {
        indicator.textContent = "Last guess was too high!";
      } else {
        indicator.textContent = "Last guess was too low!";
      }
    } else {
      if (userInputNumber > random) {
        indicator.textContent = "Last guess was high!";
      } else {
        indicator.textContent = "Last guess was low!";
      }
    }
  } else {
    currentResult.textContent = "Congratulations! You got it right!";
    currentResult.className = "green";
    gameOver();
    return;
  }
  if (guessCount == 10) {
    currentResult.textContent = "Game over!!";
    gameOver();
  }
  guessCount++;
}

function gameOver() {
  submitGuessBtn.disabled = true;
  userInput.disabled = true;

  indicator.textContent = "";

  startNewGameBtn.style.display = "block";
}

startGame();
