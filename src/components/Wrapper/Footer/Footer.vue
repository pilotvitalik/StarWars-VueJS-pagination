<template>
  <footer id='footer'>
    <h3 class='left'>STAR WARS CHARACTER Encyclopedia, 2019</h3>
  </footer>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>


<style lang='less' scoped>
#footer{
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #1a1a1a;
  border: none;
  h3{
    display: inline-block;
    position: relative;
    color: #fff;
    font-family: 'Roboto',sans-serif;
    font-weight: bold;
    text-transform: uppercase;
  }
}
@media(min-width: 768px){
  #footer{
    height: 120px;
      h3{
      font-size: 18px;
      line-height: 21px;
      letter-spacing: 0.11em;
      }
  }
}
@media(min-width: 320px) and (max-width: 767px){
  #footer{
    height: 104px;
    h3{
      width: 200px;
      height: 35px;
      font-size: 14px;
      line-height: 17.5px;
      letter-spacing: 0.11em;
      text-align: center;
    }
  }
}
</style>
