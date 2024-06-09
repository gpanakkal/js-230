const generateAnswer = () => Math.floor(Math.random() * 100) + 1;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const inputField = form.querySelector('input#guess');
  const resultP = document.body.querySelector('p');
  
  resultP.textContent = 'Guess a number from 1 to 100'
  let answer = generateAnswer();
  let guessCount = 0;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let guess = parseInt(inputField.value, 10);
    guessCount += 1;

    let message;
    if (guess > answer) message = `My number is lower than ${guess}`;
    else if (guess < answer) message = `My number is higher than ${guess}`;
    else if (guess == answer) {
      form.querySelectorAll('input').forEach((child) => child.disabled = true);
      message = `You guessed it! It took you ${guessCount} guesses.`;
    }

    resultP.textContent = message;
  });

  document.querySelector('main a').addEventListener('click', (e) => {
    e.preventDefault();
    resultP.textContent = 'Guess a number from 1 to 100';
    answer = generateAnswer();
    guessCount = 0;
    inputField.value = null;
    form.querySelectorAll('input').forEach((child) => child.disabled = false);
  })
});