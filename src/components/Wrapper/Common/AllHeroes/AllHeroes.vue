<template>
	<div id='AllHeroes'>
		<div class='search left'>
			<input type='text' v-model='search' placeholder='Search by name'>
			<img :src='searchImg'>
		</div>
		<nav class='left'>
			<ul>
				<li v-for='people in filterHeroes' :key='people.id' @click = 'descript(people)'><span>{{people.name}}</span>
					<ul>
						<li><img v-bind:src="people.img"/></li>
						<li>{{people.specie}}</li>
					</ul>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import {bus} from '../../../../main.js'
import {axios} from '../../../../main.js'

import luke_skywalker  from '../../../../assets/common/peoples/luke_skywalker.png';
import c_3po  from '../../../../assets/common/peoples/c_3po.png';
import r2_d2  from '../../../../assets/common/peoples/r2_d2.png';
import darth_vader  from '../../../../assets/common/peoples/darth_vader.png';
import lela_organa  from '../../../../assets/common/peoples/lela_organa.png';
import owen_lars  from '../../../../assets/common/peoples/owen_lars.png';
import beru_whitesun_lars  from '../../../../assets/common/peoples/beru_whitesun_lars.png';
import r5_d4  from '../../../../assets/common/peoples/r5_d4.png';
import biggsDarklighter  from '../../../../assets/common/peoples/biggs_darklighter.png';
import obi_wan_kenobi  from '../../../../assets/common/peoples/obi_wan_kenobi.png';
import search from '../../../../assets/common/search.svg'

