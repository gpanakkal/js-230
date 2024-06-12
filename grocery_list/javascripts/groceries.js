const elementValue = (selector) => document.querySelector(selector).value;

document.addEventListener('DOMContentLoaded', () => {
  const groceryList = document.querySelector('#grocery-list');

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    let [name, quantity] = ['#name', '#quantity'].map(elementValue);
    quantity = quantity || '1';

    const newItem = document.createElement('li');
    newItem.append(`${quantity} ${name}`)

    console.log({quantity})
    groceryList.insertAdjacentElement('beforeend', newItem);

    e.currentTarget.reset();
  });
});