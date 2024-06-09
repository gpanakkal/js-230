document.addEventListener('DOMContentLoaded', () => {
  const textField = document.querySelector('div.text-field');
  
  let intervalId;
  
  document.addEventListener('click', (e) => {
    textField.classList.remove('focused');
    textField.classList.remove('cursor');
    clearInterval(intervalId);
    intervalId = null;
  });
  
  textField.addEventListener('click', (e) => {
    e.stopPropagation();
    e.currentTarget.classList.add('focused');
    intervalId = intervalId ?? setInterval(() => textField.classList.toggle('cursor'), 500);
  });

  const content = textField.querySelector('.content');
  const isModKey = (keydown) => keydown.ctrlKey || keydown.shiftKey || keydown.altKey || keydown.metaKey;
  document.addEventListener('keydown', (e) => {
    if (!textField.classList.contains('focused')) return;
    console.log({isModKey: isModKey(e)})
    if (isModKey(e)) {
    } else {
      if (e.key === 'Backspace') {
        content.textContent = content.textContent.slice(0, -1);
      } else {
        const newTextContent = (content.textContent ?? '') + e.key;
        content.textContent = newTextContent;
      }
    }
  });
});