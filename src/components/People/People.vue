<template>
  <div id="people" v-if = 'show'>
    <div class='content'>
      <div class='close'>
        <img :src='img' @click = 'close'>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from '../../main.js'

import closeBtn from '../../assets/common/closeBtn.png'

export default {
  data() {
    return {
      img: closeBtn,
      show: false
    };
  },
  methods: {
    close: function(){
      bus.$emit('showCom', false);
      bus.$emit('blurWrap', '');
    }
  },
  created(){
    bus.$on('show', data => {
        this.show = data;
    })
  }
};
</script>

<style lang='less'>
#people{
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(128, 128, 128, 0.01);
  z-index: 1000;
}
.content{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 800px;
  height: 492px;
  background: #1a1a1a;
  border-radius: 8px;
  margin: 0 auto;
  .close{
    display: block;
    position: relative;
    width: 100%;
    height: 40px;
    img{
      display: block;
      position: relative;
      width: 12px;
      height: 12px;
      top: 22px;
      margin: 0 22px 0 auto;
    }
    img:hover{
      cursor: pointer;
    }
  }
}
</style>
