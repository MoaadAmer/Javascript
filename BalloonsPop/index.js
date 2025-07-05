window.addEventListener("load", start);
const gBalloons = [
  {
    bottom: 0,
    speed: 0,
  },
  {
    bottom: 0,
    speed: 0,
  },
];

function start() {
  const balloons = document.querySelectorAll(".balloon");
  balloons.forEach((balloon, index) => {
    makeBallonAlive(balloon, index);
  });
}
function makeBallonAlive(balloon, index) {
  addAnimation();
  addAudio();
  function addAudio() {
    balloon.addEventListener("click", () => {
      handleBallonClick();
      balloon.removeEventListener("click", handleBallonClick);
    });

    function handleBallonClick() {
      const audio = new Audio("./assets/pop.wav");
      audio.play();
      fadeOut(balloon);
    }
  }
  function fadeOut(balloon) {
    let opacity;
    const intervalId = setInterval(() => {
      opacity = parseFloat(balloon.style.opacity || "1");
      opacity -= 0.007;
      balloon.style.opacity = opacity;
    }, 0.5);

    if (opacity < 0.1) {
      clearInterval(intervalId);
      balloon.style.display = "none";
    }
  }
  function addAnimation() {
    let top = parseInt(balloon.style.top || "100");
    console.log(`top : ${top}`);
    setTimeout(() => {
      setInterval(() => {
        if (top <= 10) {
          top = 100;
        }
        top--;
        balloon.style.top = `${top}px`;
        console.log(top);
      }, 100);
    }, index * 500);
  }
}
