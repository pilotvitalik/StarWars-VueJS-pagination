<template>
  <div id='namePerson'>
    <span>{{people.name}}</span>
    <ul>
      <li><img v-bind:src="people.image"/></li>
	    <li>{{people.speciesName}}</li>
	  </ul>
  </div>
</template>

<script>
export default{
  props: ['people'],
  data() {
  	return {
  	}
  },
}
</script>

<style lang='less'>
</style>