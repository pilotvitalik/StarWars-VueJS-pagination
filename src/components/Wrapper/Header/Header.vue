<template>
  <header id="Header">
  	<div class='head'>
  		<img src='../../../assets/header/main.png'>
  	</div>
   <div class='logo'>
   	<img class='star' src='../../../assets/header/star.png'>
   	<h3>Character encyclopedia</h3>
   	<img class='wars' src='../../../assets/header/wars.png'>
   </div>
  </header>
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
header{
	position: static;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	border: none;
	div:first-child{
		position: relative;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.8);
		&>img{
				position: absolute;
				z-index: -100;
				width: 100%;
				max-width: 100%;
				height: 100%;
			}
	}
	div:last-child{
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		&>img{
			position: relative;
			width: 100%;
		}
		h3{
			display: inline-block;
			position: relative;
			color: #fff;
			font-family: 'Roboto', sans-serif;
			font-weight: bold;
			text-transform: uppercase;
			text-align: center;
		}
	}
}
@media(min-width: 768px){
header{
    height: 273px;
		div:first-child{
			&>img{
					transform: scaleY(1.5);
				}
		}
		div:last-child{
			width: 406px;
			height: 96*2+40px;
			&>img{
				height: 96px;
			}
			h3{
				font-size: 24px;
				line-height: 28px;
				letter-spacing: 0.13em;
			}
		}
	}
}
@media(min-width: 320px) and (max-width: 767px){
header{
    height: 240px;
		div:first-child{
			&>img{
					transform: scaleX(1.3);
				}
		}
		div:last-child{
			width: 212px;
			height: 50*2+24px;
			&>img{
				height: 50px;
			}
			h3{
				font-size: 13.5px;
				line-height: 17.5px;
				letter-spacing: 0.1em;
			}
		}
	}
}
</style>
