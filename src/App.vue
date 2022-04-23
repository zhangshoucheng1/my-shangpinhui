<template>
  <div>
   <Header/>
   <router-view></router-view>
   <Footer v-if="!$route.meta.isHaddren"/>
   
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
   Footer,
   Header
  },
  mounted(){
    this.$store.dispatch("getCategoryList");
  }
}
</script>

<style>

</style>
