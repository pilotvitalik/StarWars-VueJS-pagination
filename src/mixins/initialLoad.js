export let species = {
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
	}
}

export let peopleCommon = {
	created(){
		this.$http.get('https://swapi.co/api/people/').then(response => {
  		  				this.peoples = response.body.results;	
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
	}
}