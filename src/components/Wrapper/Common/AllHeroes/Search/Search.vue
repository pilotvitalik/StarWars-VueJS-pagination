<template>
<div id='search' class='search lefts'>
<input type='text' v-model='searchTxt' placeholder='Search by name' @keyup = 'startSearch'>
<img :src='searchImg'>
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
    };
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
</style>
