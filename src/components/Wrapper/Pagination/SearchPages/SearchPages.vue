<template>
  <div id='searchPages' v-show='showPages'>
    <router-link
    @click.native='searchPagination(1)'
    :to="{ path: 'search', query: {result: result}}"
    active-class='active' tag='button'
    :key='1' exact>
    1
    </router-link>
    <router-link
    v-for='page in pages'
    @click.native = 'searchPagination(page)'
    :to="{ path: 'search', query: {result: result, page: page} }"
    active-class='active' tag='button'
    :key='page.id' exact>
    {{page}}
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    searchPagination(page) {
      this.$store.dispatch('searchPagination', page);
    },
  },
  computed: {
    pages() {
      return this.$store.state.searchPage.pages;
    },
    result() {
      return this.$store.state.searchPage.searchResult;
    },
    showPages() {
      return this.$store.state.searchPage.isShowSearchPages;
    },
  },
};
</script>

<style lang='less'>
.display{
display: none;
}
</style>
