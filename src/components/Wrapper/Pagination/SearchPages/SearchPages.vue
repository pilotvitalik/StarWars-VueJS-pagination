<template>
<div id='searchPages' :class="{display: !isShow}"> <!--eslint-disable-next-line-->
<router-link :to="{ path: 'search', query: {result: value} }" @click.native = 'clickFirstPage' active-class='active' :class="{active: isOnePage}" tag='button' :key='1' exact>
1
</router-link> <!--eslint-disable-next-line-->
<router-link v-for='page in pages' :to="{ path: 'search', query: {page: page.page, result: page.result} }" @click.native = 'click(page.page)' active-class='active' tag='button' :key='page.id' exact>
{{page.page}}
</router-link>
</div>
</template>

<script>
import { bus } from '../../../../main';

export default {
  data() {
    return {
      pages: [],
      value: '',
      isShow: false,
      isOnePage: false,
    };
  },
  methods: {
    click(page) {
      let time = new Date();
      bus.$emit('searchPage', page);
      console.log('click --' + time.getTime())
    },
    clickFirstPage() {
      bus.$emit('searchFirstPage', this.pages[0].result);
    },
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
