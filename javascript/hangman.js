class HangmanGame {
  constructor(words, canvas) {
    this.words = words;
    this.secretWord = "";
    this.lettersLeft = [];
    this.wrongLetters = [];
    this.canvasWriter = new CanvasWriter(canvas);
    this.maxErrors = this.canvasWriter.maxErrors;
    this.isGameOn = false;
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  start() {
    this.secretWord = this.pickWord();
    this.lettersLeft = this.getUniqueLetters(); // returns an array of unique letters in the secretWord
    this.wrongLetters = [];
    this.canvasWriter.init(this.secretWord.length);
    this.isGameOn = true;
  }

  handleKeypress(event) {
    if (
      this.isGameOn &&
      this.isLetter(event.keyCode) &&
      !this.isAlreadyClicked(event.key)
    ) {
      if (this.secretWord.includes(event.key)) {
        this.removeGuessedLetter(event.key);
        const positions = this.secretWord
          .split("")
          .reduce((positions, letter, idx) => {
            if (letter === event.key) positions.push(idx);
            return positions;
          }, []);
        this.canvasWriter.drawCorrectLetter(event.key, positions);

        if (this.checkWinner()) {
          console.log("YOU WON!");
          this.isGameOn = false;
          this.canvasWriter.drawGameWon();
        }
      } else {
        this.addWrongLetter(event.key);
        this.canvasWriter.drawWrongLetter(event.key, this.wrongLetters.length);
        this.canvasWriter.drawHangman(this.wrongLetters.length);
        if (this.checkGameOver()) {
          console.log("GAME OVER!");
          this.isGameOn = false;
          this.canvasWriter.drawGameOver();
        }
      }
    }
  }

  pickWord() {
    const secretWord =
      this.words[Math.floor(Math.random() * this.words.length)];
    console.log(secretWord);
    return secretWord;
  }

  getUniqueLetters() {
    return this.secretWord.split("").reduce((uniques, letter) => {
      if (!uniques.includes(letter)) uniques.push(letter);
      return uniques;
    }, []);
  }

  isLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90) return true;
    return false;
  }

  isAlreadyClicked(letter) {
    return this.wrongLetters.includes(letter);
  }

  removeGuessedLetter(letter) {
    const indexOfLetter = this.lettersLeft.indexOf(letter);
    if (indexOfLetter !== -1) this.lettersLeft.splice(indexOfLetter, 1);
  }

  addWrongLetter(letter) {
    this.wrongLetters.push(letter);
  }

  checkGameOver() {
    return this.wrongLetters.length >= this.maxErrors;
  }

  checkWinner() {
    return this.lettersLeft.length <= 0;
  }
}
