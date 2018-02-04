/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a cerain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// UI Elements
const gameWrapper = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Event listener
gameWrapper.addEventListener('mousedown', function(e) {
  if(e.target.className == 'play-again') {
    window.location.reload();
  }
});

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate our input
  if(isNaN(guess) || guess < min || guess > max) {
    guessInput.value = '';
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  } else {
    // Check if won
    if (guess === winningNum) {
      // Game won
      gameOver(true, `Sorry, ${guess} was not the correct number. ${guessesLeft} guesses left.`);

      // disable input
      guessInput.disabled = true;
      // change border color
      guessInput.style.borderColor = 'green';
      // display winning message
      setMessage(`Congratulations, ${winningNum} was the correct guess!!!`, 'green');
    } else {
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        // Game lost
        gameOver(false, `Game Over. The correct number was ${winningNum}`);

      } else {
        // Game continues
        guessInput.value = '';
        setMessage(`Sorry, ${guess} was not the correct number. ${guessesLeft} guesses left.`);
      }
    }
  }
})

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // change text color
  message.style.color = color;
  // display winning message
  setMessage(msg);

  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}

// Generate random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg) {
  message.textContent = msg;
}