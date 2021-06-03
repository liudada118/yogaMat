import axios from 'axios';
import Toast from '../components/Toast'
// 正常请求  modal弹框
const instance = axios.create({
  baseURL: 'http://test.bodyta.com:8888/',
});
// 请求  弹出loading
export const instances = axios.create({
  baseURL: 'http://test.bodyta.com:8888/',
});
// instances.interceptors.request.use(function(config){
//   console.log(config,'config')
//   Toast.showLoading('请求中')
//   return config
// },function(err){
//   console.log(err)
// })
// instances.interceptors.response.use(function(response){
//   Toast.hideLoading()
//   return response
// })
export default instance;
// 登录 请求 弹出loading
export const loginInstance = axios.create({
  baseURL: 'http://test.bodyta.com:8762/',
});
// loginInstance.interceptors.request.use(function(config){
//   Toast.showLoading('请求中')
//   return config
// },function(err){
//   console.log(err)
// })
// loginInstance.interceptors.response.use(function(response){
//   Toast.hideLoading()
//   return response
// })

export const wsUrl='ws://test.bodyta.com:8888/';


