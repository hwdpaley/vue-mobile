import Vue from 'vue';
import axios from 'axios';
import config from './config';

// enable mock
// import mock from './mock'
// if (!config.debug.mock) {
//   mock.restore()
// }

const http = axios.create({
  baseURL: config.api,
  timeout: 1000,
  headers: { Authorization: `Bearer ${localStorage.getItem('feathers-jwt')}` },
});
http.interceptors.request.use(request => request, error =>
  // Do something with request error
  Promise.reject(error));
http.interceptors.response.use((response) => {
  const request = response.config;
  if (config.debug.http) {
    console.log(
      '>>>', request.method.toUpperCase(), request.url, request.params,
      '\n   ', response.status, response.data,
    );
  }
  return response;
}, (error) => {
  if (config.debug.http) {
    const { response, config: request } = error;
    if (request) {
      console.log(
        '>>>', request.method.toUpperCase(), request.url, request.params,
        '\n   ', response.status, response.data,
      );
    }
  }
  // Do something with response error
  return Promise.reject(error);
});
Vue.prototype.$http = http;
