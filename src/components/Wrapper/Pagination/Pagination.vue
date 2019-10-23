<template>
  <div id='pagination'>
    <div class='left'>
      <router-link :to="{ path: '/'}" @click.native='num' active-class='active' tag='button' exact>1</router-link>
      <router-link v-for='page in pages' @click.native='num' :to="{ path: '/', query: { page: page.page } }" active-class='active' tag='button' :key='page.id' exact>{{page.page}}</router-link>
    </div>
  </div>
</template>

<script>
import {bus} from '../../../main.js'
import {axios} from '../../../main.js'
export default {
  data() {
    return {
        pages: [],
        click: false
    };
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
      font-family: 'Roboto', sans-serif;
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
@media(min-width: 550px) and (max-width: 767px){
  #pagination{
    &>div{
      width: 500px;
      height: 60px;
      button{
        width: 36px;
        height: 36px;
        border-radius: 4px;
        box-shadow: inset 0 5px 10px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.5);
        font-size: 18px;
        line-height: 36px;
      }
    }
  }
}
@media(min-width: 320px) and (max-width: 549px){
  #pagination{
    &>div{
      width: 100%;
      height: 60px;
      button{
        width: 25px;
        height: 25px;
        border-radius: 4px;
        box-shadow: inset 0 5px 10px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.5);
        font-size: 18px;
        line-height: 25px;
      }
    }
  }
}
</style>