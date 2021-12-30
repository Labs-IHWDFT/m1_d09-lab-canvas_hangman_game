class CanvasWriter {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.maxErrors = 10;
  }

  init(wordLength) {
    this.clearBoard();
    this.drawStartBoard(wordLength);
  }

  clearBoard() {
    this.context.clearRect(0, 0, 1200, 800);
  }

  drawStartBoard(wordLength) {
    this.context.beginPath();
    this.context.moveTo(500, 175);
    this.context.lineTo(500, 100);
    this.context.lineTo(150, 100);
    this.context.lineTo(150, 650);
    this.context.lineTo(100, 700);
    this.context.lineTo(200, 700);
    this.context.lineTo(150, 650);
    this.context.moveTo(250, 700);
    for (let i = 0; i < wordLength; i++) {
      this.context.lineTo(300 + 60 * i, 700);
      this.context.moveTo(300 + 60 * i + 10, 700);
    }
    this.context.lineWidth = 4;
    this.context.stroke();
  }

  drawCorrectLetter(letter, positions) {
    console.log(positions);
    letter = letter.toUpperCase();
    this.context.font = "40px Georgia";
    for (const position of positions) {
      this.context.fillText(
        letter,
        260 + 50 * position + 10 * position,
        680,
        50
      );
    }
  }

  drawWrongLetters(letters) {
    this.context.font = "40px Georgia";
    const totRows = this.maxErrors / 2;
    for (let i = 0; i < letters.length; i++) {
      let row = Math.floor(i / totRows);
      let col = i % totRows;
      this.context.fillText(
        letters[i].toUpperCase(),
        1000 - 60 * col,
        300 + 200 * row,
        50
      );
    }
  }

  drawHangman(errors) {
    switch (errors) {
      case 1:
        this.context.beginPath();
        this.context.arc(500, 225, 50, 0, Math.PI * 2);
        this.context.closePath();
        this.context.stroke();
        break;
      case 2:
        this.context.moveTo(500, 275);
        this.context.lineTo(500, 425);
        this.context.stroke();
        break;
      case 3:
        this.context.lineTo(450, 500);
        this.context.stroke();
        break;
      case 4:
        this.context.lineTo(420, 500);
        this.context.stroke();
        break;
      case 5:
        this.context.moveTo(500, 425);
        this.context.lineTo(550, 500);
        this.context.stroke();
        break;
      case 6:
        this.context.lineTo(580, 500);
        this.context.stroke();
        break;
      case 7:
        this.context.moveTo(500, 330);
        this.context.lineTo(430, 330);
        this.context.stroke();
        break;
      case 8:
        this.context.lineTo(570, 330);
        this.context.stroke();
        break;
      case 9:
        this.context.beginPath();
        this.context.arc(485, 210, 5, 0, Math.PI * 2);
        this.context.closePath();
        this.context.stroke();
        this.context.beginPath();
        this.context.arc(515, 210, 5, 0, Math.PI * 2);
        this.context.closePath();
        this.context.stroke();
        this.context.moveTo(485, 245);
        this.context.lineTo(515, 245);
        this.context.stroke();
        break;
      case 10:
      default:
        this.context.font = "30px Arial";
        this.context.clearRect(470, 190, 60, 40);
        this.context.fillText("x", 479, 217);
        this.context.fillText("x", 509, 217);
        break;
    }
  }

  drawGameOver() {
    const gameOverImg = new Image();
    gameOverImg.addEventListener("load", () => {
      this.context.drawImage(gameOverImg, 200, 300);
    });
    gameOverImg.src = "./images/gameover.png";
  }

  drawGameWon() {
    const gameWonImg = new Image();
    gameWonImg.addEventListener("load", () => {
      this.context.drawImage(gameWonImg, 0, 0);
    });
    gameWonImg.src = "./images/awesome.png";
  }
}
