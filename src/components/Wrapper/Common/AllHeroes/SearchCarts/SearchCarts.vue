
<template>
	<ul id='SearchCarts' :class="{display: !isShow}">
		<li v-for='people in peoples' :key='people.name' @click = 'descript(people)'>
			      <span>{{people.name}}</span>
			      <ul>
			<li>{{people.image}}</li>
			<li>{{people.specie}}</li>
		  </ul>
		</li>
	</ul>
</template>

<script>
import { bus } from '../../../../../main'

export default{
	data(){
		return{
			peoples:[],
			isShow: false,
			isPage: false,
		}
	},
	methods: {
		descript: function(people){
			bus.$emit('modalWindo', people)
		},
		firstPage(data){
				this.$http.get('https://swapi.co/api/people/?search=' + data).then(response => {
					console.log(response.body.next)
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
			        for (let j = 0; j < uniq.length; j++) {
			        	this.$http.get(uniq[j]).then(response => {
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
			              setTimeout(() => {
			              	this.isShow = true;
			              	bus.$emit('iShow', true)
			              }, 1000);
			            });
			        }
			    });
		},
		otherPages(data){
			this.$http.get('https://swapi.co/api/people/?page=' + data + '&search=l').then(response => {
				console.log(response)
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
			        for (let j = 0; j < uniq.length; j++) {
			        	if(uniq[j] != undefined){
			        			this.$http.get(uniq[j]).then(response => {
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
			        		      for(let q = 0; q < this.peoples.length; q++){
			        		      	if(this.peoples[q].specie == ''){
			        		      		this.peoples[q].specie = 'species unknown'
			        		      	}
			        		      }
			        		      console.log(this.peoples)
			        		      setTimeout(() => {
			        		      	this.isShow = true;
			        		      	bus.$emit('iShow', true)
			        		      }, 1000);
			        		    });
			        		}			        	
			        }
			    });
		}
	},
	created(){
				bus.$on('val',  (data) => {
					this.$nextTick(function() {
						this.firstPage(data);
					});
				});
				bus.$on('newValue',  (data) => {
					this.firstPage(data)
			    });
				bus.$on('searchPage', (data) => {
					this.otherPages(data)
				});
				bus.$on('searchFirstPage', (data) => {
					this.firstPage(data);
				})
		bus.$emit('created', true)
		
		bus.$on('search', (data) => {
			this.isShow = !data;
		});
		bus.$on('isPage', (data) => {
			this.isPage = data
		})
  },
  beforeDestroy(){
  	bus.$off('newValue');
  	bus.$off('val');
  	bus.$off('searchPage');
  },
  destroyed(){
  	this.$router.push({name: 'ListCarts'})
  	bus.$emit('created', false)
  	console.log('element deleted')
  }
};
</script>

<style lang='less'>
.display{
display: none !important;
}
</style>
