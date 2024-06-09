// 1 - 3
document.addEventListener('DOMContentLoaded', () => {
  const x = document.querySelector('div.x');
  
  document.addEventListener('mousemove', (e) => {
    const [newX, newY] = [e.clientX, e.clientY];
    x.style.top = `${e.clientY}px`;
    x.style.left = `${e.clientX}px`;
  });
  
  const setXColor = (newColor) => [...x.children].forEach((child) => child.style.background = newColor);
  
  document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key.toLowerCase() === 'b') setXColor('blue');
    if (e.key.toLowerCase() === 'r') setXColor('red');
    if (e.key.toLowerCase() === 'g') setXColor('green');
  })
});

// 4
document.addEventListener('DOMContentLoaded', () => {
  const textBox = document.querySelector('div.composer > textarea');
  const submitButton = document.querySelector('button');
  const MAX_CHARS = 140;
  const charCounter = document.querySelector('p.counter');
  charCounter.textContent = `${MAX_CHARS} characters remaining`
  textBox.addEventListener('keyup', (e) => {
    const charsEntered = textBox.value.length;
    const charsRemaining = MAX_CHARS - charsEntered;
  charCounter.textContent = `${charsRemaining} characters remaining`;
    if (charsRemaining < 0) {
      textBox.classList.add('invalid');
      submitButton.disabled = true;
    }
    else {
      textBox.classList.remove('invalid');
      submitButton.disabled = false;
    }
  })
});