/* STEPS
1. Move the header to be the first child of the body
2. Move the site title to be a header child
3. Swap the images within figures
4. Move the figures into the article

*/
const navHeader = document.querySelector('body > header');
document.body.insertAdjacentElement('afterbegin', navHeader);
const title = document.querySelector('main > h1');
navHeader.insertAdjacentElement('afterbegin', title);
const figures = document.querySelectorAll('figure');
const figureImages = document.querySelectorAll('figure > img');
figures[0].insertAdjacentElement('afterbegin', figureImages[1]);
figures[1].insertAdjacentElement('afterbegin', figureImages[0]);
const article = document.querySelector('article');
figures.forEach((figure) => article.insertAdjacentElement('beforeend', figure));