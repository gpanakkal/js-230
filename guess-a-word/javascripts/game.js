const select = (selector) => document.querySelector(selector);

const subtractArrays = (arr1, arr2) => arr1
  .map((el, i) => el !== arr2[i] ? el : null);

const createSpans = (count) => new Array(count).fill(null)
.map(() => document.createElement('span'));

const randomWord = (() => {
  const WORDS = ['apple', 'banana', 'orange', 'pear'];
  return () => {
    const index = Math.floor(Math.random() * WORDS.length);
    return WORDS.splice(index, 1)[0];
  }
})();

class Game {
  static maxWrongGuesses = 6;

  constructor() {
    if (!this.initState()) return;
    this.initWindow();
    this.bindEvents();
  }

  initState() {
    this.answer = randomWord();
    if (this.answer === undefined) {
      this.displayOutOfWords();
      return false;
    }
    this.wrongGuesses = 0;
    this.guessedPortion = new Array(this.answer.length).fill(null);
    this.guessedLetters = [];
    select('#message').textContent = '';
    document.body.className = '';
    return true;
  }

  initWindow() {
    const spaces = [...document.querySelectorAll('#spaces span')];
    while (spaces.length > this.answer.length) {
      const last = spaces[spaces.length - 1];
      last.remove();
      spaces.splice(spaces.length - 1, 1);
    }
    spaces.forEach((el) => el.textContent = null);
    [...document.querySelectorAll('#guesses span')]
      .forEach((el, i, arr) => { el.remove(); delete arr[i] });
    const remainingSpaces = this.answer.length - spaces.length;
    const wordSpans = createSpans(remainingSpaces);
    select('#spaces').append(...wordSpans);
    select('#apples').className = `guess_0`;
    select('#replay').style.display = 'none';
  }

  bindEvents() {
    const keyPressArgs = ['keydown', this.#handleKeyInput.bind(this)];
    // document.removeEventListener(...keyPressArgs);
    document.addEventListener(...keyPressArgs);

    const replayArgs = ['click', this.#handleReplayClick.bind(this)]
    // select('#replay').removeEventListener(...replayArgs);
    select('#replay').addEventListener(...replayArgs);
    
  }

  #handleReplayClick(e) {
    e.preventDefault();
    this.initState.call(this);
    this.initWindow.call(this);
  }

  #handleKeyInput(e) {
    console.log({event: e})
    const mods = [e.altKey, e.ctrlKey, e.metaKey, e.shiftKey];
    const isLetter = !mods.some((el) => el) && /^[a-z]$/i.test(e.key);
    if (isLetter && !this.hasLost()) {
      e.preventDefault();
      this.addGuess.call(this, e.key);
    }
  }

  displayOutOfWords() {
    select('#message').textContent = "Sorry, I've run out of words!";
    select('#replay').style.display = 'none';
  }

  addGuess(guess) {
    const letter = String(guess).toLowerCase();
    // add the guessed letter if it isn't in the array, else return
    if (this.guessedPortion.includes(letter)) return;

    // if the guess is correct, fill in the spaces in the word where it's found
    this.#updateLetters(letter);

    // update interface
    this.#drawGuesses(guess);

    // if the word is guessed, end the game with a win
    const remaining = this.guessedPortion.filter((el) => el === null);
    console.log({remaining})
    if (!remaining.length) {
      this.winGame();
    }
    // else if guesses is the maximum, end the game with a loss
    else if (this.hasLost()) {
      this.loseGame();
    }
  }

  #updateLetters(newLetter) {
    const correctLetters = this.answer.split('');
    if (!correctLetters.includes(newLetter)) {
      this.wrongGuesses += 1;
    }
    this.guessedLetters.push(newLetter);
    this.guessedPortion = this.guessedPortion
      .map((guess, i) => newLetter === correctLetters[i] ? newLetter : guess);
  }

  #drawGuesses(newLetter) {
    select('#apples').className = `guess_${this.wrongGuesses}`;
    const guessSpan = document.createElement('span');
    guessSpan.textContent = newLetter;
    select('#guesses').append(guessSpan);
    // update the word spans
    [...document.querySelectorAll('#spaces > span')].forEach((span, i) => {
      span.textContent = this.guessedPortion[i] ?? ''
    });
  }

  winGame() {
    select('#message').textContent = 'You Win!';
    document.body.className = 'win';
    select('#replay').style.display = 'inline';
  }

  loseGame() {
    select('#message').textContent = 'Sorry! You\'re out of guesses.';
    document.body.className = 'lose';
    select('#replay').style.display = 'inline';
  }

  hasLost() {
    console.log({wrong: this.wrongGuesses, max: Game.maxWrongGuesses, hasLost: this.wrongGuesses >= Game.maxWrongGuesses})
    return this.wrongGuesses >= Game.maxWrongGuesses;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
});
