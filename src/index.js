const axios = require('axios');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const KEY = '33375890-4af8fec24bfa9f2a58a45d278';
const URL = `https://pixabay.com/api/?key=${KEY}&q=cats&orientation=horizontal&safesearch=true&image_type=photo`;
fetch(URL);

// // Make a request for a user with a given ID
// axios
//   .get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// // Optionally the request above could also be done as
// axios
//   .get('/user', {
//     params: {
//       ID: 12345,
//     },
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// // Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
