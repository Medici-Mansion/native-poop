import axios from 'axios';
import {LoginParam, SuccessLoginRes} from '../types';

const healthCheck = async () => {
  const res = await axios.get(
    'https://poop-server-u2f55.ondigitalocean.app/api/v1',
  );
  return res.data;
};

const APIs = {
  healthCheck,
};

export default APIs;
