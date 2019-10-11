<template>
  <div id="people">
    <img src='https://avatars.mds.yandex.net/get-pdb/1039768/608c4d8a-da96-4738-9279-265f1b292a96/s1200'>
    <div class='cart'>
      <div class='img'>
        <img v-bind:src='img'>
      </div>
      <div class='mainInfo'>
        <ul>
          <li></li>
          <li>Name</li>
        </ul>
        <span></span>
      </div>
      <div class='descript'>
        <ul>
          <li>
            <ul>
              <li class='decript-img'><img src='../../assets/common/calend.svg'></li>
              <li class='decript-name'>Birth year</li>
              <li class='decript-value'><span>Birth year</span></li>
            </ul>
          </li>
          <li>
            <ul>
              <li class='decript-img'><img src='../../assets/common/ufo.svg'></li>
              <li class='decript-name'>Species</li>
              <li class='decript-value'><span>Species</span></li>
            </ul>
          </li>
          <li>
            <ul>
              <li class='decript-img'><img src='../../assets/common/gender.svg'></li>
              <li class='decript-name'>Gender</li>
              <li class='decript-value'><span>Gender</span></li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <ul>
              <li class='decript-img'><img src='../../assets/common/world.svg'></li>
              <li class='decript-name'>Homeworld</li>
              <li class='decript-value'><span>Homeworld</span></li>
            </ul>
          </li>
          <li>
            <ul>
              <li class='decript-img'><img src='../../assets/common/film.svg'></li>
              <li class='decript-name'>Films</li>
              <li class='decript-value'><span>Films</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import closeBtn from '../../assets/common/closeBtn.svg'

export default {
  data() {
    return {
      img: closeBtn,
    };
  },
};
</script>

<style lang='less'>
#people{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 700px;
  justify-content: center;
  align-items: center;
  &>img{
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(30px);
  }
  .cart{
    display: flex;
    position: relative;
    flex-direction: column;
    width:800px;
    height: 492px;
    background: #1a1a1a;
    border-radius: 8px;
    filter: none;
  }
  .img{
    display: block;
    position: relative;
    width: 100%;
    height: 40px; 
    &>img{
      display: block;
      position: absolute;
      width: 12px;
      height: 12px;
      top: 22px;
      right: 22px;
      z-index: 11111;
    }
  }
  .mainInfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    height: 200px;
    ul{
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      width: 640px;
      height: 80px;
      top: 40px;
      li:first-child{
        display:block;
        position: relative;
        width: 80px;
        height: 80px;
        margin-right: 16px;
        border-radius: 50%;
        background: #BB86FC;
      }
      li:last-child{
        display: inline-block;
        position: relative;
        width: 64px;
        height: 28px;
        color: #fff;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
      }
    }
    span{
      display: block;
      position: absolute;
      width: 640px;
      height: 2px;
      margin: 0 auto;
      background: #808080;
      bottom: 0;
    }
  }
  .descript{
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    height: 250px;
    &>ul:first-child,
    &>ul:last-child{
      display: block;
      position: relative;
      width: 210px;
      height: 103px;
      top: 71px;
      margin: 0 82px 0 84px;
      &>li{
        display: block;
        position: relative;
        width: 100%;
        height: 21px;
        margin-bottom: 20px;
        ul{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: 100%;
          height: 100%;
        }
      }
       &>li:last-child{
        margin-bottom: 0;
       }
    }
    &>ul:last-child{
      width: 241px;
      margin: 0;
      &>li{
          ul{
              &>.decript-value{
                  width: 94px;
              }
          }
       }
    }
    .decript-img{
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
    }
    .decript-name{
      display: inline-block;
      position: relative;
      width: auto;
      height: 100%;
      color: #808080;
      font-family: 'Roboto', sans-serif;
      font-size: 18px;
      line-height: 21px;
      margin-left: 10.5px
    }
    .decript-value{
      display: block;
      position: relative;
      width: 79px;
      height: 100%;
      margin: 0 0 0 auto;
      span{
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;
        color: #fff;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
      }
    }
  }
}
</style>
