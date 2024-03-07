import axios from 'axios';

const healthCheck = async () => {
  const res = await axios.get(
    'https://poop-server-u2f55.ondigitalocean.app/api/v1',
  );
  return res.data;
};

const getPeed = async () => {
  const res = await axios.get('http://172.30.1.254/posts');
  return res.data;
};

const APIs = {
  getPeed,
  healthCheck,
};

export default APIs;
