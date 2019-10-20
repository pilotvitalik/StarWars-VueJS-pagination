<template>
	<ul id='personLoading'>
		<li></li> 
		<li></li> 
		<li></li> 
		<li></li> 
		<li></li> 
	</ul>
</template>

<script>
export default{
	rdata(){
		return{

		}
	}
}
</script>

<style lang='less' scoped>
#personLoading{
	display: flex;
	position: absolute;
	width: 189px;
	z-index: 2000;
	li{
		list-style: none;
		width: 6px;
		height: 10px;
		background: #fff;
		margin: 0 4px;
		animation: animate .5s infinite alternate;
	}
	li:first-child{
		animation-delay: 0s;
	}
	li:nth-child(2){
		animation-delay: .1s;
	}
	li:nth-child(3){
		animation-delay: .2s;
	}
	li:nth-child(4){
		animation-delay: .3s;
	}
	li:last-child{
		animation-delay: .4s;
	}
}
@keyframes animate{
	0%{
		transform: scaleY(1);
	}
	25%{
		transform: scaleY(1);
	}
	50%{
		transform: scaleY(1);
	}
	75%{
		transform: scaleY(1);
	}
	100%{
		transform: scaleY(3);
	}
}
@media(min-width: 1150px){
	#personLoading{
		padding-left: 144px;
		li{
			margin-top: 5.5px
		}
	}
}
</style>