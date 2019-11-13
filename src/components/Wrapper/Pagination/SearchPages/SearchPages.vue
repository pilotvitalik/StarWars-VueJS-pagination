<template>
<div id='searchPages' v-show='showPages'> <!--eslint-disable-next-line-->
<router-link @click.native='searchPagination(1)' :to="{ path: 'search', query: {result: result}}" active-class='active' tag='button' :key='1' exact>1</router-link>
<router-link v-for='page in pages' :to="{ path: 'search', query: {result: result, page: page} }" @click.native = 'searchPagination(page)' active-class='active' tag='button' :key='page.id' exact>
{{page}}
</router-link>
</div>
</template>

<script>
import { bus } from '../../../../main';

export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    searchPagination(page) {
      this.$store.dispatch('searchPagination', page)
    },
  },
  computed: {
    pages() {
      return this.$store.state.searchPages;
    },
    result() {
      return this.$store.state.searchResult;
    },
    showPages() {
      return this.$store.state.isShowSearchPages;
    },
  },
};
</script>

<style lang='less'>
.display{
display: none;
}
</style>
