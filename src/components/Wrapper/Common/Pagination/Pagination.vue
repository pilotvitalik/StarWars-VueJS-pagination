<template>
	<div id='pagination'>
		<div>
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
  padding-bottom: 20px;
  &>div{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: relative;
    width: 500px;
    height: 40px;
    margin: 0 auto;
    button{
      display: inline-block;
      position: relative;
      width: 40px;
      height: 40px;
      border: none;
      background: #808080;
      border-radius: 4px;
      box-shadow: inset 0 5px 10px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.5);
      outline: none;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
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
</style>
