import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import  Detail from '@/pages/Detail' 
import  AddCartSuccess from '@/pages/AddCartSuccess' 
import  ShopCart from '@/pages/ShopCart'
import Trade  from '@/pages/Trade'
import  Pay from '@/pages/Pay'
import  PaySuccess from '@/pages/PaySuccess' 
import store from '@/store'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'


Vue.use(VueRouter)

const originPush = VueRouter.prototype.push
  VueRouter.prototype.push = function(location, onResolved,onRejected){
     if(onRejected===undefined && onResolved===undefined){
        return  originPush.call(this,location).catch(()=>{})
     }else{
         return originPush.call(this,onResolved,onRejected)
     }

  }

const router =  new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home
         },
     {
        path:'/detail/:goodsId',
        component:Detail,
        name:"detail"
     },
     {
         path:'/login',
         component:Login,
         meta:{
             isHaddren:true
         }
     },
     {   name:'search',
         path:'/search/:keyword?',//写？params参数就可以可传可不传
         component:Search
     },
     {
         path:'/register',
         component:Register,
         meta:{
            isHaddren:true
        }
     },
     {
        path: '/',
        redirect: '/home'
      },
      {
        path:'/addcartsuccess',
        component:AddCartSuccess
     },
     {
        path:'/shopcart',
        component:ShopCart
     },
     {
        path:'/trade',
        component:Trade
     },
     {
         path:'/pay',
         component:Pay
     },
     {
        path:'/paysuccess',
        component:PaySuccess
    },
    {
        path:'/center',
        component:Center,
        children:[
            {       
          path:'myorder',
          component:MyOrder    
        },
        {       
            path:'grouporder',
            component:GroupOrder    
          },
          {
              path:'',
              redirect:'myorder'
          }
    ]
    }
     
    ]
})

router.beforeEach(async(to,from,next)=>{
    let token = store.state.home.token
    let userInfo = store.state.home.userInfo.name//因为userinfo是空对象拿name比较稳妥
    if(token){//token存在代表用户登录过
        if(to.path==='/login'){//用户已经登录了还要往登录页面去跳，没有必要
           next('/')
           //next()
        }else{
            if(userInfo){
                next()
            }else{
                try{
                     await store.dispatch('getUserInfo')//根据token获取用户信息
                     next()
                }catch(error){//根据token获取用户信息,说明token过期
                   alert(error.message)
                   store.state.home.token = ''
                   localStorage.removeItem('TOKEN_KEY')
                   next('/login')
                  // next()
                }
               
            }
        }

    }else{//用户没有登录过去往 支付相关，交易相关，个人中心相关
        let targetPath = to.path
        //console.log(targetPath)
        if(targetPath.indexOf('/trade') !== -1 ||
         targetPath.indexOf('/pay') !== -1 || targetPath.startsWith('/center')){
            next('/login?redirect='+targetPath)
         }else{
             next()
         }
        
    }
})

export default router;