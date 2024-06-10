// LOADING JSON

// 1
{
  let request = new XMLHttpRequest();
  request.open('GET', 'https://api.github.com/repos/rails/rails');
  request.addEventListener('load', () => {
    const data = JSON.parse(request.response);
    console.log(request.status, data.open_issues);
  });

  request.send();
}

// 2
{
  let request = new XMLHttpRequest();
  request.open('GET', 'hts://api.github.com/repos/rails/rails');
  request.addEventListener('load', () => {
    const data = JSON.parse(request.response);
    console.log(request.status, data.open_issues);
  });

  request.addEventListener('error', (e) => console.log('The request could not be completed!'));

  request.send();
}

// SENDING JSON

// 1
// POST /books HTTP/1.1
// Host: https://lsjs230-book-catalog.herokuapp.com
// Content-Type: application/json; charset=utf-8
// Accept: */*
// {"title": "Eloquent JavaScript", "author": Marijn Haverbeke"}

// 2
{
  const request = new XMLHttpRequest();
  request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
  request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  const data = { name: 'My Product', sku: 'ABCF', price: 1085 };
  const json = JSON.stringify(data);

  request.addEventListener('load', (e) => {

  });

  request.send(json);
}