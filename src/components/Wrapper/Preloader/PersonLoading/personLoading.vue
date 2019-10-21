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
	z-index: 2000;
	li{
		list-style: none;
		width: 6px;
		height: 10px;
		background: #fff;
		margin: 0 4px;
		margin-top: 5.5px;
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
		width: 189px;
		padding-left: 144px;
	}
}
@media(min-width: 768px) and (max-width: 1149px){
	#personLoading{
		width: 190px;
		padding-left: 143px;
	}
}
@media(min-width: 550px) and (max-width: 767px){
	#personLoading{
		width: 199px;
		padding-left: 134px;
	}
}
@media(min-width: 320px) and (max-width: 549px){
	#personLoading{
		width: 100px;
		padding-left: 134px;
	}
		.mobile{
		padding-left: 108px !important;
	}
}
</style>