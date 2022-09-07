// // 接口调用
import axios from 'axios'
// import Qs from "qs";
const service = axios.create({
  baseURL: '', // api 的 base_url
  timeout: 30000000000, // request timeout
});
service.interceptors.request.use((config) => {
  //根据请求设置请求头
  config.headers['content-type'] = config.method == 'get' ? 'application/json; charset=utf-8' : 'multipart/form-data;'
  config.headers['content-type'] = config.method == 'post' ? 'multipart/form-data;' : 'application/json; charset=utf-8'
  config.headers['content-type'] = config.method == 'put' ? 'application/x-www-form-urlencoded' : 'application/json; charset=utf-8'
  config.headers['content-type'] = config.method == 'delete' ? 'application/x-www-form-urlencoded' : 'application/json; charset=utf-8'
  return config
}, (error) => {
  return Promise.reject(error)
});

// 限制弹出一次错误信息
service.interceptors.response.use(res => { // 响应拦截器
  // console.log('拦截返回信息：', res)
  return res
}, error => {
  // console.log('请求错误信息：', error)
  return error.response
});
export default service;



