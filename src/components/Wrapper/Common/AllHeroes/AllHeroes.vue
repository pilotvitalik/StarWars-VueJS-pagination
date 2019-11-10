<template>
	<div id='AllHeroes'>
		  <Search></Search>
    <transition name='slide-fade' type='transition'>
		<nav class='left'  v-if='showNavLists'>
      <transition name='changeComponent' mode='out-in'>
        <component :is='view'></component>
      </transition>
		</nav>
    </transition>
	</div>
</template>

<script>
import {bus} from '../../../../main.js';
import { mapGetters } from 'vuex';

import ListCarts from './ListCarts/ListCarts.vue'
import Search from './Search/Search.vue';
import SearchCarts from './SearchCarts/SearchCarts.vue'

export default {
  components: {
    ListCarts: ListCarts,
    Search: Search,
    SearchCarts: SearchCarts,
  },
  data() {
    return {
            show: false,
            person:[],
            view: ListCarts,
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
      initialLoad() {
        this.$store.dispatch('initialLoad', this.$route);
      },
    },
    computed: {
      ...mapGetters([
        'showNavLists',
      ]),
    },
    created(){
      document.querySelector('body').style.overflowY = 'hidden';
      document.querySelector('body').style.pointerEvents = 'none';
      this.initialLoad();
      //----------Receive data about selected character from ListCarts------------------
      bus.$on('modalWindow', data => {
        this.descript(data);
        console.log(data)
      })
      //------------End receive data about selected character from ListCarts-----------
      //----------Receive data about selected character from SearchCarts-----------------
      bus.$on('modalWindo', data => {
        this.descript(data);
      })
      //------------End receive data about selected character from SearchCarts-----------      
    //----------Set width when modal window closed------------------
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

      })
    //------------End set width-------------------------- 
    //-------------Disappear ListCarts, create SearchCarts and start animation loading
       bus.$on('search', data => {
        if(data == true){
          this.view = SearchCarts;
          this.showLoadPagee = data;
        }else{
          this.view = ListCarts;
          this.showLoadPagee = data;
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
          }
        })
       })
     //-------------------------------------------------------------   
     //---------------Stop animation loading from ListCarts to SearchCarts---------
      bus.$on('iShow', data => {
        this.showLoadPagee = !data;
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
  transition: all 2.5s ease;
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
    .title{
      display: inline-block;
      position: absolute;
      width: 100%;
      color: #808080;
      font-family: 'Roboto', sans-serif;
      pointer-events: none;
    }
		img{
			display: block;
			position: absolute;
		}
    .fa{
      display: inline-block;
      position: absolute;
      color: #808080;
    }
    .fa:hover{
      cursor: pointer;
      color: #fff;
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
      .title{
      bottom: 5px;
      left: 5px;
      font-size: 18px;
      line-height: 21px;
      }
			img{
				top: 2px;
				right: 5px;
			}
      .fa{
        top: 5px;
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
      .title{
      bottom: 5px;
      left: 5px;
      font-size: 16px;
      line-height: 19px;
      }
			img{
				top: 2px;
				right: 0;
			}
      .fa{
        top: 5px;
        right: 5px;
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
