<template>
  <div id='common'>
    <AllHeroes/>
  </div>
</template>

<script>
import AllHeroes from './AllHeroes/AllHeroes.vue';

export default {
  components: {
    AllHeroes,
  },
  data() {
    return {
    };
  },
};
</script>


<style lang='less' scoped>
#common{
  border: none;
}
</style>
