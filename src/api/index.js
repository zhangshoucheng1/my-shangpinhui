import request from './ajax.js'

export const reqCategoryList = ()=>{//获取home页,三级分类列表

    return request({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
export const reqSearchInfo = (searchParams)=>{  //获取search页数据
    
    return request({
        url:'/list',
        method:'post',
        data:searchParams//必须是一个对象，没有也得传空对象
    })
}
export const reqDetailInfo = (skuId) => {//获取detail页动态数据
    return request({
        url:`/item/${skuId}`,
        method:'get'
    })   

}
export const reqAddOrUpdateShopCart = (skuId,skuNum) => {//detail页加入购车或更改购物车数量
   return request({
       url:`/cart/addToCart/${ skuId }/${ skuNum }`,
       method:'post'
   })

}
export const reqShopCart = () =>{
    return request({
        url:`/cart/cartList`,
        method:'GET'
    })
} 
export const reqUpdateCartOneIsCheck = (skuId,isChecked)=>{//请求购物车列表的单个商品选中状态
    return request({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'GET'
    })
}
export const reqDeleteOneCart = (skuId)=>{//删除购物车列表单个数据
    return request({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}
export const reqRegister = (userInfo)=>{//16.注册用户
    return request({
        url:`/user/passport/register`,
        method:'POST',
        data:userInfo
    })
}
export const reqCode = (phone)=>{//手机验证码
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get',
        
    })
}
export const reqLogin = (userInfo)=>{//用户登录
    return request({
        url:`/user/passport/login`,
        method:'POST',
        data:userInfo
    })
}
export const reqGetUserInfo = () =>{//获取用户信息
    return request({//参数是token已经在请求头添加了
        url:`/user/passport/auth/getUserInfo`,
        method:'get',
       
    })
}
export const reqLoginOut = () => {//退出登录
    return request({
        url:`/user/passport/logout`,
        method:'GET',
        
    })
}
export const reqUserAddress = () => {//请求获取用户地址
    return request({
        url:`/user/userAddress/auth/findUserAddressList`,
        method:'GET',
        
    })
}
export const reqTradeInfo = () =>{//trade页订单交易信息
    return request({
        url:`/order/auth/trade`,
        method:'GET',
//reqTradeInfo()测试接口用        
    })
}
export const reqSubmitOrder = (tradeNo,tradeInfo) =>{//提交trade页面订单
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'POST',
        data:tradeInfo
    })
}
export const reqPayInfo = (orderId) =>{//trade页面订单交易金额
    return request({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'GET',
        
    }) 
}
export const reqPayStatus = (orderId)=>{//支付金额轮询
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'GET',
        
    })
}
export const reqOrderList = (page,limit) =>{//center页分页查询
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'GET',
        
    })
}