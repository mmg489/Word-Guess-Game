var word;
var allowedGuesses;
var correctGuesses;
var wrongGuesses;

var wordElement = document.getElementById('word');
var letterCountElement = document.getElementById('letterCount');
var lettersGuessedElement = document.getElementById('lettersGuessed');

function initializeGame() {
  word = 'banzai';
  allowedGuesses = 13;
  wrongGuesses = [];
  correctGuesses = [];

  // initialize correctGuesses array with underscores
  for (var i = 0; i < word.length; i++) {
    correctGuesses.push('_');
  }

  wordElement.innerHTML = correctGuesses.join(' ');
  letterCountElement.innerHTML = allowedGuesses;
}

function updateGuesses(letter) {
  allowedGuesses--; // decrement guesses left
  letterCountElement.innerHTML = allowedGuesses;

  if (word.indexOf(letter) === -1) { // letter is NOT in the word
    wrongGuesses.push(letter); // update letters guessed
    lettersGuessedElement.innerHTML = wrongGuesses.join(', ');
  } else { // letter IS in the word
    // replace underscore with the letter
    for (var i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        correctGuesses[i] = letter;
      }
    }

    wordElement.innerHTML = correctGuesses.join(' ');
  }
}

function checkWin() {
  if (correctGuesses.indexOf('_') === -1) {
    alert('You Won!');
  } else if (allowedGuesses === 0) {
    alert('You Lost!');
  }
}

document.onkeyup = function (event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  updateGuesses(letterGuessed);
  checkWin();
};

initializeGame();