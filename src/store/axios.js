import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://www.liulongbin.top:3005`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})