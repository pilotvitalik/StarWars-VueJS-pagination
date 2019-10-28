<template>
	<div id='AllHeroes'>
		  <Search></Search>
    <transition name='slide-fade' type='transition'>
		<nav class='left'  v-if='isAnimation'>
      <transition name='changeComponent' mode='out-in'>
        <component :is='view' :people='peoples'></component>
      </transition>
		</nav>
    </transition>
    <LoadingPage v-if='showLoadPage'></LoadingPage>
	</div>
</template>

<script>
import {bus} from '../../../../main.js'

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

  import LoadingPage from '../../Preloader/LoadingPage/LoadingPage.vue'
  import ListCarts from './ListCarts/ListCarts.vue'
  import Search from './Search/Search.vue';
  import SearchCarts from './SearchCarts/SearchCarts.vue'

export default {
  components: {
    LoadingPage:LoadingPage,
    ListCarts: ListCarts,
    Search: Search,
    SearchCarts: SearchCarts,
  },
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
            show: false,
            person:[],
            id: '',
            request: {
              people: false,
            },
            showLoadPage: false,
            isAnimation: false,
            isNavigation: false,
            view: ListCarts,
            isSearch: false,
            isCreateSearch: false,
      };
  },
    methods: {
      descript(people) {
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
          this.$http.get(people.homeworld).then(responsive => {
            if(responsive.ok == true){
              bus.$emit('planet', responsive.data.name)
            }
          })
          for(let i = 0; i < people.films.length; i++){
            this.$http.get(people.films[i]).then(responsive => {
              bus.$emit('sh', false)
              if(responsive.ok == true){
                arr.push(responsive.data.title)
                bus.$emit('films', arr)
              }
            })
          }
          this.person.push(obj)
          bus.$emit('add', this.person)
        } 
      },
      initialLoading(){
          //----------Initial loading---------------------------------------------- 
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
                        if(response.ok == true){
                          setTimeout(() => { 
                              this.isAnimation = true;
                            }, 980)
                          setTimeout(() => {
                            document.querySelector('body').style.overflowY = 'auto';
                            document.querySelector('body').style.pointerEvents = 'auto';
                              let withScroll = document.documentElement.clientWidth
                              let outScroll = window.innerWidth
                              let body = document.querySelector('body')
                              let headerTitle = document.querySelector('#Header>.logo')
                              let left =  document.querySelectorAll('.left')
                              let padding = document.querySelector('.padding');
                              if(withScroll < outScroll){
                                let delta = (outScroll - withScroll)*100/outScroll;
                                let newDelta = parseFloat(delta.toFixed(2), 10);  
                                body.style.width = (100+newDelta)+'%';
                                body.style.overflowX = 'hidden';
                                headerTitle.style.paddingLeft = -newDelta+'%';
                                for(let i = 0; i < left.length; i++){
                                  left[i].style.paddingLeft = -newDelta+'%';
                                }
                              }
                              if(outScroll <= 767){
                                body.style.width = outScroll
                              }
                          }, 3980)
                        }
                        bus.$emit('people', response.ok)
                      }
                    })
                  }, response => {
                    console.log('errorPeople')
                    console.log(response)
                  })  
          //----------End initial loading------------------
      },
      pages() {
        let page = this.$route.query.page
        let tempArr = [];
        let tempSpecie = [];
        let statusSpecies = [];
        let counter = 0;
        this.$http.get('https://swapi.co/api/people/?page=' + page)
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
                    if(response.ok == true){
                      setTimeout(() => {
                        this.showLoadPage = false;
                        bus.$emit('displayCarts', true)
                        this.isAnimation = true;
                      }, 1000)
                      setTimeout(() => {
                        bus.$emit('notDisplayCarts', false)
                        document.querySelector('body').style.overflowY = 'auto';
                        document.querySelector('body').style.pointerEvents = 'auto';
                      }, 4000)
                    }
                  }
                })
              }, response => {
                console.log('errorPeople')
              })
      },
      initialPages() {
        let page = this.$route.query.page
        let tempArr = [];
        let tempSpecie = [];
        let statusSpecies = [];
        let counter = 0;
        this.$http.get('https://swapi.co/api/people/?page=' + page)
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
                    if(response.ok == true){
                      setTimeout(() => { 
                          this.isAnimation = true;
                        }, 980)
                      setTimeout(() => {
                        document.querySelector('body').style.overflowY = 'auto';
                        document.querySelector('body').style.pointerEvents = 'auto';
                          let withScroll = document.documentElement.clientWidth
                          let outScroll = window.innerWidth
                          let body = document.querySelector('body')
                          let headerTitle = document.querySelector('#Header>.logo')
                          let left =  document.querySelectorAll('.left')
                          let padding = document.querySelector('.padding');
                          if(withScroll < outScroll){
                            let delta = (outScroll - withScroll)*100/outScroll;
                            let newDelta = parseFloat(delta.toFixed(2), 10);  
                            body.style.width = (100+newDelta)+'%';
                            body.style.overflowX = 'hidden';
                            headerTitle.style.paddingLeft = -newDelta+'%';
                            for(let i = 0; i < left.length; i++){
                              left[i].style.paddingLeft = -newDelta+'%';
                            }
                          }
                          if(outScroll <= 767){
                            body.style.width = outScroll
                          }
                      }, 3980)
                    }
                    bus.$emit('people', response.ok)
                  }
                })
              }, response => {
                console.log('errorPeople')
              })
      },
      initialLoadingNavigate(){
          //----------Initial loading---------------------------------------------- 
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
                        if(response.ok == true){
                          setTimeout(() => {
                            this.showLoadPage = false;
                            this.isAnimation = true;
                            bus.$emit('displayCarts', true)
                          }, 1000)
                          setTimeout(() => {
                            bus.$emit('notDisplayCarts', false)
                            document.querySelector('body').style.overflowY = 'auto';
                            document.querySelector('body').style.pointerEvents = 'auto';
                          }, 4000)
                        }
                      }
                    })
                  }, response => {
                    console.log('errorPeople')
                    console.log(response)
                  })  
          //----------End initial loading------------------
      },
      navigation() {
        if(this.isNavigation == false){
          if(this.$route.fullPath == '/'){
            this.initialLoading();
          }else{
            this.initialPages()
          }
        }
        bus.$on('numberPage', data => {
          this.isNavigation == data
          if(data == true){
            this.showLoadPage = true;
            bus.$emit('isnotDisplay', true)
            document.querySelector('body').style.overflowY = 'hidden';
            document.querySelector('body').style.width = '100%';
            if(this.$route.fullPath == '/'){
              this.initialLoadingNavigate();
            }else{
              this.pages()
            }
          }else{
            this.showLoadPage = false;
            this.isnotDisplay = false;
          }
        })
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
      this.navigation();
      bus.$on('modalWindow', data => {
        this.descript(data);
        console.log(data)
      })
      bus.$on('modalWindo', data => {
        this.descript(data);
        console.log(data)
      })
      
      
    //----------Set width when modal window closed
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
    //------------End set width-------------------------- 
    //-------------Disappear ListCarts, create SearchCarts and start animation loading
       bus.$on('search', data => {
        if(data == true){
          this.view = SearchCarts;
          this.showLoadPage = data;
        }else{
          this.view = ListCarts;
          this.showLoadPage = data;
        }
       })
       let str = '';
       bus.$on('value', data => {
        str = data;
       });
       bus.$on('created', data => {
        this.$nextTick(function() {
          this.isCreateSearch = data;
          if(this.isCreateSearch == true){
            bus.$emit('val', str)
          }else{
            console.log('element deleted')
          }
        })
       })
     //-------------------------------------------------------------   
     //---------------Stop animation loading from ListCarts to SearchCarts---------
      bus.$on('iShow', data => {
        this.showLoadPage = !data;
      })
     //----------------------------------------------------------------------------
    },
};
</script>


<style lang='less'>
.changeComponent-enter-active, .changeComponent-leave-active {
  transition: opacity 1s linear;
}
.changeComponent-enter, .changeComponent-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}



.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-enter{
  transform: translateY(100px);
}
.notDisplay{
  opacity: 0;
}
.view{
  animation: displayCarts 3s linear forwards;
}
@keyframes displayCarts{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

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
							width: 80*(80/100*130)/100%;
              margin: 0 auto;
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
							width: 80/100*130px;
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
