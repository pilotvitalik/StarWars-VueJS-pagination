<template>
	<ul id='listCarts'>
		<li v-for='people in listCharacters' :key='people.name' @click = 'descript(people)'>
	      <span>{{people.name}}</span>
	      <ul>
			<li><img v-bind:src="people.image"/></li>
			<li>{{people.speciesName}}</li>
		  </ul>
		</li>
	</ul>
</template>

<script>
	import {bus} from '../../../../../main.js'
	import {axios} from '../../../../../main.js'
import { mapGetters } from 'vuex';

export default{
	data(){
		return{
	    	isnotDisplay: false,
	    	displayCarts: false,
		}
	},
	methods: {
		descript: function(people){
			bus.$emit('modalWindow', people)
		}
	},
	computed: {
	  ...mapGetters([
	    'listCharacters'
	  ]),
	},
	created(){
	}
}
</script>

<style lang='less' scoped>
</style>