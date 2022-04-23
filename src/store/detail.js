import {reqDetailInfo} from '@/api'
import {reqAddOrUpdateShopCart} from '@/api'
import {reqShopCart} from '@/api'
import {getuserTempId} from '@/utils/userabout.js'
import {reqUpdateCartOneIsCheck} from '@/api'
import {reqDeleteOneCart} from '@/api'

const state = {
    detailInfo:{},
    shopCart:[],
    userTempId:getuserTempId()//用户临时标识

}
const mutations = {
  RECEIVE_DETAILINFO(state,detailInfo){
     state.detailInfo = detailInfo
  },
  RECEIVE_SHOPCART(state,shopCart){
     state.shopCart = shopCart
  }
}
const actions = {
 async getDetailInfo({commit},skuId){
      const result = await reqDetailInfo(skuId)
      if(result.code===200){
        commit('RECEIVE_DETAILINFO',result.data)
      }
    
    },

 async addOrUpdateShopCart({commit},{skuId,skuNum}){//加入购物车或改变购物车数量
    const result = await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code===200){
     // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++')
       return 'ok'
    }else{
   //  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      return Promise.reject(new Error('加入购物车失败'))
    } 
 },
   async getShopCart({commit}){// shopcart 购物车列表数据
     const result = await reqShopCart()
     if(result.code===200){
       commit('RECEIVE_SHOPCART',result.data)
     }
   },
  async getUpdateCartOneIsCheck({commit},{skuId,isChecked}){//请求购物车列表的单个商品选中状态
    const result = await reqUpdateCartOneIsCheck(skuId,isChecked)
    if(result.code===200){
      // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        return 'ok'
     }else{
    //  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++')
       return Promise.reject(new Error('失败'))
     } 
   },
   updateCartIsCheckedAll({commit,getters,dispatch},isChecked){//请求购物车列表全选状态
        let promises = []
       // console.log(getters.cartInfo.cartInfoList+'++++++++++++++++++++++++++++++++++++')
      getters.cartInfo.cartInfoList.forEach(item => {
        //console.log(item)
        if(item.isChecked===isChecked){
           return
        }
        let promise = dispatch('getUpdateCartOneIsCheck',{skuId:item.skuId,isChecked})
        promises.push(promise)
      });
      return Promise.all(promises)
   },
  async getDeleteOneCart({commit},skuId){//删除单个购物车列表
     const result = await reqDeleteOneCart(skuId)
     if(result.code===200){
       return 'ok'
     }else{
      return Promise.reject(new Error('shibai'))
     }
   },
   deleteAllCart({commit,dispatch,getters}){
      let promises = []
    getters.cartInfo.cartInfoList.forEach(item=>{
       if(!item.isChecked) return
       let promise = dispatch('getDeleteOneCart', item.skuId)
       promises.push(promise)
       
    })
     return Promise.all(promises)
   }
}
const getters = {
  categoryView(state){
    return state.detailInfo.categoryView || {}
  },
  skuInfo(state){
    return state.detailInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.detailInfo.spuSaleAttrList || []
  },
  skuImageList(state){
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo.skuImageList : []
  },
  cartInfo(state){
     return state.shopCart[0] || {}
  }
}
export default {
    state,
    mutations,
    actions,
    getters
    
}