import Vue from 'vue';
import swapi from '../../api/swapi';
import storageRef from '../../main'; // eslint-disable-line
import page from './pages';
import views from './showComponents';
import searchPage from './searchPages'; // eslint-disable-line
import cart from './namePerson'; // eslint-disable-line

export default {
  state: {
    searchImg: '',
    isActiveSearch: false, // show component with result of search
    isDisplaySearch: true, // show search image
    isCloseSearch: false, // show button close
  },
  mutations: {
    receiveImg(state) {
      storageRef.child('UI/search/search.svg').getDownloadURL().then((url) => {
        state.searchImg = url;
      });
    },
    activeSearch: (state) => {
      state.isActiveSearch = true;
      state.isDisplaySearch = false;
      setTimeout(() => {
        state.isDisplaySearch = true;
        state.isCloseSearch = true;
      }, 2900);
    },
    stopSearch: (state, payload) => {
      page.state.isActive = true;
      state.isActiveSearch = false;
      state.isDisplaySearch = true;
      state.isCloseSearch = false;
      searchPage.state.isShowSearchPages = false;
      if (payload.name === 'ListCarts') {
        views.state.view = 'ListCarts';
        views.state.viewPages = 'Pages';
      } else {
        views.state.view = '';
        views.state.viewPages = '';
        setTimeout(() => {
          views.state.view = 'ListCarts';
          views.state.viewPages = 'Pages';
        }, 1050);
      }
    },
    search: (state, payload) => {
      views.state.view = 'SearchCarts';
      page.state.isActive = false;
      views.state.viewPages = 'SearchPages';
      searchPage.state.pages = [];
      let tmpPeople = '';
      Vue.http.get(swapi.searchAPI + payload).then((response) => {
        for (let i = 2; i < Math.ceil(response.body.count / 10) + 1; i++) { // eslint-disable-line
          searchPage.state.pages.push(i);
        }
        searchPage.state.searchResult = payload;
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
    activeSearch: ({ commit }) => {
      commit('activeSearch');
    },
    stopSearch: ({ commit }, payload) => {
      commit('stopSearch', payload);
    },
    search: ({ commit }, payload) => {
      if (payload.length !== 0) {
        commit('paginationWidthStart');
      }
      cart.state.speciesListCarts = [];
      cart.state.requestStatusPeople = false;
      cart.state.requestStatusSpecies = false;
      cart.state.counter = 0;
      commit('search', payload);
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
          commit('paginationWidthStop');
          setTimeout(() => {
            searchPage.state.isShowSearchPages = true;
          }, 1);
        } else {
          setTimeout(requestStatusSpeciesAPI, 1);
        }
      }, 1);
    },
    descript: ({ commit }, payload) => {
      commit('descript', payload);
      commit('receiveHomeWorld');
      commit('receiveFilms');
    },
    closeDescript: ({ commit }) => {
      commit('closeDescript');
    },
  },
};
