// 1
const flakyService = () => new Promise((resolve, reject) => {
  const success = Boolean(Math.round(Math.random()));
  if (success) resolve('Operation successful');
  else reject('Operation failed');
});

// flakyService()
//   .then((result) => console.log(result))
//   .catch((error) => console.error('An error occurred'));

// 2
function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: "User not found" }), 500);
  });
}

// fetchUserData()
//   .then()
//   .catch((result) => console.error(result.error))
//   .finally(() => console.log('Fetching complete'));

// 3
const retryOperation = (operationFunc) => {
  let attempts = 0;

  const attempt = () => {
    return operationFunc().catch((err) => {
      if (attempts < 2) {
        attempts += 1;
        console.log(`Retry attempt #${attempts}`);
        return attempt();
      } else throw err;
    });
  };

  return attempt().catch(() => console.error('Operation failed.'));
};

// Example usage:
// retryOperation(
//   () =>
//     new Promise((resolve, reject) =>
//       Math.random() > 0.33
//         ? resolve("Success!")
//         : reject(new Error("Fail!"))
//     )
// );

// 4
function mockAsyncOp() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Operation succeeded");
      } else {
        reject("Operation failed");
      }
    }, 1000);
  });
}

// mockAsyncOp().finally(() => console.log('Operation attempted'));

// 5
function loadData() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.8) resolve('loaded');
    else reject('failed');
  })
  .catch((result) => {
    console.error(result);
    return new Promise((resolve) => {
      resolve('Using cached data');
    });
  });
}

loadData().then(console.log);