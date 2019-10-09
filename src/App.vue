<template>
  <div id="app">
   <appHeader></appHeader>
   <Common></Common>
   <appFooter></appFooter>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Common from './components/Common.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    appHeader: Header,
    Common: Common,
    appFooter: Footer,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang='less'>
*{
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
