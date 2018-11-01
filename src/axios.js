import axios from 'axios';
var token = localStorage.getItem('token') || '123456789'
export const HTTP = axios.create({
  baseURL: `http://www.liulongbin.top:3005`,
  headers: {
    Authorization: `Bearer ${token}`
  }
})