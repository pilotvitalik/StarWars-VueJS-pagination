<template>
  <div id="wrapper" :style='{filter: blur, pointerEvents: mouse}'>
   <Preloader v-if='!showNavLists'></Preloader>
   <appHeader></appHeader>
   <router-view></router-view>
   <Pages></Pages>
   <appFooter></appFooter>
  </div>
</template>

<script>
import {bus} from '../../main';
import { mapGetters } from 'vuex';

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
      request: {
        people: ''
      }
    };
  }, 
  computed: {
    ...mapGetters([
      'showNavLists',
    ]),
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
  },
}
</script>

<style lang='less' scoped>
#wrapper{
  border: none;
}
</style>
