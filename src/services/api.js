import axios from 'axios';

export default () => axios.create({
  baseURL: 'http://localhost:7500',
});
console.log(window.location.origin);
