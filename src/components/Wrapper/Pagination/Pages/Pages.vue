<template>
	<div id='pages' class='left'>
      <router-link :to="{ path: '/'}" @click.native='num' active-class='active' tag='button' exact>1</router-link>
      <router-link v-for='page in pages' @click.native='num' :to="{ path: '/', query: { page: page.page } }" active-class='active' tag='button' :key='page.id' exact>{{page.page}}</router-link>
    </div>
</template>

<script>
import {bus} from '../../../../main.js'
import {axios} from '../../../../main.js'

export default{
	data(){
		return{
			pages: [],
			click: false
		}
	},
	methods: {
	  num: function() {
	    this.click = true;
	    bus.$emit('numberPage', this.click)
	  }
	},
	created(){
    axios
        .get('https://swapi.co/api/people/')
        .then(responsive =>{
          let page = Math.round(responsive.data.count/10)
          for(let i = 2; i < page+1; i++){
              this.pages.push({
                        page: i,
                        isActive: false
                      })
          }
          this.pages[0].isActive = true;
        })
        .catch(error => {
              for(let i = 2; i < 10; i++){
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

<style lang='less'>
</style>