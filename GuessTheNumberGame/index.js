let iteration = 0;

function startGame() {
  const startNewGameBtn = document.querySelector("#startNewGame");
  startNewGameBtn.style.visibility = "hidden";

  const random = getRandomNumber(1, 100);
  const button = getSubmitButton();
  button.addEventListener("click", () => {
    const userInput = document.querySelector("#userInput").value;
    if (userInput) {
      handleButtonClick(random, userInput);
    } else {
      alert("enter a number between 1 and 100 (inclusive)");
    }
  });
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleButtonClick(random, userInput) {
  const diff = Math.abs(random - userInput);
  if (diff !== 0) {
    if (diff > 10) {
      if (userInput > random) {
        displayMessage("Last guess was too high!", "red");
      } else {
        displayMessage("Last guess was too low!", "red");
      }
    } else {
      if (userInput > random) {
        displayMessage("Last guess was high!", "red");
      } else {
        displayMessage("Last guess was low!", "red");
      }
    }
  } else {
    displayMessage("Congratulations! You got it right!", "green");
    getSubmitButton().disabled = true;
    displayStartNewGameButton();
    return;
  }
  const guesses = document.querySelector("#guesses");
  guesses.textContent += ` ${userInput}`;
  iteration++;
  if (iteration == 10) {
    displayMessage("Game over!!", "red");
    getSubmitButton().disabled = true;
    displayStartNewGameButton();
  }
}

function displayMessage(message, backgroundClass) {
  const result = document.querySelector("#result");
  result.className = "";
  result.classList.add(backgroundClass);
  result.textContent = message;
}

function displayStartNewGameButton() {
  const startNewGameBtn = document.querySelector("#startNewGame");
  startNewGameBtn.style.visibility = "visible";
}

function getSubmitButton() {
  return document.querySelector("#submitResult");
}

startGame();
