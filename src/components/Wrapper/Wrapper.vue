<template>
  <div id="wrapper" :style='{filter: blur, pointerEvents: mouse}'>
   <Preloader v-if='isShow'></Preloader>
   <appHeader></appHeader>
   <router-view></router-view>
   <Pages></Pages>
   <appFooter></appFooter>
  </div>
</template>

<script>
import {bus} from '../../main.js'

import Header from './Header/Header.vue';
import Footer from './Footer/Footer.vue';
import Pagination from './Pagination/Pagination.vue'
import Preloader from './Preloader/InitialLoading/Preloader.vue'

export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
    Pages: Pagination,
    Preloader: Preloader,
  },
  data() {
    return {
      blur: '',
      mouse: '',
      isShow: true,
      request: {
        people: ''
      }
    };
  }, 
  created(){
    bus.$on('blur', (data) => { 
      this.blur = data;
      this.mouse = 'none'
    });
    bus.$on('blurWrap', data => {
      this.blur = data;
      this.mouse = '';
    });
    bus.$on('sh', data => {
      this.show = false
    })
    bus.$on('people', data => {
      this.request.people = data
      this.$nextTick(function() {
        if(this.request.people == true){
          setTimeout(() => {
            this.isShow = false
          }, 980)
        }
      })
    })



  },
}
</script>

<style lang='less' scoped>
#wrapper{
  border: none;
}
</style>
