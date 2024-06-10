// for https://codepen.io/launchschool/pen/OJwoZgX

document.addEventListener('DOMContentLoaded', () => {
  let store = document.getElementById('store');
  
  let request = new XMLHttpRequest();
  request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com/products');

  request.addEventListener('load', event => store.innerHTML = request.response);
  request.send();
  
  store.addEventListener('click', event =>  {
    let target = event.target;
    if (target.tagName !== 'A') {
      return;
    }
    
    event.preventDefault();
    
    let request = new XMLHttpRequest();

    request.open('GET', `https://ls-230-web-store-demo.herokuapp.com${target.getAttribute('href')}`);

    request.addEventListener('load', event => store.innerHTML = request.response);
    request.send();
  });
  
  // lines of interest below
  store.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = new FormData(e.target);
    const request = new XMLHttpRequest();
    request.open('post', `https://ls-230-web-store-demo.herokuapp.com${e.target.getAttribute('action')}`);
    request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
    
    request.addEventListener('load', () => {
      if (request.status === 201) {
        console.log('Item updated');
      } else {
        console.log('Item was not updated');
        store.innerHTML = request.response;
      }
    });
    request.send(data);
  });
});