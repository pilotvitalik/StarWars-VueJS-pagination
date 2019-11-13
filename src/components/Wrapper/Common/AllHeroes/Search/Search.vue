<template>
<div id='search' class='search lefts'>
<input ref='input' type='text' v-model='searchTxt' @keyup = 'startSearch' @click = 'activateSearch'>
<span class='title' :class="{clickSearch: activeSearch, active: activeSearch}">Search by name</span>
<img :src='searchImg' :class="{clickImg: activeSearch, active: activeSearch, display: !displaySearch}">
<i class="fa fa-times" aria-hidden="true" :class="{display: !closeSearch}" @click="stopSearch"></i>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

import search from '../../../../../assets/common/search.svg';

export default {
  data() {
    return {
      searchTxt: '',
      searchImg: search,
      isCreate: false,
    };
  },
  methods: {
    activateSearch() {
      this.$store.dispatch('activeSearch');
    },
    stopSearch(){
      this.$store.dispatch('stopSearch');
      this.$router.push({ path: '/' })
      this.searchTxt = '';
    },
    search(searchTxt){
      this.$store.dispatch('search', searchTxt);
    }
  },
  computed: {
    ...mapGetters([
      'activeSearch',
      'displaySearch',
      'closeSearch',
    ])
  },
  created(){
    //---------Start tarnsfer data, create SearchCarts---
      this.startSearch = this.$debounce(event => {
        this.$router.push({name: 'search', query: {result: this.searchTxt}})
        this.search(this.searchTxt);
        if (this.searchTxt.length === 0){
          this.$router.push({ path: '/' })
        }
      }, 350)
    //-----------------------------------------------------
    },
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
