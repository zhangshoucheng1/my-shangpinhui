<template>
  <div>
   <TypeNav/>
   <ListContainer/>
   <Recommend/>
   <Rank/>
   <Like/>
   <Floor/>
   <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Brand from '@/pages/Home/Brand'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'

export default {
  name: '',
  components: {
   ListContainer,
   Recommend,
   Brand,
   Rank,
   Like,
   Floor
  }
}
</script>

<style>

</style>