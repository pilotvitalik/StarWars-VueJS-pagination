<template>
	<div id='preloader'>
		<div class='loader'>
			<span>Loading...</span>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			isShow: true,
			isEditing: true
		}
	},
}
</script>

<style lang='less'>
#preloader{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: #34495e;
	z-index: 1000;
	opacity: 1;
	.loader{
		width: 200px;
		height: 200px;
		position: relative;
		box-sizing: border-box;
		border-radius: 50%;
		border-top: 10px solid #e74c3c;
		animation: preloader 2s linear infinite;
	}
	.loader::before,
	.loader::after{
		content: '';
		width: 200px;
		height: 200px;
		position: absolute;
		left: 0;
		top: -10px;
		box-sizing: border-box;
		border-radius: 50%;
	}
	.loader::before{
		border-top: 10px solid #e67e22;
		transform: rotate(120deg);
	}
	.loader::after{
		border-top: 10px solid #3498db;
		transform: rotate(240deg);
	}
	span{
		display: inline-block;
		position: absolute;
		width: 200px;
		height: 200px;
		color: #fff;
		font-family: 'Roboto', sans-serif;
		text-align: center;
		line-height: 200px;
		animation: preloaderTxt 2s linear infinite;
	}
}
@keyframes preloader{
	to{
		transform: rotate(360deg);
	}
}
@keyframes preloaderTxt{
	to{
		transform: rotate(-360deg);
	}
}
</style>