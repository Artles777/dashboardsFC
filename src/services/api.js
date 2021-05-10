import axios from 'axios';
import { PORT } from './constants';

export default () => axios.create({
  baseURL: `http://localhost:${PORT}/api`,
});
