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
  background: #1a1a1a;
  margin: 0 auto;
  .close{
    display: block;
    position: relative;
    width: 100%;
    img{
      display: block;
      position: relative;
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
    ul{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      position: relative;
      width: 100%;
      li:first-child{
        display: block;
        position: relative;
        border-radius: 50%;
        background: #BB86FC;
        img{
          display: block;
          position: relative;
          background: #BB86FC;
          border-radius: 50%;
        }
      }
      li:nth-child(2){
        display: flex;
        flex-direction: row;
        position: relative;
        width: auto;
        span{
          display: inline-block;
          position: relative;
          width: auto;
          height: 100%;
          margin: 0;
          font-family: 'Roboto', sans-serif;
          font-weight: bold;
          color: #fff;
        }
      }
    }
    &>span{
        display: block;
        position: relative;
        margin: 0 auto;
        background: #808080;
    }
  }
.descript{
    display: flex;
    flex-direction: row;
    position: relative;
    .firstPart,
    .secondPart{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      &>li{
        display: block;
        position: relative;
        width: 100%;
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
      height: auto;
      justify-content: flex-start;
       &>li:last-child{
        height: auto;
          ul{
            &>.desc{
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: flex-start;
              position: relative;
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
      height: 100%;
      img{
        display: block;
        position: relative;
      }
    }
    .nameDesc{
      display: inline-block;
      position: relative;
      width: auto;
      height: 100%;
      font-family:'Roboto', sans-serif;
      color: #808080;
    }
    .desc{
      display: flex;
      flex-direction: row;
      position: relative;
      height: 100%;
      margin: 0 0 0 auto;
      span{
        display: inline-block;
        position: relative;
        width: auto;
        height: 100%;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        color: #fff;
      }
    }
  }
}
@media(min-width: 1150px){
  .content{
    width: 800*100/1440%;
    height: 492px;
    border-radius: 8px;
    .close{
      height: 40px;
      img{
        width: 12px;
        height: 12px;
        top: 22px;
        margin: 0 22px 0 auto;
      }
    }
    .name{
      height: 200px;
      ul{
        height: 198px;
        li:first-child{
          width: 80px;
          height: 80px;
          left: 80px;
          img{
            width: 80px;
            height: 80px;
          }
        }
        li:nth-child(2){
          height: 28px;
          margin-left: 96px;
          span{
            font-size: 24px;
            line-height: 28px;
          }
        }
      }
      &>span{
          width: 640*100/800%;
          height: 2px;
      }
    }
    .descript{
      width: 640*100/800%;
      height: 103px;
      margin: 41px auto 76px auto;
      .firstPart,
      .secondPart{
        width: 252*100/640%;
        height: 103px;
        padding-left: 1%;
      }
      .firstPart{
        &>li{
          ul{
              li:nth-child(2){
                width: 77px;
              }
              li:last-child{
                width: auto;
                margin-left: 20px;
              }
            }
          }
      }
      .secondPart{
        width: 365*100/640%;
        &>li:first-child{
          &>ul{
            li:first-child{
                width: 20px;
            }
            li:nth-child(2){
              width: 92px;
              margin-right: 24px;
            }
          }
         }
         .desc{
          width: 56%;
          margin: 0;
         }
         &>li:last-child{
          margin-top: 20px;
          width:  303px;
            &>ul{
              width: 121%;
              li:nth-child(2){
                width: 44px;
              }
              .desc{
                width: auto;
                margin-left: 72px;
                span{
                  height: 21px;
                  margin-bottom: 5px;
                }
              }
            }
         }
      }
      .img{
        width: 20px;
        img{
          width: 20px;
          height: 20px;
        }
      }
      .nameDesc{
        margin-left: 11px;
        font-size: 18px;
        line-height: 21px;  
      }
      .desc{
        width: 120px;
        span{
          font-size: 18px;
          line-height: 21px;
        }
      }
    }
  }
}
@media(min-width: 768px) and (max-width: 1149px){
  .content{
    width: 1250*100/1440%;
    height: 492px;
    border-radius: 8px;
    .close{
      height: 40px;
      img{
        width: 12px;
        height: 12px;
        top: 22px;
        margin: 0 22px 0 auto;
      }
    }
    .name{
      height: 200px;
      ul{
        height: 198px;
        li:first-child{
          width: 80px;
          height: 80px;
          left: 80px;
          img{
            width: 80px;
            height: 80px;
          }
        }
        li:nth-child(2){
          height: 28px;
          margin-left: 96px;
          span{
            font-size: 24px;
            line-height: 28px;
          }
        }
      }
      &>span{
          width: 700*100/800%;
          height: 2px;
      }
    }
    .descript{
      width: 700*100/800%;
      height: 103px;
      margin: 41px auto 76px auto;
      .firstPart,
      .secondPart{
        width: 252*100/640%;
        height: 103px;
        padding-left: 1%;
      }
      .firstPart{
        &>li{
          ul{
              li:nth-child(2){
                width: 77px;
              }
              li:last-child{
                width: auto;
                margin-left: 20px;
              }
            }
          }
      }
      .secondPart{
        width: 365*100/640%;
        &>li:first-child{
          &>ul{
            li:first-child{
                width: 20px;
            }
            li:nth-child(2){
              width: 92px;
              margin-right: 24px;
            }
          }
         }
         .desc{
          width: 56%;
          margin: 0;
         }
         &>li:last-child{
          margin-top: 20px;
          width:  303px;
            &>ul{
              width: 121%;
              li:nth-child(2){
                width: 44px;
              }
              .desc{
                width: auto;
                margin-left: 72px;
                span{
                  height: 21px;
                  margin-bottom: 5px;
                }
              }
            }
         }
      }
      .img{
        width: 20px;
        img{
          width: 20px;
          height: 20px;
        }
      }
      .nameDesc{
        margin-left: 11px;
        font-size: 18px;
        line-height: 21px;  
      }
      .desc{
        width: 120px;
        span{
          font-size: 18px;
          line-height: 21px;
        }
      }
    }
  }
}
</style>