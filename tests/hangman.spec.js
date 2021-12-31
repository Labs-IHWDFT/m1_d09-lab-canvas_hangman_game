// window.jasmine.getEnv().randomizeTests(false);
window.jasmine.getEnv().configure({
  random: false,
});

const testWords = ["hello", "world", "foo", "bar"];

describe("Hangman Game", () => {
  let hangmanGame;
  const canvasWriter = {
    getContext() {
      return {
        clearRect() {},
        beginPath() {},
        moveTo() {},
        lineTo() {},
        stroke() {},
      };
    },
    maxErrors: 10,
  };

  beforeEach(() => {
    hangmanGame = new HangmanGame(testWords, canvasWriter);
    hangmanGame.start();
  });

  describe("Hangman class constructor", () => {
    describe("words", () => {
      it("should be an array of words", () => {
        expect(hangmanGame.words).toBeDefined();
        expect(hangmanGame.words).toBeInstanceOf(Array);
      });

      it("should have all of the words passed in the array in the constructor", () => {
        expect(hangmanGame.words.length).toEqual(testWords.length);
        expect(hangmanGame.words).toEqual([...testWords]);
      });
    });

    describe("secretWord", () => {
      it("should be a string", () => {
        expect(hangmanGame.secretWord).toBeDefined();
        expect(typeof hangmanGame.secretWord).toBe("string");
      });

      it("should hold the value of one of the words in the array", () => {
        expect(hangmanGame.words.includes(hangmanGame.secretWord)).toBeTrue();
      });
    });

    describe("errorsLeft", () => {
      it("should be at the starting value", () => {
        expect(hangmanGame.errorsLeft).toEqual(10);
      });
    });

    describe("guessedLetters", () => {
      it("should be an empty string", () => {
        expect(typeof hangmanGame.guessedLetters).toBe("string");
        expect(hangmanGame.guessedLetters.length).toEqual(0);
      });
    });

    describe("letters", () => {
      it("should be an empty array", () => {
        expect(hangmanGame.letters).toBeInstanceOf(Array);
        expect(hangmanGame.letters.length).toEqual(0);
      });
    });
  });

  describe("pickWord", () => {
    it("should be a function", () => {
      expect(typeof hangmanGame.pickWord).toBe("function");
    });

    it("should return a string", () => {
      expect(typeof hangmanGame.pickWord()).toBe("string");
    });
  });

  describe("checkIfLetter", () => {
    it("should be a function", () => {
      expect(typeof hangmanGame.checkIfLetter).toBe("function");
    });

    it("should return a boolean", () => {
      let keyCode = 43;
      const result = hangmanGame.checkIfLetter(keyCode);
      expect(typeof result).toBe("boolean");
    });

    it("should return false if given keycode of not a letter", () => {
      expect(hangmanGame.checkIfLetter(43)).toEqual(false);
      expect(hangmanGame.checkIfLetter(60)).toEqual(false);
      expect(hangmanGame.checkIfLetter(100)).toEqual(false);
    });

    it("should return true if given keycode of a letter", () => {
      expect(hangmanGame.checkIfLetter(65)).toEqual(true);
      expect(hangmanGame.checkIfLetter(76)).toEqual(true);
      expect(hangmanGame.checkIfLetter(90)).toEqual(true);
    });
  });

  describe("checkClickedLetters", () => {
    it("should be a function", () => {
      expect(typeof hangmanGame.checkClickedLetters).toBe("function");
    });

    it("should return a boolean", () => {
      hangmanGame.letters.push("I");
      expect(typeof hangmanGame.checkIfLetter("N")).toBe("boolean");
    });

    it("should return true if letter has not been clicked", () => {
      hangmanGame.letters.push("I", "R", "P");
      expect(hangmanGame.checkClickedLetters("F")).toEqual(true);
    });

    it("should return false if letter has been clicked", () => {
      hangmanGame.letters.push("I", "R", "P");
      expect(hangmanGame.checkClickedLetters("R")).toEqual(false);
    });
  });

  describe("addCorrectLetter", () => {
    it("should be a function", () => {
      expect(typeof hangmanGame.addCorrectLetter).toBe("function");
    });

    it("should add letters to guessedLetters string", () => {
      hangmanGame.addCorrectLetter("R");
      expect(hangmanGame.guessedLetters).toEqual("R");
    });
  });

  describe("addWrongLetter", () => {
    it("should be a function", () => {
      expect(typeof hangmanGame.addWrongLetter).toBe("function");
    });

    it("should discount the amount of errors left", () => {
      hangmanGame.errorsLeft = 7;
      hangmanGame.addWrongLetter("P");
      expect(hangmanGame.errorsLeft).toEqual(6);
    });
  });

  describe("checkGameOver", () => {
    it("should be a function", () => {
      expect(typeof hangmanGame.checkGameOver).toBe("function");
    });

    it("should return a boolean", () => {
      expect(typeof hangmanGame.checkGameOver()).toBe("boolean");
    });

    it("should return true if the errorsLeft is 0", () => {
      hangmanGame.errorsLeft = 0;
      expect(hangmanGame.checkGameOver()).toEqual(true);
    });

    it("should return false if the errorsLeft is 5", () => {
      hangmanGame.errorsLeft = 5;
      expect(hangmanGame.checkGameOver()).toEqual(false);
    });
  });

  describe("checkWinner", () => {
    it("should be a function", () => {
      expect(typeof hangmanGame.checkWinner).toBe("function");
    });

    it("should return a boolean", () => {
      expect(typeof hangmanGame.checkWinner()).toBe("boolean");
    });

    it("should return true if we guess all letters", () => {
      hangmanGame = new Hangman(["IRONHACK"]);
      hangmanGame.guessedLetters = "KHARCNIO";
      expect(hangmanGame.checkWinner()).toEqual(true);
    });

    it("should return false if we haven't guessed all letters", () => {
      hangmanGame = new Hangman(["IRONHACK"]);
      hangmanGame.guessedLetters = "KHARCN";
      expect(hangmanGame.checkWinner()).toEqual(false);
    });
  });
});
