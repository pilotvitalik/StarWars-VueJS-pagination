<template>
	<div id='AllHeroes'>
		<div class='search'>
			<input type='text' v-model='search' placeholder='Search by name'>
			<img :src='searchImg'>
		</div>
		<nav>
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

import luke_skywalker  from '../../../../assets/common/peoples/luke_skywalker.jpg';
import c_3po  from '../../../../assets/common/peoples/c_3po.jpg';
import r2_d2  from '../../../../assets/common/peoples/r2_d2.jpg';
import darth_vader  from '../../../../assets/common/peoples/darth_vader.jpg';
import lela_organa  from '../../../../assets/common/peoples/lela_organa.jpg';
import owen_lars  from '../../../../assets/common/peoples/owen_lars.jpg';
import beru_whitesun_lars  from '../../../../assets/common/peoples/beru_whitesun_lars.jpg';
import r5_d4  from '../../../../assets/common/peoples/r5_d4.jpg';
import biggsDarklighter  from '../../../../assets/common/peoples/biggs_darklighter.png';
import obi_wan_kenobi  from '../../../../assets/common/peoples/obi_wan_kenobi.jpg';
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
  		return this.comm.filter(hero => {
  			return hero.name.match(this.search);
  		})
  	}
  },
  created(){
  	let c = [];
  	for(let i = 0; i < 37; i++){
  		this.$http.get('https://swapi.co/api/species/' + (i+1) + '/').then(response => {
		c.push(response.body)
		this.species = c.map(item => {
  			return {
  				specie : item.name,
  				key: item.url,
  			}
  		})
	})
  	};
  	this.$http.get('https://swapi.co/api/people/').then(response => {
  		this.peoples = response.body.results;	
  		console.log(response.body)
  		let common = [];
  		for(let i = 0; i < this.peoples.length; i++){
  			for(let k = 0; k < this.images.length; k++){
  				if(i === k){
  					common.push(Object.assign(this.peoples[i],this.images[k]));
  				}
  			};
  		};
  		this.comm = common;
  		for(let j = 0; j < this.comm.length; j++){
  			this.comm[j].specie = '';
  					for(let k = 0; k < this.species.length; k++){
  						if(this.comm[j].species[0] === this.species[k].key){
  							this.comm[j].specie = this.species[k].specie;
  						}
  					}
  			}
  		for(let i = 0; i< this.comm.length; i++){
  			this.comm[i].click = false;
  		}
  	});
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
	padding-bottom: 160-32px;
	width: 100%;
	height: auto;
	background: #333;
	.search{
		display: block;
		position: relative;
		width: 800px;
		height: 29px;
		background: green;
		margin: 107px auto 80px auto;
		input{
			display: block;
			position: relative;
			width: 100%;
			height: 100%;
			padding-left: 5px;
			color: #808080;
			font-family: 'Roboto', sans-serif;
			font-weight: 500;
			font-size: 18px;
			line-height: 21px;
			background: #333;
			border: none;
			border-bottom: 1px solid #808080;
			outline: none;
		}
		img{
			display: block;
			position: absolute;
			top: 0;
			right: 5px;
		}
	}
	nav{
		display: block;
		position: relative;
		width: 592*2+32px;
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
				width: 592px;
				height: 320px;
				margin-bottom: 32px;
				background: #1a1a1a;
				border-radius: 8px;
				box-shadow: 0 10px 30px rgba(0,0,0,0.4);
					&>span{
						display: inline-block;
						position: absolute;
						color: #fff;
						font-family: 'Roboto', sans-serif;
						font-weight: bold;
						font-size: 18px;
						line-height: 21px;
						top: 183px;
						z-index: 111;
					}
				
					ul{
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						position: relative;
						width: 80px;
						height: 135px;
						top: 93px;
						li:first-child{
							display: block;
							position: relative;
							width: 100%;
							height: 80px;
							border-radius: 50%;
							background: yellow;
							overflow: hidden;
						}
						li:last-child{
							display: inline-block;
							position: relative;
							width: 100%;
							height: 15px;
							margin: 0;
							color: #808080;
							font-family: 'Roboto', sans-serif;
							font-size: 13px;
							line-height: 15px;
							text-align: center;
						}
					}
			}
			&>li:hover{
				cursor: pointer;
				box-shadow: 0 10px 40px rgba(37, 136, 167, 0.38);
			}
			&>li:first-child{
				ul{
					li:first-child{
						img{
							position: absolute;
							top: -6px;
							left: -8px;
						}
					}
				}
			}
			&>li:nth-child(2){
				ul{
					li:first-child{
						img{
							position: absolute;
							 top: -8px;
							left: -10px; 
						}
					}
				}
			}
			&>li:nth-child(3){
				ul{
					li:first-child{
						img{
							position: absolute;
							top: 0px;
							left: -10px;
						}
					}
				}
			}
			&>li:nth-child(4){
				ul{
					li:first-child{
						img{
							position: absolute;
							top: -2px;
							left: -18px;
						}
					}
				}
			}
			&>li:nth-child(5){
				ul{
					li:first-child{
						img{
							position: absolute;
							left: -11px;
						}
					}
				}
			}
			&>li:nth-child(6){
				ul{
					li:first-child{
						img{
							position: absolute;
							top: -8px;
							left: -11px;
							transform: scale(0.85);
						}
					}
				}
			}
			&>li:nth-child(7){
				ul{
					li:first-child{
						img{
							position: absolute;
							top: -8px;
							left: -11px;
							transform: scale(0.85);
						}
					}
				}
			}
			&>li:nth-child(8){
				ul{
					li:first-child{
						img{
							position: absolute;
							top: -4px;
							left: -10px;
						}
					}
				}
			}
			&>li:nth-child(9){
				ul{
					li:first-child{
						img{
							position: absolute;
							top: -1px;
							left: -10px;
						}
					}
				}
			}
			&>li:last-child{
				ul{
					li:first-child{
						img{
							position: absolute;
							top: -5px;
							left: -22px;
							transform: scale(0.9);
						}
					}
				}
			}
		}
	}
}
</style>
