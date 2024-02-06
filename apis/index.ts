import axios from 'axios'

const getUser = async () => {
  const param = {
    locations: []
  }
  const res = await axios.post('https://m.studymoa.me/api/moim/main/study', param)
  return res.data
}

const APIs = {
  getUser
}

export default APIs