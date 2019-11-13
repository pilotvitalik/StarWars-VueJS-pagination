<template>
  <ul id='SearchCarts'>
    <li v-for='people in searchListCharacters' :key='people.name' @click = 'descript(people)'>
      <component :is = 'viewNameCarts' :people = "people"></component>
    </li>
  </ul>
</template>

<script>
import NamePerson from '../ListCarts/NamePerson/NamePerson.vue';

export default {
  components: {
    NamePerson,
  },
  data() {
    return {
    };
  },
  methods: {
    descript(people) {
      this.$store.dispatch('descript', people);
    },
  },
  computed: {
    searchListCharacters() {
      return this.$store.state.searchListCharacters;
    },
    viewNameCarts() {
      return this.$store.state.viewNameCarts;
    },
  },
};
</script>

<style lang='less'>
.display{
display: none !important;
}
</style>
