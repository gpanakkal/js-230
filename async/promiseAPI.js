// 1
{
  function flakyService() {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        resolve("Operation successful");
      } else {
        reject("Operation failed");
      }
    });
  }

  function loadData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Data loaded");
        } else {
          reject("Network error");
        }
      }, 1000);
    });
  }

  // Promise.all([flakyService(), flakyService(), loadData()])
  //   .then((results) => console.log(results))
  //   .catch(() => console.log('One or more operations failed'));
// 2
const firstResource = new Promise((resolve) =>
setTimeout(() => resolve("First resource loaded"), 500)
);
const secondResource = new Promise((resolve) =>
setTimeout(() => resolve("Second resource loaded"), 1000)
);

// Promise.race([firstResource, secondResource])
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));

// 3
// const services = [flakyService(), flakyService(), flakyService()];

// Promise.allSettled(services)
// .then((result) => console.log(result));

}
// 4
{
  function flakyService() {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        resolve("Operation successful");
      } else {
        reject("Operation failed");
      }
    });
  }

  function loadData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // loadData always resolves this time
        resolve("Data loaded");
      }, 1000);
    });
  }

  // const primaryOperation = flakyService();
  // const fallbackOperation = loadData();

  // Promise.any([primaryOperation, fallbackOperation])
  //   .then((result) => console.log(result))
  //   .catch((error) => console.error(error));
}

// 5
{
  function loadMultipleResources(urlArray) {
    const results = urlArray.map((url) => {
      return fetch(url)
        .then((response) => response.json())
        .catch(() => 'Failed to fetch');
    });
    return Promise.allSettled(results);
  }

  loadMultipleResources([
    "https://jsonplaceholder.typicode.com/todos/1",
    "invalidUrl",
  ]).then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log("Fetched data:", result.value);
      } else {
        console.error(result.reason);
      }
    });
  });
  
  // Fetched data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false }
  // Fetched data: Failed to fetch
}