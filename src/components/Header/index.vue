<template>
  <!-- 头部 -->
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="$store.state.home.userInfo.name">
                            <span>欢迎您:  </span>
                            <a href="" @click.prevent="$router.push('/login')">{{$store.state.home.userInfo.name}}</a>
                          <!--  <a href="###">登录</a> -->
                          <!--  <a href="###" class="register">免费注册</a> -->
                            <a href="" class="register" @click.prevent="loginOut">退出登录</a>
                        </p>
                        <p v-else>
                            <span>请</span>
                            <a href="" @click.prevent="$router.push('/login')">登录</a>
                          <!--  <a href="###">登录</a> -->
                          <!--  <a href="###" class="register">免费注册</a> -->
                            <a href="" class="register" @click.prevent="$router.push('/register')">免费注册</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <a href="###" @click.prevent="$router.push('/center')">我的订单</a>
                        <a href="###" @click.prevent="$router.push('/shopcart')">我的购物车</a>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link to="/search" class="logo" title="尚品汇">
                      <img src="./images/logo.png" alt="">
                    </router-link>
                <!--    <a class="logo" title="尚品汇" href="###" target="_blank">
                        <img src="./images/logo.png" alt="">
                    </a> -->
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyWord" />
                        <button class="sui-btn btn-xlarge btn-danger" type="button"
                         @click.prevent="toSeach">搜索</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>


export default {
  name: '',
  components: {
   
  },
  methods:{
      toSeach(){
 
      let location = {

            
              name:'search',
             params:{
                 keyword:this.keyWord||undefined
             }
          
        }
        if(this.$route.query){
            location.query = this.$route.query
            //this.$router.push(location)
        }
          this.$router.push(location)
      },
      clearKeyWord(){
          this.keyWord = ''
      },
     async loginOut(){//退出登录
         try{
             await this.$store.dispatch('getLoginOut')
             alert('退出成功，去往首页')
             this.$router.push('/')
         }catch(error){
            alert(error.message)
         }
          
      }
  },
  data(){
      return{
          keyWord:''
      }
  },
  mounted(){
      this.$bus.$on('clearKeyWord', this.clearKeyWord)
  },

}
</script>

<style lang="less" scoped>
  .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>