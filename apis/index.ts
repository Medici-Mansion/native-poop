import axios from 'axios';

const getPeed = async () => {
  const res = await axios.get('http://172.30.1.254/posts');
  return res.data;
};

const APIs = {
  getPeed,
};

export default APIs;
