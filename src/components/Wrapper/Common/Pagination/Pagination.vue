<template>
	<div id='pagination'>
		<div class='left'>
			<button v-for='page in pages' @click='num(page.page)' :class="{active: page.isActive}">{{page.page}}</button>
		</div>
	</div>
</template>

<script>
import {bus} from '../../../../main.js'
import {axios} from '../../../../main.js'

export default {
  data() {
    return {
	    	pages: [],
    };
  },
  methods: {
  	num: function(page){
  		bus.$emit('nextPage', page)
     for(let i = 0; i < this.pages.length; i++){
        if(page-1 === i){
          this.pages[i].isActive = true
        }else{
          this.pages[i].isActive = false
        }
      }
      if(page === 1){
        this.$router.push('/')
      }else{
        this.$router.push({ path: '/', query: { page: page } })
      }
      
  	}
  },
  created(){
  	axios
        .get('https://swapi.co/api/people/')
        .then(responsive =>{
      		let page = Math.round(responsive.data.count/10)
      		for(let i = 1; i < page+1; i++){
              this.pages.push({
                        page: i,
                        isActive: false
                      })
      		}
          this.pages[0].isActive = true;
      	})
        .catch(error => {
              for(let i = 1; i < 10; i++){
                this.pages.push({
                            page: i,
                            isActive: false
                          })
                
              }
              this.pages[0].isActive = true;
              console.log(error)
            })
        },
  }

</script>


<style lang='less' scoped>
#pagination{
  background: #333;
  border: none;
  &>div{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: relative;
    margin: 0 auto;
    button{
      display: inline-block;
      position: relative;
      border: none;
      background: #808080;
      outline: none;
      text-align: center;
      color: #565656;
    }
    .active,
    button:hover{
        cursor: pointer;
        color: #fff;
        text-shadow: 0 0 20px rgb(255,224,27), 
                     0 0 20px rgb(255,224,27),
                     0 0 20px rgb(255,224,27),
                     0 0 20px rgb(255,224,27),
                     0 0 20px rgb(255,224,27);
    }
  }
}
@media(min-width: 768px){
  #pagination{
    &>div{
      width: 500px;
      height: 60px;
      button{
        width: 40px;
        height: 40px;
        border-radius: 4px;
        box-shadow: inset 0 5px 10px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.5);
        font-size: 20px;
        line-height: 40px;
      }
    }
  }
}
</style>
