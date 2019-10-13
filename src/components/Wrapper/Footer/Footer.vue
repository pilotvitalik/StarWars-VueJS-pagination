<template>
	<footer id='footer'>
		<h3>STAR WARS CHARACTER Encyclopedia, 2019</h3>
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
	height: 120px;
	background: #1a1a1a;
	h3{
		display: inline-block;
		position: relative;
		color: #fff;
		font-family: 'Roboto',sans-serif;
		font-weight: bold;
		font-size: 18px;
		line-height: 21px;
		letter-spacing: 0.11em;
		text-transform: uppercase;
	}
}
</style>
