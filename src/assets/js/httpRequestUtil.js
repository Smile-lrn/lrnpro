import axios from 'axios';
import store from '../../store'
import router from '../../router'

axios.defaults.timeout = 15000;
// axios.defaults.baseURL = 'http://192.168.30.147';
axios.defaults.baseURL = 'http://114.67.95.11:8011/';

// axios.defaults.baseURL = 'http://liqi.sharexwd.top/';
// import state from '../../store/state';
// import {Message} from 'iview';
//http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type': 'application/json',
//       'token': store.state.token
//     };
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
//http response 拦截器
axios.interceptors.response.use(
  response => {
		// console.log(response)
    if(response.data.status ==-1 && response.data.msg.indexOf('令牌') !=-1){
      router.push({
				path:'/login'
			})
    }else{
			return response;
    }
  },
  error => {
    // console.log(error);
    // // console.log('请求状态码:' + error.response.status);
    // // console.log('请求状态文本:' + error.response.statusText);
    // Message.error('网络异常请重试');
    // return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
	if(store.state.token){
		axios.defaults.headers['token'] =store.state.token
	}
	axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8';
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}