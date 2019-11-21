import cart from './namePerson'; // eslint-disable-line
import common from './heroesWrapper';
import views from './showComponents';

export default {
  actions: {
    initialLoad: ({ commit }, payload) => {
      commit('receiveImg');
      commit('loadingImages');
      cart.receiveImg; // eslint-disable-line
      const timerStatusImages = setTimeout(function requestImages() {
        if (cart.state.images !== '') {
          if (payload.fullPath === '/') {
            commit('requestPeopleAPI');
          } else {
            commit('pagination', payload.query.page);
          }
          clearTimeout(timerStatusImages);
        } else {
          setTimeout(requestImages, 1);
        }
      }, 1);
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
      const timerMergeArray = setTimeout(function mergeArray() {
        if (cart.state.mergeStatusArray === true) {
          common.state.showNavLists = true;
          clearTimeout(timerMergeArray);
          setTimeout(() => {
            commit('defaultWidth');
            common.state.clientWidth = document.querySelector('#AllHeroes').clientWidth;
          }, 2000);
        } else {
          setTimeout(mergeArray, 1);
        }
      }, 980);
    },
    pagination: ({ commit }, payload) => {
      commit('paginationWidthStart');
      cart.state.speciesListCarts = [];
      cart.state.requestStatusPeople = false;
      cart.state.requestStatusSpecies = false;
      cart.state.counter = 0;
      views.state.viewNameCarts = 'LoadingPage';
      if (payload === 1) {
        commit('requestPeopleAPI');
      } else {
        commit('pagination', payload);
      }
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
        } else {
          setTimeout(requestStatusSpeciesAPI, 1);
        }
      }, 1);
    },
  },
};
