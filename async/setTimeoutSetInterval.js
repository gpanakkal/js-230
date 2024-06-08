// 1
const delayLog = (n) => {
  for (let i = 1; i <= n; i += 1) {
    const str = String(i) + ' second' + (i === 1 ? '' : 's') + ' later'
    setTimeout(() => console.log(str), i * 1000);
  }
}

// delayLog(10);

// 2
// lines in order of execution: 1, 5, 9, 13, 2, 10, 6, 14

// 3
// setTimeout(() => {
//   setTimeout(() => {
//     q();
//   }, 15);

//   d();

//   setTimeout(() => {
//     n();
//   }, 5);

//   z();
// }, 10);

// setTimeout(() => {
//   s();
// }, 20);

// setTimeout(() => {
//   f();
// });

// g();
// g, f, d, z, n, s, q

// 4
const afterNSeconds = (callback, duration) => {
  setTimeout(callback, duration * 1000);
}

// SETINTERVAL

// 1
const startCounting = () => {
  let counter = 1;
  const id = setInterval(() => {
    console.log(counter);
    counter += 1;
  }, 1000);
  return id;
}

const counterId = startCounting();

// 2
const stopCounting = () => clearInterval(counterId);