import {reqSearchInfo,reqUserAddress} from '@/api'
const state = {
    searchInfo:{},
    userAddressList:[]
}
const mutations = {
    RECEIVE_SEARCHINFO(state,searchInfo){
     state.searchInfo = searchInfo
  },
  RECEIVE_USERADDRESS(state,userAddressList){
     state.userAddressList = userAddressList
  }
}
const actions = {
 async getSearchInfo({commit}, searchParams){
      const result = await reqSearchInfo(searchParams)
      if(result.code===200){
        commit('RECEIVE_SEARCHINFO',result.data)
      }
    
  },
  async getUserAddress({commit}){//请求trade页用户地址
    const result = await reqUserAddress()
    if(result.code===200){
      commit('RECEIVE_USERADDRESS',result.data)
    }
  }
}
const getters = {
  attrsList(state){
    return state.searchInfo.attrsList || []
  },
  goodsList(state){
    return state.searchInfo.goodsList || []
  },
  trademarkList(state){
    return state.searchInfo.trademarkList || []
  }
}
export default {
    state,
    mutations,
    actions,
    getters
    
}