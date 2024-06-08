/* 1. Function to find all p nodes in the corresponding HTML file:
*/
const getAllParagraphs = (startNode = document.body) => {
  const matches = [];
  const nodes = startNode.childNodes;
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node instanceof HTMLParagraphElement) {
      matches.push(node);
    } else {
      matches.push(...getAllParagraphs(node));
    }
  }
  return matches;
}

/* 2. Func to add class article-text to every p tag in HTML:
*/
function addClassToParagraphs(className) {
  const paragraphs = getAllParagraphs();
  paragraphs.forEach((paragraph) => {
    paragraph.classList.add(className);
  });
}

// 3
function getElementsByTagName(tagName, startNode = document.body) {
  const matches = [];
  const nodes = startNode.childNodes;
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node.nodeName === tagName.toUpperCase()) {
      matches.push(node);
    } else {
      matches.push(...getElementsByTagName(tagName, node));
    }
  }
  return matches;
}

function addClass(tagName, className) {
  const elements = getElementsByTagName(tagName);
  elements.forEach((element) => {
    element.classList.add(className);
  });
}
addClass('article-text');

// #region GROUP 2

// 1
[...document.getElementsByTagName('p')].forEach((node) => node.classList.add('article-text'));

// 2
[...document.getElementsByClassName('intro')].forEach((intro) => [...intro.getElementsByTagName('p')]
  .forEach((node) => node.classList.add('article-text')));

// 3
[...document.querySelectorAll('.intro > p')].forEach((node) => node.classList.add('article-text'));

// #endregion

// #region FINDING NODES AND TRAVERSING ELEMENTS
// 1
[...document.querySelectorAll('h2')]
  .map((heading) => [...heading.textContent.matchAll(/\b\w+\b/g)].length);

// 2
[...document.querySelectorAll('h2')].filter((heading) => heading.textContent === 'Contents')[0].parentNode.parentNode;

[...document.querySelectorAll('div')].filter((div) => div.firstElementChild?.textContent === 'Contents')[0].parentNode;

document.querySelector('div > div.toctitle').parentNode;

// 3
[...document.querySelectorAll('.toc a')].forEach((anchor, index) => {
  if (index % 2 !== 0) anchor.style.color = 'green';
});

// 4
[...document.querySelectorAll('div.thumbcaption')]
  .map((div) => [...div.childNodes]
    .map((textNode) => textNode.textContent)
    .join('')
    .trim()
  );

// also works:
[...document.querySelectorAll('div.thumbcaption')]
  .map((div) => div.textContent.trim());

// 5
/* ALGORITHM
1. Get the biota info box
2. Initialize the classification object `classification`
3. Iterate over the passed keys:
  - Within the info box, search for <td>s whose text content is `${key}:`
  - get the next element sibling <td>'s text content
  - assign the text content to `classification[key]`
4. Log `classification`
*/
function getClassification(ranks) {
  const infobox = document.querySelector('.infobox.biota');
  const tableCells = [...infobox.querySelectorAll('td')];
  const classification = ranks.reduce((acc, rank) => {
    const searchValue = `${rank.toLowerCase()}:`;
    const labelCell = tableCells.filter((cell) => cell.textContent.toLowerCase() === searchValue)[0];
    if (labelCell) {
      const targetCell = labelCell.nextElementSibling;
      if (targetCell) {
        acc[rank] = targetCell.textContent;
      }
    }
    return acc;
  }, {});

  console.log(classification);
}

getClassification(['kingdom', 'phylum', 'class', 'species']);