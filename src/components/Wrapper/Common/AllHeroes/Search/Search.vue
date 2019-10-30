<template>
<div id='search' class='search lefts'>
<input ref='input' type='text' v-model='searchTxt' @keyup = 'startSearch' @click = 'activateSearch'>
<span class='title' :class="{clickSearch: isActive, active: isActive}">Search by name</span>
<img :src='searchImg' :class="{clickImg: isActive, active: isActive, display: !isDisplay}">
<i class="fa fa-times" aria-hidden="true" :class="{display: !isClose}" @click="stopSearch"></i>
</div>
</template>

<script>
import { bus } from '../../../../../main'

import search from '../../../../../assets/common/search.svg';

export default {
  data() {
    return {
      searchTxt: '',
      searchImg: search,
      isCreate: false,
      isActive: false,
      isDisplay: true,
      isClose: false,
    };
  },
  methods: {
    activateSearch: function() {
      this.isActive = true;
      this.isDisplay = false;
      setTimeout(() => {
        this.isDisplay = true;
      }, 2900)
       setTimeout(() => {
        this.isClose = true;
      }, 2900)
    },
    stopSearch: function(){
      this.isActive = false;
      this.isDisplay = true;
      this.isClose = false;
    }
  },
  created(){
    //---------Start tarnsfer data, create SearchCarts---
      this.startSearch = this.$debounce(event => {
        this.$router.push({name: 'search', query: {result: this.searchTxt}})
          if(this.searchTxt.length > 0){
            bus.$emit('search', true);
            if(this.isCreate == false){
                bus.$emit('value', this.searchTxt);
            }else{
                bus.$emit('newValue', this.searchTxt);
            }
          }else{
            bus.$emit('search', false);
          }
      }, 350)
    //-----------------------------------------------------
    //------------Receive info from SearchCarts-----------
      bus.$on('created', data => {
        this.isCreate = data;
      })
    //--------------------------------------------------
    }
  }
</script>

<style lang='less' scoped>
//animation search
.active{
  transition: all 3s;
}
//-----------------
.clickSearch{
        bottom: 29px !important;
        padding-top: 11px;
        left: 1px !important;
        padding-left: 2.5%;
        font-size: 13px !important;
        line-height: 15px !important;
        width: 98% !important;
      }
.clickImg{
  top: -20px !important;
  right: 97.2% !important;
  transform: scale(0.5);
}
.display{
  display: none;
}
</style>
