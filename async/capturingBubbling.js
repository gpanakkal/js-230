// 1
let elem1 = document.querySelector('#elem1');
let elem4 = document.querySelector('#elem4');


elem4.addEventListener('click', event => alert(event.currentTarget.id));
elem1.addEventListener('click', event => alert(event.currentTarget.id));

/* 2
Alert windows will pop up for each div.pick, displaying the class name of event.currentTarget and its tag
*/

/* 3
3 boxes will fire because the event listeners also fire for children of the calling element

Incorrect: the first div is not a parent of the others, so only 2 will fire.
*/

// PRACTICE PROBLEMS

/* 1
They fire in their order in code because they are both listeners on the same element and occur in the same phase (bubbling)
*/

/* 2
The event listener that alerts "capturing" fires first, in the capturing phase, and the other fires in the bubbling phase.
*/

/* 3 
(all on the bubbling phase)
1. The click listener fires after a 7 second delay, alerting 'DIV'
2. The keypress listener fires twice for the inputs 'q' and 'w' after a 7 second delay, alerting the event code
3. The click listener fires after a 7 sec delay, alerting 'MAIN'
*/
