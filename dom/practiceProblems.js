// 1
document.getElementById('primary_heading').classList.add('heading');
document.getElementById('primary_heading').setAttribute('class', 'heading');

// 2
document.getElementById('list').setAttribute('class', 'bulleted');

// 3
const toggler = document.getElementById('toggle');
const notice = document.getElementById('notice');
toggler.onclick = (event) => {
  event.preventDefault();
  notice.classList.toggle('hidden');
  notice.classList.toggle('visible');
};

// toggler.addEventListener('onclick', (event) => {
//   event.preventDefault();
//   document.getElementById('notice').classList.toggle('hidden');
// });

// 4
notice.onclick = (event) => {
  event.preventDefault();
  event.currentTarget.classList.add('hidden');
  event.currentTarget.classList.remove('visible');
}

// 5
const mathProblem = document.getElementById('multiplication');
const terms = [...mathProblem.textContent.matchAll(/\d+/g)].map((subarr) => Number(subarr[0]));
const product = terms.reduce((prod, curr) => prod * curr);
mathProblem.textContent = product;

// 6
document.querySelector('body').setAttribute('id', 'styled');