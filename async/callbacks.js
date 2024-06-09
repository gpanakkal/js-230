// 1
function basicCallback(callback, number) {
  setTimeout(() => callback(number), 2000);
}

// Example usage:
// basicCallback((number) => {
//   console.log(number * 2);
// }, 5);
// After 2 seconds, logs: 10

// 2
function downloadFile() {
  console.log('Downloading file...');
  setTimeout(() => console.log('Download complete!'), 1500);
}

// downloadFile();

// 3
function processData(numArr, callback) {
  setTimeout(() => {
    const mapped = numArr.map(callback);
    console.log(mapped);
  }, 1000);
}

// Example usage:
// processData([1, 2, 3], (number) => number * 2);
// After 1 second, logs: [2, 4, 6]

// 4
function waterfallOverCallbacks(cbArr, num) {
  let value = num;
  cbArr.forEach((callback) => value = callback(value));
  return value;
}
// Example usage:
// const double = (x) => x * 2;
// const result = waterfallOverCallbacks([double, double, double], 1);
// // Logs: 8
// console.log(result);

// 5
function startCounter(callback) {
  let count = 0;
  const timerId = setInterval(() => {
    count += 1;
    if (callback(count)) clearInterval(timerId);
  }, 1000);
}

// Example usage:
startCounter((count) => {
  console.log(count);
  return count === 5;
});
// Logs 1, 2, 3, 4, 5, then stops