export default {
  data() {
    return {
	    	peoples:[],
	    	images: [
	    		{img: luke_skywalker},
	    		{img: c_3po},
	    		{img: r2_d2},
	    		{img: darth_vader},
	    		{img: lela_organa},
	    		{img: owen_lars},
	    		{img: beru_whitesun_lars},
	    		{img: r5_d4},
	    		{img: biggsDarklighter},
	    		{img: obi_wan_kenobi},
	    	],
	    	comm: [],
	    	species: [],
	    	searchImg: search,
	    	search: '',
	    	show: false,
	    	person:[],
	    	id: '',
	    	request: {
	    		people: false,
	    	}
    };
  },
  methods: {
  	descript: function(people){
  		let obj = {};
  		let arr = [];
  		if(this.show == false){
  			bus.$emit('show', true);
  			bus.$emit('blur', 'blur(5px)');
  			document.querySelector('body').style.overflowY = 'hidden';
  			document.querySelector('body').style.width = '100%';
  			obj = {
  				name: people.name,
  				image: people.img,
  				birth: people.birth_year,
  				specie: people.specie,
  				gender: people.gender,
  				home: people.homeworld,
  				film: '',
  				planet: '',
  			}
  			axios.get(people.homeworld).then(responsive => {
  				obj.planet = responsive.data.name
  			})
  			for(let i = 0; i < people.films.length; i++){
  				axios.get(people.films[i]).then(responsive => {
  					arr.push(responsive.data.title)
  					bus.$emit('sh', false)
  				})
  			}
  			obj.film = arr
  			this.person.push(obj)
  			bus.$emit('add', this.person)
  		}	
  	}
  },
  computed: {
  	filterHeroes: function(){
  		return this.peoples.filter(hero => {
  			return hero.name.match(this.search);
  		})
  	}
  },
  created(){
  	document.querySelector('body').style.overflowY = 'hidden';
  	document.querySelector('body').style.pointerEvents = 'none';
  	//----------Initial loading---------------------------------------------- 
  		let tempArr = [];
  		let tempSpecie = [];
  		let statusSpecies = [];
  		let counter = 0;
  		this.$http.get('https://swapi.co/api/people/')
  			.then(response => {
  					for(let i = 0; i < response.data.results.length; i++){
  						response.data.results[i].specie = '';
  						for(let k = 0; k < this.images.length; k++){
  							if(i == k){
  								this.peoples.push(Object.assign(response.data.results[i], this.images[k]))
  							}
  						}
  					}
  					for(let j = 0; j < this.peoples.length; j++){
  						for(let k = 0; k < this.peoples[j].species.length; k++){
  							tempSpecie.push(this.peoples[j].species[k])
  						}
  					}
  					for(let str of tempSpecie){
  						if(!tempArr.includes(str)){
  							tempArr.push(str)
  						}
  					}
  					tempSpecie = [];
  					for(let m = 0; m < tempArr.length; m++){
  						this.$http.get(tempArr[m]).then(response => {
  							tempSpecie.push(response.body)
  							this.species = tempSpecie.map(item => {
  								return {
  									specie : item.name,
  									url : item.url
  								}
  							})
  							for(let i = 0; i < this.peoples.length; i++){
  							  	for(let j = 0; j < this.peoples[i].species.length; j++){
  							  		for(let d = 0; d < this.species.length; d++){
  							  			if(this.peoples[i].species[j] == this.species[d].url){
  							  				this.peoples[i].specie = this.species[d].specie
  							  				
  							  			}
  							  		}
  							  	}
  		  					}
  		  					if(response.ok == true){
  								counter++
  							}
  							if(response.ok == false){
  								counter
  							}
  							if(counter === tempArr.length){
  								bus.$emit('species', true)
  							}
  							if(counter != tempArr.length){
  								bus.$emit('species', false)
  							}
  						}, response => {
  						console.log('errorSpecie')
  					})
  					}
  						bus.$on('species', data => {
  							if(data == true){
  								if(response.ok == true){
  									setTimeout(() => {
  										  document.querySelector('body').style.overflowY = 'auto';
  										  document.querySelector('body').style.pointerEvents = 'auto';
  										}, 2000)
  								}
  								bus.$emit('people', response.ok)
  							}
  						})
  					}, response => {
  						console.log('errorPeople')
  					})	
  	//----------End initial loading------------------
  	let a = [];
  	bus.$on('nextPage', data => {
  		this.id = data;
  		  	this.$nextTick(function() {
  		  		if(this.id == 1){
  		  			let tempArr = [];
  		  			let tempSpecie = [];
  		  			let statusSpecies = [];
  		  			let counter = 0;
  		  			this.$http.get('https://swapi.co/api/people/')
  		  				.then(response => {
  		  					this.peoples = [];
  		  						for(let i = 0; i < response.data.results.length; i++){
  		  							response.data.results[i].specie = '';
  		  							for(let k = 0; k < this.images.length; k++){
  		  								if(i == k){
  		  									this.peoples.push(Object.assign(response.data.results[i], this.images[k]))
  		  								}
  		  							}
  		  						}
  		  						for(let j = 0; j < this.peoples.length; j++){
  		  							for(let k = 0; k < this.peoples[j].species.length; k++){
  		  								tempSpecie.push(this.peoples[j].species[k])
  		  							}
  		  						}
  		  						for(let str of tempSpecie){
  		  							if(!tempArr.includes(str)){
  		  								tempArr.push(str)
  		  							}
  		  						}
  		  						tempSpecie = [];
  		  						for(let m = 0; m < tempArr.length; m++){
  		  							this.$http.get(tempArr[m]).then(response => {
  		  								tempSpecie.push(response.body)
  		  								this.species = tempSpecie.map(item => {
  		  									return {
  		  										specie : item.name,
  		  										url : item.url
  		  									}
  		  								})
  		  								for(let i = 0; i < this.peoples.length; i++){
  		  								  	for(let j = 0; j < this.peoples[i].species.length; j++){
  		  								  		for(let d = 0; d < this.species.length; d++){
  		  								  			if(this.peoples[i].species[j] == this.species[d].url){
  		  								  				this.peoples[i].specie = this.species[d].specie
  		  								  				
  		  								  			}
  		  								  		}
  		  								  	}
  		  			  					}
  		  			  					if(response.ok == true){
  		  									counter++
  		  								}
  		  								if(response.ok == false){
  		  									counter
  		  								}
  		  								if(counter === tempArr.length){
  		  									bus.$emit('species', true)
  		  								}
  		  								if(counter != tempArr.length){
  		  									bus.$emit('species', false)
  		  								}
  		  							}, response => {
  		  							console.log('errorSpecie')
  		  						})
  		  						}
  		  							bus.$on('species', data => {
  		  								if(data == true){
  		  									bus.$emit('people', response.ok)
  		  								}
  		  							})
  		  						}, response => {
  		  							console.log('errorPeople')
  		  						})	
  		  		}else{
					let tempArr = [];
  		  			let tempSpecie = [];
  		  			let statusSpecies = [];
  		  			let counter = 0;
  		  			this.$http.get('https://swapi.co/api/people/?page=' + this.id)
  		  				.then(response => {
  		  					this.peoples = [];
  		  						for(let i = 0; i < response.data.results.length; i++){
  		  							response.data.results[i].specie = '';
  		  							for(let k = 0; k < this.images.length; k++){
  		  								if(i == k){
  		  									this.peoples.push(Object.assign(response.data.results[i], this.images[k]))
  		  								}
  		  							}
  		  						}
  		  						for(let j = 0; j < this.peoples.length; j++){
  		  							for(let k = 0; k < this.peoples[j].species.length; k++){
  		  								tempSpecie.push(this.peoples[j].species[k])
  		  							}
  		  						}
  		  						for(let str of tempSpecie){
  		  							if(!tempArr.includes(str)){
  		  								tempArr.push(str)
  		  							}
  		  						}
  		  						tempSpecie = [];
  		  						for(let m = 0; m < tempArr.length; m++){
  		  							this.$http.get(tempArr[m]).then(response => {
  		  								tempSpecie.push(response.body)
  		  								this.species = tempSpecie.map(item => {
  		  									return {
  		  										specie : item.name,
  		  										url : item.url
  		  									}
  		  								})
  		  								for(let i = 0; i < this.peoples.length; i++){
  		  								  	for(let j = 0; j < this.peoples[i].species.length; j++){
  		  								  		for(let d = 0; d < this.species.length; d++){
  		  								  			if(this.peoples[i].species[j] == this.species[d].url){
  		  								  				this.peoples[i].specie = this.species[d].specie
  		  								  				
  		  								  			}
  		  								  		}
  		  								  	}
  		  			  					}
  		  			  					if(response.ok == true){
  		  									counter++
  		  								}
  		  								if(response.ok == false){
  		  									counter
  		  								}
  		  								if(counter === tempArr.length){
  		  									bus.$emit('species', true)
  		  								}
  		  								if(counter != tempArr.length){
  		  									bus.$emit('species', false)
  		  								}
  		  							}, response => {
  		  							console.log('errorSpecie')
  		  						})
  		  						}
  		  							bus.$on('species', data => {
  		  								if(data == true){
  		  									bus.$emit('people', response.ok)
  		  								}
  		  							})
  		  						}, response => {
  		  							console.log('errorPeople')
  		  						})	
   		  		}
  		  	})
  	})
	let withScroll = document.documentElement.clientWidth
	let outScroll = window.innerWidth
	let body = document.querySelector('body')
	let headerTitle = document.querySelector('#Header>.logo')
	let left =  document.querySelectorAll('.left')
	console.log(withScroll)
	console.log(outScroll)
	if(withScroll < outScroll){
	  let delta = (outScroll - withScroll)*100/outScroll;
	  let newDelta = parseFloat(delta.toFixed(2), 10);  
	  body.style.width = (100+newDelta)+'%';
	  body.style.overflowX = 'hidden';
	  headerTitle.style.marginRight = -newDelta+'%';
	  for(let i = 0; i < left.length; i++){
	    left[i].style.left = newDelta+'%';
	  }
	}
	if(outScroll <= 767){
	  body.style.width = outScroll
	}
  	bus.$on('showCom', data => {
  		this.show = data;
  		document.querySelector('body').style.overflowY = 'auto';
  		let withScroll = document.documentElement.clientWidth
        let outScroll = window.innerWidth
        let body = document.querySelector('body')
        if(withScroll < outScroll){
          let delta = (outScroll - withScroll)*100/outScroll;
          let newDelta = parseFloat(delta.toFixed(16), 10);
          body.style.width = (100+newDelta)+'%';
          body.style.overflowX = 'hidden';
        };
        this.person = [];
  		bus.$emit('show', false);
  	})	
  },
};
</script>


