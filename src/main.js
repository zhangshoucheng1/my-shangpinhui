import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import *as API from '@/api'
import store from '@/store'
import Pagination from '@/components/Pagination'
import'@/api'//重要测试接口用的
import { Button, MessageBox,Message } from 'element-ui';
//import {reqCategoryList} from '@/api'
//reqCategoryList()
Vue.config.productionTip = false
Vue.use(Button)
Vue.component('TypeNav', TypeNav)
Vue.component('Pagination', Pagination)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;


new Vue({
  beforeCreate(){
   Vue.prototype.$API = API
   Vue.prototype.$bus = this

  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
