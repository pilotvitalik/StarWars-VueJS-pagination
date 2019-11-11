<template>
<div id='searchPages'> <!--eslint-disable-next-line-->
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
      isShow: false,
    };
  },
  methods: {
    searchPagination(page) {
      this.$store.dispatch('searchPagination', page)
      if (page === 1) {
        this.$router.push({ path: 'search', query: {result: this.result } });
      }
    },
  },
  computed: {
    pages() {
      return this.$store.state.searchPages;
    },
    result() {
      return this.$store.state.searchResult;
    }
  },
  created() {
    bus.$on('searchPages', (data) => { // eslint-disable-next-line
      const tmpPages = Math.round(data / 10);
      const tmpArr = [];
      if (tmpPages > 0) { // eslint-disable-next-line
        for (let i = 2; i < tmpPages + 1; i++) {
          tmpArr.push(i);
          this.isOnePage = false;
        }
      } else {
        this.isOnePage = true;
      }
      bus.$emit('counter', tmpArr);
    });
    bus.$on('iShow', (data) => {
      this.isShow = data;
    });
    bus.$on('search', (data) => {
      this.isShow = !data;
    }); // eslint-disable-next-line
    bus.$on('val', (data) => {
      this.value = data;
      const str = data;
      bus.$on('counter', (dat) => { // eslint-disable-next-line
        this.pages = dat.map(item => {
          return {
            result: str,
            page: item,
          };
        });
      });
    });
  },
  beforeDestroy() {
    bus.$off('searchPages');
    bus.$off('val');
    bus.$off('newValue');
  },
};
</script>

<style lang='less'>
.display{
display: none !important;
}
</style>
