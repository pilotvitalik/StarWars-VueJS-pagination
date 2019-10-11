<template>
  <div id="people">
    <h1>Компонент</h1>
  </div>
</template>

<script>

export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style lang='less'>

</style>
