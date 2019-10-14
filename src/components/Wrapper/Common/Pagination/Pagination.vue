<template>
	<div id='pagination'>
		<div>
			<button v-for='page in pages' @click='num(page)'><router-link :to="'/'+page">{{page}}</router-link></button>
		</div>
	</div>
</template>

<script>
import {bus} from '../../../../main.js'
import {axios} from '../../../../main.js'

export default {
  data() {
    return {
	    	pages: [],
    };
  },
  methods: {
  	num: function(page){
  		bus.$emit('nextPage', page)
  	}
  },
  created(){
  	axios.get('https://swapi.co/api/people/').then(responsive =>{
  		let page = Math.round(responsive.data.count/10)
  		for(let i = 1; i < page+1; i++){
  			this.pages.push(i)
  		}
  	})
  }
};
</script>


<style lang='less' scoped>
</style>
