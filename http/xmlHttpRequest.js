// 1
let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails').send();

// 2
// .responseText

// wait for loading to finish, then execute code:

request.addEventListener('load', (event) => {
  const xhr = event.target;
  const currentTarget = event.currentTarget;
  console.log({xhrIsCurrentTarget: xhr === currentTarget});
  
});