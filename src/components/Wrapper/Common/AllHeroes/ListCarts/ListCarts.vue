<template>
	<ul id='listCarts'>
		<li v-for='people in people' :key='people.name' @click = 'descript(people)'>
	      <span :class="{notDisplay: isnotDisplay, view: displayCarts}">{{people.name}}</span>
	      <ul :class="{notDisplay: isnotDisplay, view: displayCarts}">
			<li><img v-bind:src="people.img"/></li>
			<li>{{people.specie}}</li>
		  </ul>
		</li>
	</ul>
</template>

<script>
	import {bus} from '../../../../../main.js'
	import {axios} from '../../../../../main.js'

export default{
	props: ['people'],
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