<template>
  <div id='pages' class='left'>
    <router-link
    @click.native='pagination(1)'
    :to = "path"
    active-class='active'
    :tag='tag'
    :key='1' exact>
    1
    </router-link>
    <router-link
    v-for='page in pages'
    @click.native='pagination(page)'
    :to="{ path: '/', query: { page: page } }"
    active-class='active'
    tag='button'
    :key='page' exact>
    {{page}}
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: '/',
      tag: 'button',
    };
  },
  methods: {
    pagination(page) {
      this.$store.dispatch('pagination', page);
    },
  },
  computed: {
    pages() {
      return this.$store.state.page.listPages;
    },
  },
};
</script>

<style lang='less'>
</style>
