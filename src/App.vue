<template>
  <div id="app">
   <appHeader></appHeader>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    appHeader: Header,
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
}
</style>
