<template>
  <div id="app">
   <appHeader></appHeader>
   <Common></Common>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Common from './components/Common.vue';

export default {
  components: {
    appHeader: Header,
    Common: Common,
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
