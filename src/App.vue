<template>
  <div id="app">
   <Wrapper></Wrapper>
   <People></People>
  </div>
</template>

<script>
import Wrapper from './components/Wrapper/Wrapper.vue';
import People from './components/People/People.vue';

export default {
  components: {
    Wrapper: Wrapper,
    People: People,
  },
  data() {
    return {
      isShow: true
    };
  },
};
</script>

<style lang='less'>
*{
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration: none;
}
</style>
