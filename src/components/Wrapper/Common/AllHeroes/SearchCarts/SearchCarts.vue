
<template>
	<ul id='SearchCarts'>
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
import { bus } from '../../../../../main';
import { mapGetters } from 'vuex';

export default{
	data(){
		return{
			peoples:[],
			isShow: false,
			isPage: false,
			status: [],
			isNewPage: false,
		}
	},
	methods: {
		descript(people) {
			this.$store.dispatch('descript', people)
		},
		firstPage(data){
				this.$http.get('https://swapi.co/api/people/?search=' + data).then(response => {
					bus.$emit('searchPages', response.body.count)
					let tmpPeoples = [];
					tmpPeoples.push(response.body.results);
					this.peoples = tmpPeoples[0].map(item => {
						return {
							img: '',
							name: item.name,
							species: item.species[0],
							specie: '',
							birth_year: item.birth_year,
							gender: item.gender,
							homeworld: item.homeworld,
							films: item.films,
						}
					});
					let species = [];
					let uniq = [];
					for(let i = 0; i < this.peoples.length; i++){
						species.push(this.peoples[i].species)
					};
					for(let item of species){
						if(!uniq.includes(item)){
							uniq.push(item)
						}
					};
					species = [];
					bus.$emit('counterSpecies', uniq.length)
			        for (let j = 0; j < uniq.length; j++) {
			        	this.$http.get(uniq[j]).then(response => {
			        	  bus.$emit('statusreceive', response.ok)
			              species.push(response.body);
			              species = species.map((item) => {
			                return {
			                  name: item.name,
			                  url: item.url,
			                };
			              }); // eslint-disable-next-line
			              for (let m = 0; m < this.peoples.length; m++) { // eslint-disable-next-line
			                for (let n = 0; n < species.length; n++) {
			                  if (this.peoples[m].species === species[n].url) {
			                    this.peoples[m].specie = species[n].name;
			                  }
			                }
			              }
			            });
			        }
			    });
		},
		otherPages(data){
			let time = new Date();
			console.log('request new data -- ' + time.getTime())
			this.$http.get('https://swapi.co/api/people/?page=' + data + '&search=l').then(response => {
				console.log('receive new data -- ' + time.getTime())
					let tmpPeoples = [];
					tmpPeoples.push(response.body.results);
					this.peoples = tmpPeoples[0].map(item => {
						return {
							img: '',
							name: item.name,
							species: item.species[0],
							specie: '',
							birth_year: item.birth_year,
							gender: item.gender,
							homeworld: item.homeworld,
							films: item.films,
						}
					});
					console.log('fix data peopleAPI --- ' + time.getTime())
					let species = [];
					let uniq = [];
					for(let i = 0; i < this.peoples.length; i++){
						species.push(this.peoples[i].species)
					};
					for(let item of species){
						if(!uniq.includes(item)){
							uniq.push(item)
						}
					};
					species = [];
					console.log('create array uniq speciesAPI --- ' + time.getTime())
					let num = 0;
					let length = uniq.length;
					for(let b = 0; b < uniq.length; b++){
						if(uniq[b] == undefined){
							length--;
						}else{
							length
						}
					}
					bus.$emit('counterSpeciesLingth', length);
			        for (let j = 0; j < uniq.length; j++) {
			        	if(uniq[j] != undefined){
			        			console.log('request uniq speciesAPI --- ' + time.getTime())
			        			this.$http.get(uniq[j]).then(response => {
			        			num++;
			        			bus.$emit('statusOtherSpecies', num)
			        			console.log('receive uniq speciesAPI --- ' + time.getTime())
			        		      species.push(response.body);
			        		      species = species.map((item) => {
			        		        return {
			        		          name: item.name,
			        		          url: item.url,
			        		        };
			        		      }); // eslint-disable-next-line
			        		    for (let m = 0; m < this.peoples.length; m++) { // eslint-disable-next-line
			        		        for (let n = 0; n < species.length; n++) {
			        		          if (this.peoples[m].species === species[n].url) {
			        		            this.peoples[m].specie = species[n].name;
			        		            console.log('fix data speciesAPI --- ' + time.getTime())
			        		          }
			        		        }
			        		      }
			        		     for(let q = 0; q < this.peoples.length; q++){
			        		      	if(this.peoples[q].specie == ''){
			        		      		this.peoples[q].specie = 'species unknown'
			        		      	}
			        		      }
			        		    });
			        		}	        	
			        }
			    });
		},
		uniqArr(element){
			this.status.push(element);
			function uniq(element){
				return element == true
			}
			if(this.status.every(uniq) === true){
				setTimeout(() => {
					this.isShow = true;
					this.isNewPage = false;
					bus.$emit('iShow', true)
				}, 1000);
			}
		},
	},
	computed: {
	  ...mapGetters([
	    'listCharacters'
	  ]),
	},
	created(){
		let time = new Date();
				bus.$on('val',  (data) => {
					this.$nextTick(function() {
						this.firstPage(data);
					});
				});
				bus.$on('newValue',  (data) => {
					this.firstPage(data)
			    });
			    let num = 0;
				bus.$on('searchPage', (data) => {
					let time = new Date();
					console.log('receive data from click -- ' + time.getTime())
					this.otherPages(data)
					this.isNewPage = true;
					console.log('display: none -- ' + time.getTime())
					num = 0;
				});
				bus.$on('searchFirstPage', (data) => {
					this.firstPage(data);
					this.isNewPage = true;
				})
		bus.$emit('created', true)
		
		bus.$on('search', (data) => {
			this.isShow = !data;
		});
		bus.$on('isPage', (data) => {
			this.isPage = data
		})
		bus.$on('counterSpecies', dat => {
			bus.$on('statusreceive', data => {
				num++;
				if(num == dat){
					this.uniqArr(data);
				}
			})
		});
		
		bus.$on('counterSpeciesLingth', dat => {
			bus.$on('statusOtherSpecies', data => {
			if(dat == data){
				console.log('equal --- ' + time.getTime())
				setTimeout(() => {
					this.isNewPage = false
				}, 1000);
			}
		})
			})
			
  },
  beforeMounte(){
  	console.log('beforeMounte')
  },
  Mounted(){
  	console.log('Mounted')
  },
  beforeUpadate(){
  	console.log('beforeUpdate')
  },
  Updated(){
  	console.log('Updated')
  },
  beforeDestroy(){
  	bus.$off('newValue');
  	bus.$off('val');
  	bus.$off('searchPage');
  },
  destroyed(){
  	this.$router.push({name: 'ListCarts'})
  	bus.$emit('created', false)
  }
};
</script>

<style lang='less'>
.display{
display: none !important;
}
</style>
