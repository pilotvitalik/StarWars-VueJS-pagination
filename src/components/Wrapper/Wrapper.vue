<template>
  <div id="wrapper" :style='{ filter: showBlur }'>
   <Preloader v-if='!showNavLists'></Preloader>
   <appHeader></appHeader>
   <router-view></router-view>
   <Pages></Pages>
   <appFooter></appFooter>
  </div>
</template>

<script>
import Header from './Header/Header.vue';
import Footer from './Footer/Footer.vue';
import Pagination from './Pagination/Pagination.vue';
import Preloader from './Preloader/InitialLoading/Preloader.vue';

export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
    Pages: Pagination,
    Preloader,
  },
  data() {
    return {
      request: {
      },
    };
  },
  computed: {
    showBlur() {
      return this.$store.state.common.blur;
    },
    showNavLists() {
      return this.$store.state.common.showNavLists;
    },
  },
};
</script>

<style lang='less' scoped>
#wrapper{
  border: none;
}
</style>
