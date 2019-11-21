import Vue from 'vue';
import swapi from '../../api/swapi';
import cart from './namePerson'; // eslint-disable-line

export default {
  state: {
    pages: [],
    searchResult: '',
    isShowSearchPages: false,
  },
  mutations: {
    searchPagination: (state, payload) => {
      let tmpPeople = '';
      Vue.http.get(swapi.searchAPI + state.searchResult + swapi.searchPagesAPI + payload).then((response) => { // eslint-disable-line
        cart.state.requestStatusPeople = response.ok;
        tmpPeople = response.body.results;
        tmpPeople.forEach((itemPeople) => {
          itemPeople.imageName = ''; // eslint-disable-line
          itemPeople.image = ''; // eslint-disable-line
          itemPeople.speciesName = ''; // eslint-disable-line
          itemPeople.imageName = itemPeople.name.charAt(0).toLowerCase() + itemPeople.name.slice(1); // eslint-disable-line
          itemPeople.imageName = itemPeople.imageName.replace('-', '').replace(' ', '').replace(' ', ''); // eslint-disable-line
          cart.state.images.forEach((item) => {
            if (itemPeople.imageName === item.imageName) {
              itemPeople.image = item.url; // eslint-disable-line
            }
          });
          cart.state.listCarts = tmpPeople;
          cart.state.speciesListCarts.push(itemPeople.species);
        });
      });
    },
  },
  actions: {
    searchPagination: ({ commit }, payload) => {
      cart.state.speciesListCarts = [];
      cart.state.requestStatusPeople = false;
      cart.state.requestStatusSpecies = false;
      cart.state.counter = 0;
      commit('searchPagination', payload);
      const timerStatusPeople = setTimeout(function requestSpecies() {
        if (cart.state.requestStatusPeople === true) {
          commit('requestSpeciesAPI');
          clearTimeout(timerStatusPeople);
        } else {
          setTimeout(requestSpecies, 1);
        }
      }, 1);
      const timerStatusSpecies = setTimeout(function requestStatusSpeciesAPI() {
        if (cart.state.requestStatusSpecies === true) {
          commit('mergeArray');
          clearTimeout(timerStatusSpecies);
        } else {
          setTimeout(requestStatusSpeciesAPI, 1);
        }
      }, 1);
    },
  },
};