<style lang='less' scoped>
#AllHeroes{
	display: flex;
	flex-direction: column;
	position: relative;
	height: auto;
	background: #333;
	.search{
		display: block;
		position: relative;
		input{
			display: block;
			position: relative;
			width: 100%;
			height: 100%;
			color: #808080;
			font-family: 'Roboto', sans-serif;
			font-weight: 500;
			background: #333;
			border: none;
			outline: none;
		}
		img{
			display: block;
			position: absolute;
		}
	}
	nav{
		display: block;
		position: relative;
		height: auto;
		margin: 0 auto;
		&>ul{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			position: relative;
			width: 100%;
			height: auto;
			padding: 0;
			&>li{
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				background: #1a1a1a;
					&>span{
						display: inline-block;
						position: absolute;
						color: #fff;
						font-family: 'Roboto', sans-serif;
						font-weight: bold;
						z-index: 111;
					}
				
					ul{
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						position: relative;
						li:first-child{
							display: block;
							position: relative;
							width: 100%;
							border-radius: 50%;
							overflow: hidden;
							background: #1a1a1a;
						}
						li:last-child{
							display: inline-block;
							position: relative;
							width: 100%;
							color: #808080;
							font-family: 'Roboto', sans-serif;
							text-align: center;
						}
					}
			}
			&>li:hover{
				cursor: pointer;
			}
		}
	}
}
@media(min-width: 768px){
	#AllHeroes{
		padding-bottom: 100-32px;
		width: 100%;
		.search{
			width: 800*100/1440%;
			height: 29px;
			margin: 107px auto 80px auto;
			input{
				padding-left: 5px;
				font-size: 18px;
				line-height: 21px;
				border-bottom: 1px solid #808080;
			}
			img{
				top: 0;
				right: 5px;
			}
		}
		nav{
			width: 1216*100/1440%;
			&>ul{
				&>li{
					width: 592*100/1216%;
					height: 320px;
					margin-bottom: 32px;
					border-radius: 8px;
					box-shadow: 0 10px 30px rgba(0,0,0,0.4);
						&>span{
							font-size: 18px;
							line-height: 21px;
							top: 183px;
						}
						ul{
							width: 80px;
							height: 135px;
							top: 93px;
							li:first-child{
								height: 80px;
							}
							li:last-child{
								height: 15px;
								margin: 0;
								font-size: 13px;
								line-height: 15px;
							}
						}
				}
				&>li:hover{
					box-shadow: 0 10px 40px rgba(37, 136, 167, 0.38);
				}
			}
		}
	}
}
@media(min-width: 320px) and (max-width: 767px){
	#AllHeroes{
		padding-bottom: 60-24px;
		width: 100%;
		.search{
			width: 272*100/320%;
			height: 29px;
			margin: 45px auto 44px auto;
			input{
				padding-left: 5px;
				font-size: 16px;
				line-height: 19px;
				border-bottom: 1px solid #808080;
			}
			img{
				top: 0;
				right: 0;
			}
		}
		nav{
			width: 272*100/320%;
			&>ul{
				&>li{
					width: 100%;
					height: 200px;
					margin-bottom: 24px;
					border-radius: 8px;
					box-shadow: 0 10px 30px rgba(0,0,0,0.4);
						&>span{
							font-size: 18px;
							line-height: 21px;
							top: 123px;
						}
						ul{
							width: 80px;
							height: 135px;
							top: 33px;
							li:first-child{
								height: 80px;
							}
							li:last-child{
								height: 15px;
								margin: 0;
								font-size: 13px;
								line-height: 15px;
							}
						}
				}
				&>li:hover{
					box-shadow: 0 10px 40px rgba(37, 136, 167, 0.38);
				}
			}
		}
	}
}
.display{
	display: none;
}
</style>
