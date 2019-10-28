<template>
  <div id='pagination'>
    <transition name='changePages' mode='out-in'>
      <component :is='view'></component>
    </transition>
  </div>
</template>

<script>
import {bus} from '../../../main.js'
import {axios} from '../../../main.js'

import Pages from './Pages/Pages.vue'
import SearchPages from './SearchPages/SearchPages.vue'

export default {
  components: {
    Pages: Pages,
    SearchPages: SearchPages,
  },
  data() {
    return {
      view: Pages
    };
  },
  created(){
    bus.$on('search', data => {
        if(data == true){
          this.view = SearchPages;
        }else{
          this.view = Pages;
        }
       })
  }
}
</script>


<style lang='less'>
.changePages-enter-active, .changePages-leave-active {
  transition: opacity 1s linear;
}
.changePages-enter, .changePages-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}



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