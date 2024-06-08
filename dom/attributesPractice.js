function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

function countNodes(type) {
  return document.querySelectorAll(type).length;
}

// log the first word of each paragraph
const logFirstWord = document.querySelectorAll('p').forEach((paragraph) => {
  console.log({ text: paragraph.firstChild.data.trim() });
  const firstWord = paragraph.textContent.match(/\S+\s/)[0].trim();
  console.log(firstWord);
});

// add the class 'stanza' to each paragraph except the first
const addStanza = () => {
  return walk(document, (node) => {
    const sameLevelParagraphs = node.parentNode?.childNodes?.filter((child) => child.nodeName === 'P');
    console.log({ sameLevelParagraphs })
    if (node.nodeName === 'P' && sameLevelParagraphs?.[0] !== node) {
      node.classList.add('stanza');
    }
  });
}

// Count elements of each type
let countElements = (type, filterCallback) => {
  const counts = {};
  const countType = (node) => ((counts) => {
    if (!filterCallback(node)) return;
    counts[node.nodeName] = 1 + (counts[node.nodeName] ?? 0);
  })(counts);
  walk(document, countType);
  return type === undefined ? counts : counts[type];
}
// count PNGs
let pngCount = countElements('IMG', (image) => ('getAttribute' in image ? image.getAttribute('src')?.match(/png$/i) : false));

// make all links red
walk(document, (node) => {
  if (node.nodeName !== 'A') return;
  console.log({firstChild: node.firstChild})
  node.style.color = 'red';
});