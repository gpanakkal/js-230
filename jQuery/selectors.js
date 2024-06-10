// 1
let $h1 = $('h1');

// 2
let $firsth1 = $('#site_title');

// 3
let $li = $('article').children().find('li');

// simpler alternative:
$('article li')

// 4
$('article li')[2]; // retrieves the item itself
$('article li').eq(2); // returns a collection containing the desired item

// 5
let rows = $('table tr:odd');
// alt
$('table tr').odd();

// 6
$('li li:contains("ac ante")').parents('li');

// 7
$('li li:contains("ac ante")').next();

// 8
$('table td').last()[0].textContent;

// 9
$('table td').not('.protected');
// alt:
$('td:not(".protected")');

// 10
$('a[href^="#"]')

// 11
$('.block'); // incorrect; it only selects elements that have 'block' as a class
$('[class*="block"]');