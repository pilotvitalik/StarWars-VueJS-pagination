<template>
  <ul id='listCarts'>
    <li v-for='people in listCharacters' :key='people.name' @click = 'descript(people)'>
      <component :is = 'viewNameCarts' :people = "people"></component>
    </li>
  </ul>
</template>

<script>
import NamePerson from './NamePerson/NamePerson.vue';
import LoadingPage from '../../../Preloader/LoadingPage/LoadingPage.vue';

export default {
  components: {
    NamePerson,
    LoadingPage,
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
    listCharacters() {
      return this.$store.state.cart.listCharacters;
    },
    viewNameCarts() {
      return this.$store.state.views.viewNameCarts;
    },
  },
};
</script>

<style lang='less' scoped>
</style>
