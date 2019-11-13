<template>
  <div id="people" v-if = 'showPeople'>
    <div class='content'>
      <div class='close'>
        <img :src='closeBtn' @click = 'closeDescript'>
      </div>
      <div class='name'>
        <ul>
          <li><img :src='people.image'></li>
          <li><span>{{people.name}}</span></li>
        </ul>
        <span></span>
      </div>
      <div class='descript'>
        <ul class = 'firstPart'>
          <li>
            <ul>
              <li class='img'><img src='../../assets/common/calend.svg'></li>
              <li class='nameDesc'>Birth year</li>
              <li class='desc'><span>{{people.birth_year}}</span></li>
            </ul>
          </li>
          <li>
            <ul>
              <li class='img'><img src='../../assets/common/ufo.svg'></li>
              <li class='nameDesc'>Species</li>
              <li class='desc'><span>{{people.speciesName}}</span></li>
            </ul>
          </li>
          <li>
            <ul>
              <li class='img'><img src='../../assets/common/gender.svg'></li>
              <li class='nameDesc'>Gender</li>
              <li class='desc'><span>{{people.gender}}</span></li>
            </ul>
          </li>
        </ul>
        <ul class='secondPart'>
          <li>
            <ul>
              <li class='img'><img src='../../assets/common/world.svg'></li>
              <li class='nameDesc'>Homeworld</li>
              <transition>
              <PersonLoading v-if='animateLoadHome'></PersonLoading>
              </transition>
              <li class='desc' v-if='showHome'>
                  <span>{{people.home}}</span>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li class='img'><img src='../../assets/common/film.svg'></li>
              <li class='nameDesc'>Films</li>
              <transition>
                <PersonLoading  v-if='animateLoadFilms'></PersonLoading>
              </transition>
              <li class='desc'  v-if='showFilms' >
                 <span v-for='film in people.nameFilms' :key='film.id'>{{film}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import PersonLoading from '../Wrapper/Preloader/PersonLoading/personLoading.vue'

export default {
  components:{
    PersonLoading: PersonLoading,
  },
  data() {
    return {
    };
  },
  methods: {
    closeDescript() {
      this.$store.dispatch('closeDescript')
    },
  },
  computed: {
    ...mapGetters([
      'showPeople'
    ]),
    people() {
      return this.$store.state.descriptionList;
    },
    animateLoadHome() {
      return this.$store.state.animateLoadHome;
    },
    animateLoadFilms() {
      return this.$store.state.animateLoadFilms.film;
    },
    showHome() {
      return this.$store.state.showHome;
    },
    showFilms() {
      return this.$store.state.showFilms;
    },
    closeBtn() {
      return this.$store.state.closeBtn;
    }
  },
};
</script>

<style lang='less' scoped>
.v-enter-active, .v-leave-active{
  transition: opacity .3s ease;
}
.v-enter, .v-leave-to{
  opacity: 0;
}
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
  opacity: 1;
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
@media(min-width: 550px) and (max-width: 767px){
  .content{
    width: 80%;
    height: 460px;
    border-radius: 8px;
    .close{
      height: 38px;
      img{
        width: 12px;
        height: 12px;
        top: 22px;
        margin: 0 22px 0 auto;
      }
    }
    .name{
      height: 140px;
      ul{
        height: 138px;
        li:first-child{
          width: 80px;
          height: 80px;
          left: 24px;
          img{
            width: 80px;
            height: 80px;
          }
        }
        li:nth-child(2){
          height: 26px;
          left: 39px;
          span{
            font-size: 22px;
            line-height: 26px;
          }
        }
      }
      &>span{
          width: 89%;
          height: 2px;
      }
    }
    .descript{
      flex-direction: column;
      width: 89%;
      height: 188px;
      margin: 49px auto 48px auto;
      .firstPart,
      .secondPart{
        width: 100%;
        height: 104px;
        padding-left: 1%;
      }
      .firstPart{
        &>li{
          &>ul{
              li:nth-child(2){
                width: 68px;
              }
              li:last-child{
                width: auto;
                margin-left: 39px;
              }
            }
          }
      }
      .secondPart{
        width: 100%;
        height: 84px;
        &>li:first-child{
          margin-top: 20px;
          &>ul{
            li:first-child{
                width: 20px;
            }
            li:nth-child(2){
              width: 83px;
              margin-right: 24px;
            }
            .desc{
              width: 100px;
              margin-left: 0;
            }
          }
         }
        &>li:last-child{
          margin-top: 20px;
          width:  100%;
            &>ul{
              li:nth-child(2){
                width: 83px;
              }
              .desc{
                width: 200px;
                margin-left: 24px;
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
        font-size: 16px;
        line-height: 19px;  
      }
      .desc{
        width: 0px;
        span{
          font-size: 16px;
          line-height: 19px;
        }
      }
    }
  }
}
@media(min-width: 320px) and (max-width: 549px){
  .content{
    width: 100%;
    height: 460px;
    border-radius: 8px;
    .close{
      height: 38px;
      img{
        width: 12px;
        height: 12px;
        top: 22px;
        margin: 0 22px 0 auto;
      }
    }
    .name{
      height: 140px;
      ul{
        height: 138px;
        li:first-child{
          width: 80px;
          height: 80px;
          left: 24px;
          img{
            width: 80px;
            height: 80px;
          }
        }
        li:nth-child(2){
          height: 26px;
          left: 39px;
          span{
            font-size: 22px;
            line-height: 26px;
          }
        }
      }
      &>span{
          width: 89%;
          height: 2px;
      }
    }
    .descript{
      flex-direction: column;
      width: 89%;
      height: 188px;
      margin: 49px auto 48px auto;
      .firstPart,
      .secondPart{
        width: 100%;
        height: 104px;
        padding-left: 0%;
      }
      .firstPart{
        &>li{
          &>ul{
              li:nth-child(2){
                width: 68px;
              }
              li:last-child{
                width: auto;
                margin-left: 39px;
              }
            }
          }
      }
      .secondPart{
        width: 100%;
        height: 84px;
        &>li:first-child{
          margin-top: 20px;
          &>ul{
            li:first-child{
                width: 20px;
            }
            li:nth-child(2){
              width: 83px;
              margin-right: 24px;
            }
            .desc{
              width: 100px;
              margin-left: 0;
            }
          }
         }
        &>li:last-child{
          margin-top: 20px;
          width:  100%;
            &>ul{
              li:nth-child(2){
                width: 83px;
              }
              .desc{
                width: 200px;
                margin-left: 10px;
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
        font-size: 16px;
        line-height: 19px;  
      }
      .desc{
        width: 0px;
        span{
          font-size: 16px;
          line-height: 19px;
        }
      }
    }
  }
}
</style>