// 1
async function asyncDownloadFile() {
  console.log('Downloading file...');
  const message = await new Promise((resolve) => {
    setTimeout(() => resolve('Download complete!'), 1500);
  });
  console.log(message);
}

// asyncDownloadFile();

// 2
async function asyncLoadData() {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Data loaded");
        } else {
          reject("Network error");
        }
      }, 1000);
      });
    console.log(result);
  } catch(error) {
    console.error(error);
  }
}

// asyncLoadData();

// 3
async function fetchResource(url) {
  try {
    const response = await fetch(url);
    const data = response.json();
    console.log('Fetched data');
    console.log(data);
  } catch(e) {
    console.error('Failed to fetch resource');
  } finally {
    console.log('Resource fetch attempt made');
  }
}

// Example usage:
// fetchResource("https://jsonplaceholder.typicode.com/todos/1");
// Logs fetched data, then "Resource fetch attempt made"
// On error, logs "Failed to load resource", then "Resource fetch attempt made"

// 4
const fetchUserProfile = async (id) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com/users/';
  
  const stringifyData = (response) => response.json();
  const logError = (e, prefix) => console.error(prefix, e);

  const user = await fetch(`${baseUrl}${id}`)
    .then(stringifyData).catch((e) => logError(e, 'Error fetching profile:'));
  console.log('User Profile', user);
  const userPosts = await fetch(`${baseUrl}${id}/posts`)
    .then(stringifyData).catch((e) => logError(e, 'Error fetching posts:'));
  console.log('User Posts', userPosts);
  const userTodos = await fetch(`${baseUrl}${id}/todos`)
    .then(stringifyData).catch((e) => logError(e, 'Error fetching todos:'));
  console.log('User Todos', userTodos);
}

fetchUserProfile(1);