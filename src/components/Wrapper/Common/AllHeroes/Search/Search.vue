<template>
 <div id='search' class='search lefts'>
  <input ref='input' type='text' v-model='searchTxt' @keyup = 'startSearch' @click = 'activeSearch'>
  <span class='title' :class="spanClass">Search by name</span>
  <img :src='searchImg' :class="imageClass">
  <i class="fa fa-times" aria-hidden="true" :class="searchImgClass" @click="stopSearch"></i>
 </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchTxt: '',
    };
  },
  methods: {
    activeSearch() {
      this.$store.dispatch('activeSearch');
    },
    stopSearch() {
      this.$store.dispatch('stopSearch', this.$route);
      this.$router.back();
      this.searchTxt = '';
      this.$refs.input.onblur = true;
    },
    search(searchTxt) {
      this.$store.dispatch('search', searchTxt);
    },
  },
  computed: {
    ...mapGetters([
      'activateSearch',
      'displaySearch',
      'closeSearch',
    ]),
    spanClass: function() {
      return{
        clickSearch: this.activateSearch,
        active: this.activateSearch,
      };
    },
    imageClass: function() {
      return{
        clickImg: this.activateSearch,
        display: !this.displaySearch,
        active: this.activateSearch,
      };
    },
    searchImgClass() {
      return {display: !this.closeSearch};
    },
    searchImg() {
      return  this.$store.state.searchImg;
    },
  },
  created() {
    this.startSearch = this.$debounce(event => { // eslint-disable-line
      if (this.searchTxt.length !== 0) {
        this.$router.push({ name: 'search', query: { result: this.searchTxt } });
        this.search(this.searchTxt);
      } else {
        if (event.code === 'Backspace') {
          this.$router.push({ name: 'search' });
        }
      }
    }, 350);
  },
};
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
