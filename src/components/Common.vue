<template>
	<div id='common'>
		<div class='search'>
			Поиск
		</div>
		<nav>
			<ul>
				<li><span>Name</span>
					<ul>
						<li></li>
						<li>Species</li>
					</ul>
				</li>
				<li><span>Name</span>
					<ul>
						<li></li>
						<li>Species</li>
					</ul>
				</li>
				<li><span>Name</span>
					<ul>
						<li></li>
						<li>Species</li>
					</ul>
				</li>
				<li><span>Name</span>
					<ul>
						<li></li>
						<li>Species</li>
					</ul>
				</li>
				<li><span>Name</span>
					<ul>
						<li></li>
						<li>Species</li>
					</ul>
				</li>
				<li><span>Name</span>
					<ul>
						<li></li>
						<li>Species</li>
					</ul>
				</li>
				<li><span>Name</span>
					<ul>
						<li></li>
						<li>Species</li>
					</ul>
				</li>
				<li><span>Name</span>
					<ul>
						<li></li>
						<li>Species</li>
					</ul>
				</li>
				<li><span>Name</span>
					<ul>
						<li></li>
						<li>Species</li>
					</ul>
				</li>
				<li><span>Name</span>
					<ul>
						<li></li>
						<li>Species</li>
					</ul>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
  data() {
    return {
    	blogs:[]
    };
  },
};
</script>


<style lang='less' scoped>
#common{
	display: flex;
	flex-direction: column;
	position: relative;
	padding-bottom: 160-32px;
	width: 100%;
	height: auto;
	background: #333;
	.search{
		display: block;
		position: relative;
		width: 800px;
		height: 29px;
		background: green;
		margin: 107px auto 80px auto;
	}
	nav{
		display: block;
		position: relative;
		width: 592*2+32px;
		height: auto;
		margin: 0 auto;
		&>ul{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			position: relative;
			width: 100%;
			height: auto;
			padding: 0;
			&>li{
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				width: 592px;
				height: 320px;
				margin-bottom: 32px;
				background: #1a1a1a;
				border-radius: 8px;
				box-shadow: 0 10px 30px rgba(0,0,0,0.4);
				span{
					display: inline-block;
					position: absolute;
					color: #fff;
					font-family: 'Roboto', sans-serif;
					font-weight: bold;
					font-size: 18px;
					line-height: 21px;
					top: 183px;
					z-index: 111;
				}
				ul{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					position: relative;
					width: 80px;
					height: 135px;
					top: 93px;
					li:first-child{
						display: block;
						position: relative;
						width: 100%;
						height: 80px;
						border-radius: 50%;
						background: yellow;
					}
					li:last-child{
						display: inline-block;
						position: relative;
						width: 46px;
						height: 15px;
						color: #808080;
						font-family: 'Roboto', sans-serif;
						font-size: 13px;
						line-height: 15px;
						margin: 0 auto;
					}
				}
			}
		}
	}
}
</style>
