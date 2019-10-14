<template>
  <div id="people" v-if = 'show'>
    <div class='content'>
      <div class='close'>
        <img :src='img' @click = 'close'>
      </div>
      <div class='name'>
        <ul>
          <li><img :src='people[0].image'></li>
          <li><span>{{people[0].name}}</span></li>
        </ul>
        <span></span>
      </div>
      <div class='descript'>
        <ul class = 'firstPart'>
          <li>
            <ul>
              <li class='img'><img src='../../assets/common/calend.svg'></li>
              <li class='nameDesc'>Birth year</li>
              <li class='desc'><span>{{people[0].birth}}</span></li>
            </ul>
          </li>
          <li>
            <ul>
              <li class='img'><img src='../../assets/common/ufo.svg'></li>
              <li class='nameDesc'>Species</li>
              <li class='desc'><span>{{people[0].specie}}</span></li>
            </ul>
          </li>
          <li>
            <ul>
              <li class='img'><img src='../../assets/common/gender.svg'></li>
              <li class='nameDesc'>Gender</li>
              <li class='desc'><span>{{people[0].gender}}</span></li>
            </ul>
          </li>
        </ul>
        <ul class='secondPart'>
          <li>
            <ul>
              <li class='img'><img src='../../assets/common/world.svg'></li>
              <li class='nameDesc'>Homeworld</li>
              <li class='desc'><span>{{people[0].planet}}</span></li>
            </ul>
          </li>
          <li>
            <ul>
              <li class='img'><img src='../../assets/common/film.svg'></li>
              <li class='nameDesc'>Films</li>
              <li class='desc'><span v-for='film in people[0].film' :key='film.id'>{{film}}</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from '../../main.js'

import closeBtn from '../../assets/common/closeBtn.png'

export default {
  data() {
    return {
      img: closeBtn,
      show: false,
      people: '',
    };
  },
  methods: {
    close: function(){
      bus.$emit('showCom', false);
      bus.$emit('blurWrap', '');
      this.people = '';
    }
  },
  created(){
    bus.$on('show', data => {
        this.show = data;
    });
    bus.$on('add', data =>{
     this.people = data
    });
  },
};
</script>

<style lang='less' scoped>
#people{
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(128, 128, 128, 0.01);
  z-index: 1000;
}
.content{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 800px;
  height: 550px;
  background: #1a1a1a;
  border-radius: 8px;
  margin: 0 auto;
  .close{
    display: block;
    position: relative;
    width: 100%;
    height: 40px;
    img{
      display: block;
      position: relative;
      width: 12px;
      height: 12px;
      top: 22px;
      margin: 0 22px 0 auto;
    }
    img:hover{
      cursor: pointer;
    }
  }
  .name{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 200px;
    ul{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      position: relative;
      width: 100%;
      height: 198px ;
      li:first-child{
        display: block;
        position: relative;
        width: 80px;
        height: 80px;
        left: 80px;
        border-radius: 50%;
        background: #BB86FC;
        img{
          display: block;
          position: relative;
          width: 80px;
          height: 80px;
          left: 80px;
          left: 0;
          border-radius: 50%;
          background: #BB86FC;
        }
      }
      li:nth-child(2){
        display: flex;
        flex-direction: row;
        position: relative;
        width: auto;
        height: 28px;
        margin-left: 96px;
        span{
          display: inline-block;
          position: relative;
          width: auto;
          height: 100%;
          margin: 0;
          font-family: 'Roboto', sans-serif;
          font-weight: bold;
          font-size: 24px;
          line-height: 28px;
          color: #fff;
        }
      }
    }
    &>span{
        display: block;
        position: relative;
        width: 640px;
        height: 2px;
        margin: 0 auto;
        background: #808080;
    }
  }
  .descript{
    display: flex;
    flex-direction: row;
    position: relative;
    width: 640px;
    height: 200px;
    margin: 41px auto 76px auto;
    .firstPart,
    .secondPart{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      width: 38%;
      height: 103px;
      padding-left: 1%;
      &>li{
        display: block;
        position: relative;
        width: 100%;
        height: 21px;
        ul{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: 100%;
          height: 100%;
        }
      }
    }
    .secondPart{
      width: 58.5%;
      height: auto;
      justify-content: flex-start;
      &>li{
        margin-left: 4%;
        width: 90%;
      }
       .desc{
        width: 56%;
        margin: 0 2% 0 auto;
       }
       &>li:last-child{
        margin-top: 20px;
        height: auto;
          ul{
            width: 106.5%;
            &>.desc{
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              position: relative;
              width: 62%;
              margin-left: 20%;
              margin-right: 0;
            }
          }
       }
    }
    .img{
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 20px;
      height: 100%;
      img{
        display: block;
        position: relative;
        width: 20px;
        height: 20px;
      }
    }
    .nameDesc{
      display: inline-block;
      position: relative;
      width: auto;
      height: 100%;
      margin-left: 11px;
      font-family:'Roboto', sans-serif;
      font-weight: 18px;
      line-height: 21px;  
      color: #808080;
    }
    .desc{
      display: flex;
      flex-direction: row;
      position: relative;
      width: 120px;
      height: 100%;
      margin: 0 0 0 auto;
      span{
        display: inline-block;
        position: relative;
        width: auto;
        height: 100%;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
        color: #fff;
      }
    }
  }
}
</style>