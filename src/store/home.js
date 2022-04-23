import {reqCategoryList,
  reqRegister,
  reqCode,
  reqLogin,
  reqGetUserInfo
  ,reqLoginOut} from '@/api'
const state = {
  categoryList:[],
  code:'',
  token:localStorage.getItem('TOKEN_KEY'),
  userInfo:{}
}
const mutations = {
  RECEIVE_CATEGORYLIST(state,categoryList){
     state.categoryList = categoryList
  },
  RECEIVE_CODE(state,code){
    state.code = code
  },
  RECEIVE_LOGIN(state,token){
     state.token = token
  },
  RECEIVE_USERINFO(state,userInfo){
     state.userInfo = userInfo
  },
  RESET_USER(state){//清空用户信息
    state.userInfo = {}
    state.token = ''
  }
}
const actions = {
 async getCategoryList({commit}){
      const result = await reqCategoryList()
      if(result.code===200){
        commit('RECEIVE_CATEGORYLIST',result.data)
      }
    
  },
 async getRegister({commit},userInfo){
    const result = await reqRegister(userInfo)
    if(result.code===200){
      return 'ok'
    }else{
      return Promise.reject(new Error('注册失败999999'))
    }
  },
  async getCode({commit},phone){
    const result = await reqCode(phone)
    if(result.code===200){
      commit('RECEIVE_CODE',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('验证码失败'))
    }
  },
  async getLogin({commit},userInfo){//请求登录
    const result = await reqLogin(userInfo)
    if(result.code===200){
     // localStorage.setItem('TOKEN_KEY',result.data.token)
       commit('RECEIVE_LOGIN',result.data.token)
       localStorage.setItem('TOKEN_KEY',result.data.token)
       return 'ok'
    }else{
      return Promise.reject(new Error('登录失败'))
    }
  },
  async getUserInfo({commit}){//根据token获取用户信息
     const result = await reqGetUserInfo()
     if(result.code===200){
       commit('RECEIVE_USERINFO',result.data)
       return 'ok'
     }else{
       return Promise.reject(new Error('获取用户信息失败'))
       //localStorage.getItem('TOKEN_KEY')
     }
  },
  async getLoginOut({commit}){//用户登出
    const result = await reqLoginOut()
    if(result.code===200){
      commit('RESET_USER')
      localStorage.removeItem('TOKEN_KEY')
      return 'ok'
    }else{
      return Promise.reject(new Error('登出失败'))
    }
  }
}
const getters = {
  

}
export default {
    state,
    mutations,
    actions,
    getters
    
}