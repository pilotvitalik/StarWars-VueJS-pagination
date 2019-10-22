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
	created(){
		let withScroll = document.documentElement.clientWidth
		let outScroll = window.innerWidth
		let body = document.querySelector('body')
		let headerTitle = document.querySelector('#Header>.logo')
		let left =  document.querySelectorAll('.left')
		let padding = document.querySelector('.padding');
		let pagination = document.querySelector('#pagination>.left');
		if(withScroll < outScroll){
		  let delta = (outScroll - withScroll)*100/outScroll;
		  let newDelta = parseFloat(delta.toFixed(2), 10);  
		  body.style.width = (100+newDelta)+'%';
		  body.style.overflowX = 'hidden';
		  for(let i = 0; i < left.length; i++){
		    left[i].style.paddingLeft = '560px';
		  }
		  pagination.style.marginRight = '50px !important';
		}
		if(outScroll <= 767){
		  body.style.width = outScroll
		}
	}
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
	height: 600px;
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