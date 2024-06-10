document.addEventListener('DOMContentLoaded', () => {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com/products');
  const store = document.getElementById('store');

  request.addEventListener('load', (e) => {
    store.innerHTML = request.response;
  });

  request.send();

  store.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') return;

    e.preventDefault();

    const req = new XMLHttpRequest();
    req.open('GET', 'https://ls-230-web-store-demo-herokuapp.com' + e.target.getAttribute('href'));
    req.addEventListener('load', (e) => (store.innerHTML = req.response));
    req.send();
  })
});