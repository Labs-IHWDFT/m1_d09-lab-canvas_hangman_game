class HangmanGame {
  constructor(words, canvas) {
    this.words = words;
    this.canvasWriter = new CanvasWriter(canvas);
    this.secretWord = "";
    this.lettersLeft = [];
    this.wrongLetters = [];
    this.maxErrors = 10;

    document.addEventListener("keydown", this.handleKeypress.bind(this));
  }

  start() {
    this.secretWord = this.pickWord();
    this.lettersLeft = this.getUniqueLetters(); // returns an array of unique letters in the secretWord
    this.wrongLetters = [];
    this.canvasWriter.init(this.secretWord.length);
  }

  handleKeypress(event) {
    if (
      this.checkIfLetter(event.keyCode) &&
      !this.checkLetterAlreadyClicked(event.key)
    ) {
      if (this.secretWord.includes(event.key)) {
        this.removeFromLettersLeft(event.key);
        const positions = this.secretWord
          .split("")
          .reduce((positions, letter, idx) => {
            if (letter === event.key) positions.push(idx);
            return positions;
          }, []);
        this.canvasWriter.drawCorrectLetter(event.key, positions);

        if (this.checkWinner()) {
          console.log("YOU WON!");
          this.canvasWriter.drawGameWon();
        }
      } else {
        this.addToWrongLetters(event.key);
        this.canvasWriter.drawWrongLetters(this.wrongLetters);
        this.canvasWriter.drawHangman(this.wrongLetters.length);
        if (this.checkGameOver()) {
          console.log("GAME OVER!");
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

  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90) return true;
    return false;
  }

  checkLetterAlreadyClicked(letter) {
    return this.wrongLetters.includes(letter);
  }

  removeFromLettersLeft(letter) {
    const indexOfLetter = this.lettersLeft.indexOf(letter);
    if (indexOfLetter !== -1) this.lettersLeft.splice(indexOfLetter, 1);
  }

  addToWrongLetters(letter) {
    this.wrongLetters.push(letter);
  }

  checkGameOver() {
    return this.wrongLetters.length >= this.maxErrors;
  }

  checkWinner() {
    return this.lettersLeft.length <= 0;
  }
}
