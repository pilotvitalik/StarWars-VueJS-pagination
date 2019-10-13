<template>
  <div id="wrapper" :style='{filter: blur, pointerEvents: mouse}'>
   <appHeader></appHeader>
   <router-view></router-view>
   <appFooter></appFooter>
  </div>
</template>

<script>
import {bus} from '../../main.js'

import Header from './Header/Header.vue';
import Common from './Common/Common.vue';
import Footer from './Footer/Footer.vue';

export default {
  components: {
    appHeader: Header,
    Common: Common,
    appFooter: Footer,
  },
  data() {
    return {
      blur: '',
      mouse: '',
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
    })
  }
};
</script>

<style lang='less' scoped>
</style>
