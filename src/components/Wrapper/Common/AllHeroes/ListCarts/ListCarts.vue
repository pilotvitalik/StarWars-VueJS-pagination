<template>
	<ul id='listCarts'>
		<li v-for='people in listCharacters' :key='people.name' @click = 'descript(people)'>
	      <span :class="{notDisplay: isnotDisplay, view: displayCarts}">{{people.name}}</span>
	      <ul :class="{notDisplay: isnotDisplay, view: displayCarts}">
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
		bus.$on('isnotDisplay', data => {
			this.isnotDisplay = data;
		})
		bus.$on('displayCarts', data => {
			this.displayCarts = data;
		});
		bus.$on('notDisplayCarts', data => {
			this.displayCarts = data;
			this.isnotDisplay = data;
		})
	}
}
</script>

<style lang='less' scoped>
</style>