let iteration = 0;
let random;

function startGame() {
  reset();

  getSubmitButton().addEventListener("click", () => {
    const userInput = document.querySelector("#userInput").value;
    if (userInput) {
      handleButtonClick(random, userInput);
    } else {
      alert("enter a number between 1 and 100 (inclusive)");
    }
  });
  getStartNewGameBtn().addEventListener("click", () => {
    reset();
  });
}

function reset() {
  iteration = 0;
  random = getRandomNumber(1, 100);
  console.log(random);
  getSubmitButton().disabled = false;
  const guesses = getGuessesPargraph();
  guesses.textContent = "Previous guesses:";
  guesses.style.display = "none";
  getResultParagraph().style.display = "none";
  getIndicatorParagraph().style.display = "none";
  getStartNewGameBtn().style.display = "none";
}

function getIndicatorParagraph() {
  return document.querySelector("#indicator");
}

function getStartNewGameBtn() {
  return document.querySelector("#startNewGame");
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleButtonClick(random, userInput) {
  const diff = Math.abs(random - userInput);
  if (diff !== 0) {
    setResult("Wrong", "red");
    if (diff > 10) {
      if (userInput > random) {
        setIndicator("Last guess was too high!");
      } else {
        setIndicator("Last guess was too low!");
      }
    } else {
      if (userInput > random) {
        setIndicator("Last guess was high!");
      } else {
        setIndicator("Last guess was low!");
      }
    }
  } else {
    setResult("Congratulations! You got it right!", "green");
    getSubmitButton().disabled = true;
    displayStartNewGameButton();
    return;
  }
  addGuess(userInput);
  iteration++;
  if (iteration == 10) {
    setResult("Game over!!", "red");
    setIndicator("");
    getSubmitButton().disabled = true;
    displayStartNewGameButton();
  }
}

function addGuess(userInput) {
  const guesses = getGuessesPargraph();
  guesses.style.display = "block";
  guesses.textContent += ` ${userInput}`;
}

function setResult(message, backgroundClass) {
  const result = getResultParagraph();
  result.textContent = message;
  result.className = backgroundClass;
  result.style.display = "block";
}

function getGuessesPargraph() {
  return document.querySelector("#guesses");
}

function setIndicator(message, backgroundClass) {
  const indicator = getIndicatorParagraph();
  indicator.style.display = "block";
  indicator.className = backgroundClass;
  indicator.textContent = message;
}

function getResultParagraph() {
  return document.querySelector("#result");
}

function displayStartNewGameButton() {
  const startNewGameBtn = document.querySelector("#startNewGame");
  startNewGameBtn.style.display = "block";
}

function getSubmitButton() {
  return document.querySelector("#submitResult");
}

startGame();
