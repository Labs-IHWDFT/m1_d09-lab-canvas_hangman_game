console.log("Javascript enabled, starting the game");

const wordsPool = [
  "node",
  "javascript",
  "react",
  "express",
  "miami",
  "paris",
  "amsterdam",
  "lisboa",
  "barcelona",
  "madrid",
  "dusseldorf",
  "bordeaux",
];

const hangmanCanvas = document.getElementById("hangman");

const hangmanGame = new HangmanGame(wordsPool, hangmanCanvas);

const startGameButton = document.getElementById("start-game-button");

if (startGameButton) {
  startGameButton.addEventListener("click", (event) => {
    hangmanGame.start();
    startGameButton.innerText = "RESTART";
  });
}

document.addEventListener("keydown", hangmanGame.handleKeypress);
