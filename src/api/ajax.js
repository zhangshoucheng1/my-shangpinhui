import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'


const service = axios.create({
    baseURL:'http://39.98.123.211/api',
    timeout:2000
})
service.interceptors.request.use(
    (config)=>{
   NProgress.start()
   let userTempId = store.state.detail.userTempId
   if(userTempId){
       config.headers.userTempId = userTempId
   }
   let token = store.state.home.token
   if(token){//登录成功后，需要把token添加请求头中这样我们在发请求就能获取数据
       config.headers.token = token
   }
    return config;
});

service.interceptors.response.use(
    (response)=>{
    NProgress.done()
    return response.data
},
(error) => {
   NProgress.done()
   alert('获取数据失败'+error.message||'未知错误')
   //统一处理错误后让后面继续处理
  // return Promise.reject(new Error('获取数据失败'))
  //返回的是pending状态的promise,代表中断promise链
   return new Promise(() => {})
   }
);
export default service