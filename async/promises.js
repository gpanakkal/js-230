// 1
function downloadFilePromise() {
  return new Promise((resolve, reject) => {
    console.log('Downloading file...');
    setTimeout(() => resolve('Download complete!'), 1500);
  });
}

// 2
function processDataPromise(numArr) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mapped = numArr.map((num) => num * 2);
      resolve(mapped);
    }, 1000);
  });
}

// Example usage:
// processDataPromise([1, 2, 3]).then((processedNumbers) => {
//   console.log(processedNumbers);
//   // After 1 second, logs: [2, 4, 6]
// });

// 3
const flakyService = () => new Promise((resolve, reject) => {
  const success = Boolean(Math.round(Math.random()));
  if (success) resolve('Operation successful');
  else reject('Operation failed');
})

// flakyService()
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// 4
// new Promise((resolve) => {
//   resolve('Operation complete');
// })
//   .then(console.log)
//   .finally(() => {
//     console.log("Cleaning up resources...");
//   });

// 5
Promise.resolve(3)
  .then((num) => num * 2)
  .then((num) => num + 5)
  .then(console.log);