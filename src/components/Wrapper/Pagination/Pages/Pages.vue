<template>
	<div id='pages' class='left'>
      <router-link v-for='page in pages' @click.native='pagination(page)' :to="{ path: '/', query: { page: page } }" active-class='active' tag='button' :key='page' exact>{{page}}</router-link>
    </div>
</template>

<script>
import {bus} from '../../../../main.js'
import {axios} from '../../../../main.js'

export default{
	data(){
		return{
		}
	},
	methods: {
	  pagination (page) {
        this.$store.dispatch('pagination', page);
        if (page === 1) {
          this.$router.push({ path: '/' });
        }
	  },
	},
  computed: {
    pages() {
      return this.$store.state.listPages;
    },
  },
  }
</script>

<style lang='less'>
</style>