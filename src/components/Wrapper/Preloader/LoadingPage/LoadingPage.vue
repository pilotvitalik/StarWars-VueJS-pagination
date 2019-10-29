<template>
	<div id='loadingPage'>
		<svg>
			<circle cx='35' cy='35' r='35'></circle>
		</svg>
	</div>
</template>

<script>
import {bus} from '../../../../main.js'

export default{
	data(){
		return{

		}
	},
}
</script>

<style lang='less'>
#loadingPage{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: 100%;
	height: 100px;
	bottom: 0;
	background: transparent;
	z-index: 1000;
	opacity: 0.5;
	svg{
		position: relative;
		width: 80px;
		height: 80px;
		animation: rotate 3s linear infinite;
		circle{
			width: 100%;
			height: 100%;
			fill: none;
			stroke-width: 10;
			stroke-linecap: round;
			stroke: #00a1ff;
			transform: translate(5px,5px);
			stroke-dasharray: 200;
			stroke-dashoffset: 200;
			 animation: animate 2s linear infinite; 
		}
	}
}
@keyframes animate{
	0%, 100%{
		stroke-dashoffset: 200;
	}
	50%{
		stroke-dashoffset: 0;
	}
	50.1%{
		stroke-dashoffset: 400;
	}
}
@keyframes rotate{
	0%{
		transform: rotate(0deg);
	}
	100%{
		transform: rotate(360deg);
	}
}
</style>