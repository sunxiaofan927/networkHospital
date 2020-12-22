//ajax 请求
import axios from 'axios';
import { Toast } from 'mint-ui';
import Qs from 'qs';
import { Loading } from 'element-ui';
import { Notification } from 'element-ui';
import router from '@/router'
import store from '../store/index.js'

const service = axios.create({

  // baseURL: 'http://192.168.2.22:8080/yc_internet_hospital_api',  //中少本地库
  // baseURL: 'api',  //线上
  // baseURL: 'http://internet.api.yicheng120.com:800/',
  //  baseURL: 'https://api.ycyun120.com:1443',  //线上
  baseURL: 'https://api.ycyun120.com/',  //线上
  timeout: 20000,
  transformRequest: [function (data) {//请求预处理函数
    let code = Base64.decode(sessionStorage.getItem(Base64.encode('go')));
    let num = 0;
    if (code != 'ée') {
      var fun = setInterval(function () {
        num++;
        code = Base64.decode(sessionStorage.getItem(Base64.encode('go')))
        if (code != 'ée') {
          clearInterval(fun);
        }
        if (num > 10) {
          clearInterval(fun);
        }
      }, 500)
    }
    // console.log(data)
    data.deanid = code;
    return Qs.stringify(data)
  }],
  // withCredentials: true,    //跨域
})
service.interceptors.request.use(config => {
  // config.timeout = 10000
  if (store.state.token) {
    if (config.url != '/PatientController/LoginByPhone.do?' && config.url != '/YcManage/selectBannerById.do?' && config.url != '/YcManage/msgXxInfo.do?' && config.url != '/YcManage/agreementXxInfo.do?') {
      config.headers.common['access-token'] = store.state.token;
    }
  }
  return config;
},
  error => {
    // 对请求错误做些什么
    Toast({
      message: error,
      position: 'center',
    });
    return Promise.reject(error);
  }
);

//对数组的方法进行重写
const ajaxMethod = ['get', 'post']
const api = {}
let that = this;
ajaxMethod.forEach((method) => {
  api[method] = function (url, data) {
    return new Promise(function (resolve, reject) {
      service[method](url, data)
        .then((response) => {
          if (response.status == 200) {
            let data = response.data;
            if (data.code == '0' || data.code == '403' || data.code == '200') {
              resolve(data)
            } else {
              if (data.code == '10100') {
                Toast({
                  message: "登录失效正在跳转登录认证页...",
                  position: 'center',
                  duration: '1000',
                });
                setTimeout(() => {
                  router.push('/login')
                  sessionStorage.clear()
                }, 1000)
              }
              else{
                Notification.error({  
                  duration:'2000',
                  title: '提示',
                  message: data.msg||data.message
                });
                reject(response)
              }
            }
          } else if (response.status == 5000) {
            router.push("/404")
            Toast({
              message: "网络丢失...",
              position: 'center',
            });
          } else {
            Notification.success({
              duration: '2000',
              title: '提示',
              message: data.msg || data.message
            });
          }
        })
        .catch(function (error) {
          // Toast(error)
          return error
        })
    })
  }
})

export default api
