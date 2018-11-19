import API from '../api';

// example axios request
export default class User {
  findAll() {
    API.get('/users')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
