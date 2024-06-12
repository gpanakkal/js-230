document.addEventListener('DOMContentLoaded', () => {
  const resultField = document.querySelector('#result');
  const operations = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  }

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    let [firstNum, secondNum, operator] = [
      document.querySelector('#first-number'),
      document.querySelector('#second-number'),
      document.querySelector('#operator')
    ].map((el) => el.value);
    [firstNum, secondNum] = [firstNum, secondNum].map(Number);
    if (Number.isNaN(firstNum) || Number.isNaN(secondNum)) {
      resultField.textContent = `Inputs ${firstNum} or ${secondNum} are invalid.`;
      return;
    }
    console.log({firstNum, secondNum, operator})
    
    resultField.textContent = operations[operator](firstNum, secondNum);
  });
});