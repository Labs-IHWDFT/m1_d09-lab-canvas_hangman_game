class Hangman {
  constructor(words) {
    this.words = words;
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
    this.secretWord = this.pickWord();
  }

  pickWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90) return true;
    return false;
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
  }

  checkGameOver() {
    return this.errorsLeft < 1;
  }

  checkWinner() {
    if (this.secretWord.length === this.guessedLetters.length) return true;
    return false;
    // return this.secretWord.split('').every(character => this.guessedLetters.includes(character));
  }
}

let hangman;

const startGameButton = document.getElementById("start-game-button");

if (startGameButton) {
  startGameButton.addEventListener("click", (event) => {
    hangman = new Hangman([
      "node",
      "javascript",
      "react",
      "miami",
      "paris",
      "amsterdam",
      "lisboa",
    ]);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
    hangmanCanvas.drawLines();
  });
}

document.addEventListener("keydown", (event) => {
  // React to user pressing a key
  if (hangman.checkIfLetter(event.keyCode)) {
    if (hangman.secretWord.includes(event.key)) {
      let index = hangman.secretWord.indexOf(event.key);
      hangmanCanvas.writeCorrectLetter(index);

      if (hangman.checkWinner()) {
        hangmanCanvas.winner();
      } else {
        hangman.addWrongLetter(event.key);
        hangmanCanvas.writeWrongLetter(hangman.letters, hangman.errorsLeft);

        if (hangman.checkGameOver()) {
          hangmanCanvas.gameOver();
        }
      }
    }
  }
});
