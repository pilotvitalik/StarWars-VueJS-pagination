import Vue from 'vue';
import Vuex from 'vuex';
import storageRef from '../main'; // eslint-disable-line

Vue.use(Vuex);

export const store = new Vuex.Store({ // eslint-disable-line
  state: {
    images: '',
    peopleAPI: 'https://swapi.co/api/people/',
    pagesAPI: 'https://swapi.co/api/people/?page=',
    searchAPI: 'https://swapi.co/api/people/?search=',
    searchPagesAPI: '&page=',
    speciesListCarts: [],
    listCarts: '',
    listCharacters: '',
    searchListCharacters: '',
    showNavLists: false,
    showLoadPage: false,
    requestStatusPeople: false,
    requestStatusSpecies: false,
    mergeStatusArray: false,
    counter: 0,
    view: 'ListCarts',
    viewPages: 'Pages',
    viewNameCarts: 'NamePerson',
    clientWidth: '',
    // -------------Search component----------
    isActiveSearch: false,
    isDisplaySearch: true,
    isCloseSearch: false,
    searchImg: '',
    // ---------------------------------------
    // ----------------Pages-------------------
    listPages: [],
    isActive: false,
    // ----------------------------------------
    // -------------SearchPages component----------
    searchPages: [],
    searchResult: '',
    isShowSearchPages: false,
    // ---------------------------------------
    // -------------People component----------
    descriptionList: '',
    blur: '',
    showPeople: false,
    animateLoadHome: false,
    showHome: false,
    statusReceiveHome: false,
    animateLoadFilms: {
      film: false,
    },
    showFilms: false,
    statusReceiveFilms: false,
    closeBtn: '',
    calendImg: '',
    filmImg: '',
    genderImg: '',
    ufoImg: '',
    worldImg: '',
    // ---------------------------------------
  },
  getters: {
    showNavLists: (state) => { // eslint-disable-line
      return state.showNavLists;
    },
    listCharacters: (state) => { // eslint-disable-line
      return state.listCharacters;
    },
    showLoadPage: (state) => { // eslint-disable-line
      return state.showLoadPage;
    },
    showComponent: (state) => { // eslint-disable-line
      return state.view;
    },
    // -------------Search component----------
    activateSearch: (state) => { // eslint-disable-line
      return state.isActiveSearch;
    },
    displaySearch: (state) => { // eslint-disable-line
      return state.isDisplaySearch;
    },
    closeSearch: (state) => { // eslint-disable-line
      return state.isCloseSearch;
    },
    // ---------------------------------------
    // -------------People component----------
    showBlur: (state) => { // eslint-disable-line
      return state.blur;
    },
    showPeople: (state) => { // eslint-disable-line
      return state.showPeople; // eslint-disable-line
    },
    // ---------------------------------------
  },
  mutations: {
    loadingImages: (state) => {
      storageRef.child('UI/search/search.svg').getDownloadURL().then((url) => {
        state.searchImg = url;
      });
      storageRef.child('UI/descriptPerson/closeBtn.png').getDownloadURL().then((url) => {
        state.closeBtn = url;
      });
      storageRef.child('UI/descriptPerson/calend.svg').getDownloadURL().then((url) => {
        state.calendImg = url;
      });
      storageRef.child('UI/descriptPerson/film.svg').getDownloadURL().then((url) => {
        state.filmImg = url;
      });
      storageRef.child('UI/descriptPerson/gender.svg').getDownloadURL().then((url) => {
        state.genderImg = url;
      });
      storageRef.child('UI/descriptPerson/ufo.svg').getDownloadURL().then((url) => {
        state.ufoImg = url;
      });
      storageRef.child('UI/descriptPerson/world.svg').getDownloadURL().then((url) => {
        state.worldImg = url;
      });
    },
    changeImages: (state) => {
      let tempImage = [];
      storageRef.child('people').listAll().then((response) => {
        tempImage = response.items.map((item) => {
          let index = '';
          index = item.name.indexOf('.');
          return {
            imageName: item.name.slice(0, index),
            imageURL: item.fullPath,
            url: '',
          };
        });
        tempImage.forEach((item) => {
          storageRef.child(item.imageURL).getDownloadURL().then((url) => {
            item.url = url; // eslint-disable-line
          });
        });
        state.images = tempImage;
      });
    },
    requestPeopleAPI: (state) => {
      let tmpPeople = '';
      Vue.http.get(state.peopleAPI).then((response) => {
        if (state.isActive === false) {
          const pages = (Math.ceil(response.body.count / 10) + 1);
          for (let i = 2; i < pages; i++) { // eslint-disable-line
            state.listPages.push(i);
          }
        }
        state.isActive = true;
        state.requestStatusPeople = response.ok;
        tmpPeople = response.body.results;
        tmpPeople.forEach((itemPeople) => {
          itemPeople.imageName = ''; // eslint-disable-line
          itemPeople.image = ''; // eslint-disable-line
          itemPeople.speciesName = ''; // eslint-disable-line
          // -----
          itemPeople.imageName = itemPeople.name.charAt(0).toLowerCase() + itemPeople.name.slice(1); // eslint-disable-line
          itemPeople.imageName = itemPeople.imageName.replace('-', '').replace(' ', '').replace(' ', ''); // eslint-disable-line
          // -----
          state.images.forEach((item) => {
            if (itemPeople.imageName === item.imageName) {
              itemPeople.image = item.url; // eslint-disable-line
            }
          });
          state.listCarts = tmpPeople;
          state.speciesListCarts.push(itemPeople.species);
        });
      });
    },
    requestSpeciesAPI: (state) => {
      let tmpSpecies = [];
      const uniqSpecies = [];
      state.speciesListCarts.forEach((item) => {
        item.forEach((species) => {
          tmpSpecies.push(species);
        });
      });
      state.speciesListCarts = [];
      for (const str of tmpSpecies) { // eslint-disable-line  
        if (!uniqSpecies.includes(str)) {
          uniqSpecies.push(str);
        }
      }
      tmpSpecies = [];
      let statusSpeciesAPI = [];
      uniqSpecies.forEach((item) => {
        Vue.http.get(item).then((response) => {
          if (response.ok === true) {
            state.counter++; // eslint-disable-line
          }
          tmpSpecies.push(response);
          state.speciesListCarts = tmpSpecies.map((item) => { // eslint-disable-line
            return {
              species: item.body.name,
              url: item.url,
            };
          });
          statusSpeciesAPI = tmpSpecies.map((item) => { // eslint-disable-line
            return item.ok;
          });
          if (state.counter === uniqSpecies.length) {
            tmpSpecies = [];
            for (const str of statusSpeciesAPI) { // eslint-disable-line
              if (!tmpSpecies.includes(str)) {
                tmpSpecies.push(str);
              }
            }
            if (!tmpSpecies.includes(false)) {
              state.requestStatusSpecies = tmpSpecies[0]; // eslint-disable-line
            }
          }
        });
      });
    },
    mergeArray: (state) => {
      state.listCarts.forEach((item) => {
        if (item.species.length === 0) {
          item.speciesName = 'species uknown'; // eslint-disable-line
        }
        item.species.forEach((itemURL) => {
          state.speciesListCarts.forEach((itemSpecies) => {
            if (itemURL === itemSpecies.url) {
              item.speciesName = itemSpecies.species; // eslint-disable-line
            }
          });
        });
      });
      if (state.isActiveSearch === false) {
        state.listCharacters = state.listCarts;
      } else {
        state.searchListCharacters = state.listCarts;
      }
      state.mergeStatusArray = true;
      if (state.viewNameCarts === 'LoadingPage') {
        state.viewNameCarts = 'NamePerson';
      }
    },
    defaultWidth: () => {
      document.querySelector('body').style.overflowY = 'auto';
      document.querySelector('body').style.pointerEvents = 'auto';
      const withScroll = document.documentElement.clientWidth;
      const outScroll = window.innerWidth;
      const body = document.querySelector('body');
      const headerTitle = document.querySelector('#Header>.logo');
      const left = document.querySelectorAll('.left');
      if (withScroll < outScroll) {
        const delta = (outScroll - withScroll) * 100 / outScroll;
        const newDelta = parseFloat(delta.toFixed(2), 10);
        body.style.width = (100 + newDelta) + '%'; // eslint-disable-line
        body.style.overflowX = 'hidden';
        headerTitle.style.paddingLeft = -newDelta + '%'; // eslint-disable-line
        for (let i = 0; i < left.length; i++) { // eslint-disable-line
          left[i].style.paddingLeft = -newDelta + '%'; // eslint-disable-line
        }
      }
      if (outScroll <= 767) {
        body.style.width = outScroll;
      }
    },
    otherDefaultWidth: (state) => {
      state.showLoadPage = false;
      state.showNavLists = true;
      document.querySelector('body').style.overflowY = 'auto';
      document.querySelector('body').style.pointerEvents = 'auto';
    },
    pagination: (state, payload) => {
      let tmpPeople = '';
      Vue.http.get(state.pagesAPI + payload).then((response) => {
        if (state.isActive === false) {
          const pages = (Math.ceil(response.body.count / 10) + 1);
          for (let i = 2; i < pages; i++) { // eslint-disable-line
            state.listPages.push(i);
          }
        }
        state.isActive = true;
        state.requestStatusPeople = response.ok;
        tmpPeople = response.body.results;
        tmpPeople.forEach((itemPeople) => {
          itemPeople.imageName = ''; // eslint-disable-line
          itemPeople.image = ''; // eslint-disable-line
          itemPeople.speciesName = ''; // eslint-disable-line
          itemPeople.imageName = itemPeople.name.charAt(0).toLowerCase() + itemPeople.name.slice(1); // eslint-disable-line
          itemPeople.imageName = itemPeople.imageName.replace('-', '').replace(' ', '').replace(' ', ''); // eslint-disable-line
          state.images.forEach((item) => {
            if (itemPeople.imageName === item.imageName) {
              itemPeople.image = item.url; // eslint-disable-line
            }
          });
          state.listCarts = tmpPeople;
          state.speciesListCarts.push(itemPeople.species);
        });
      });
    },
    paginationWidthStart: (state) => {
      document.querySelector('body').style.overflowY = 'hidden';
      document.querySelector('body').style.pointerEvents = 'none';
      document.querySelector('#AllHeroes').style.width = state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('#pagination').style.width = state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('footer').style.width = state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('header').style.width = state.clientWidth + 'px'; // eslint-disable-line
    },
    paginationWidthStop: (state) => {
      document.querySelector('body').style.overflowY = 'auto';
      document.querySelector('body').style.pointerEvents = 'auto';
      document.querySelector('#AllHeroes').style.width = state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('#pagination').style.width = state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('footer').style.width = state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('header').style.width = state.clientWidth + 'px'; // eslint-disable-line
    },
    // -------------Search component----------
    activeSearch: (state) => {
      state.isActiveSearch = true;
      state.isDisplaySearch = false;
      setTimeout(() => {
        state.isDisplaySearch = true;
        state.isCloseSearch = true;
      }, 2900);
    },
    stopSearch: (state, payload) => {
      state.isActive = true;
      state.isActiveSearch = false;
      state.isDisplaySearch = true;
      state.isCloseSearch = false;
      if (payload.name === 'ListCarts') {
        state.view = 'ListCarts';
        state.viewPages = 'Pages';
      } else {
        state.view = '';
        state.viewPages = '';
        setTimeout(() => {
          state.view = 'ListCarts';
          state.viewPages = 'Pages';
        }, 1050);
      }
    },
    search: (state, payload) => {
      state.view = 'SearchCarts';
      state.isActive = false;
      state.viewPages = 'SearchPages';
      state.searchPages = [];
      let tmpPeople = '';
      Vue.http.get(state.searchAPI + payload).then((response) => {
        for (let i = 2; i < Math.ceil(response.body.count / 10) + 1; i++) { // eslint-disable-line
          state.searchPages.push(i);
        }
        state.searchResult = payload;
        state.requestStatusPeople = response.ok;
        tmpPeople = response.body.results;
        tmpPeople.forEach((itemPeople) => {
          itemPeople.imageName = ''; // eslint-disable-line
          itemPeople.image = ''; // eslint-disable-line
          itemPeople.speciesName = ''; // eslint-disable-line
          itemPeople.imageName = itemPeople.name.charAt(0).toLowerCase() + itemPeople.name.slice(1); // eslint-disable-line
          itemPeople.imageName = itemPeople.imageName.replace('-', '').replace(' ', '').replace(' ', ''); // eslint-disable-line
          state.images.forEach((item) => {
            if (itemPeople.imageName === item.imageName) {
              itemPeople.image = item.url; // eslint-disable-line
            }
          });
          state.listCarts = tmpPeople;
          state.speciesListCarts.push(itemPeople.species);
        });
      });
    },
    // ---------------------------------------
    // -------------People component----------
    descript: (state, payload) => {
      state.showPeople = true;
      state.animateLoadHome = true;
      state.animateLoadFilms.film = true;
      state.blur = 'blur(5px)';
      document.querySelector('body').style.overflowY = 'hidden';
      document.querySelector('body').style.width = '100%';
      state.descriptionList = payload;
      state.descriptionList.home = '';
      state.descriptionList.nameFilms = '';
    },
    receiveHomeWorld: (state) => {
      Vue.http.get(state.descriptionList.homeworld).then(response => { // eslint-disable-line
        if (response.ok === true) {
          state.animateLoadHome = false;
          state.descriptionList.home = response.body.name;
          setTimeout(() => {
            state.showHome = true;
          }, 350);
        }
      });
    },
    receiveFilms: (state) => {
      const arrFilms = [];
      let counterFilms = 0;
      for (let i = 0; i < state.descriptionList.films.length; i++) { // eslint-disable-line
        Vue.http.get(state.descriptionList.films[i]).then(response => { // eslint-disable-line
          if (response.ok === true) {
            counterFilms++; // eslint-disable-line
            arrFilms.push(response.data.title);
          }
          if (counterFilms === state.descriptionList.films.length) {
            state.animateLoadFilms.film = false;
            state.descriptionList.nameFilms = arrFilms;
            setTimeout(() => {
              state.showFilms = true;
            }, 350);
          }
        });
      }
    },
    closeDescript: (state) => {
      state.blur = '';
      state.descriptionList = '';
      state.animateLoadFilms.film = false;
      state.animateLoadHome = false;
      state.showPeople = false;
      state.showHome = false;
      state.showFilms = false;
      document.querySelector('body').style.overflowY = 'auto';
      const withScroll = document.documentElement.clientWidth;
      const outScroll = window.innerWidth;
      const body = document.querySelector('body');
      if (withScroll < outScroll) {
        const delta = (outScroll - withScroll) * 100 / outScroll;
        const newDelta = parseFloat(delta.toFixed(16), 10);
        body.style.width = (100 + newDelta) + '%'; // eslint-disable-line
        body.style.overflowX = 'hidden';
      }
    },
    // ---------------------------------------
    // ---------SearchPages component--------
    searchPagination: (state, payload) => {
      let tmpPeople = '';
      Vue.http.get(state.searchAPI + state.searchResult + state.searchPagesAPI + payload).then((response) => { // eslint-disable-line
        state.requestStatusPeople = response.ok;
        tmpPeople = response.body.results;
        tmpPeople.forEach((itemPeople) => {
          itemPeople.imageName = ''; // eslint-disable-line
          itemPeople.image = ''; // eslint-disable-line
          itemPeople.speciesName = ''; // eslint-disable-line
          itemPeople.imageName = itemPeople.name.charAt(0).toLowerCase() + itemPeople.name.slice(1); // eslint-disable-line
          itemPeople.imageName = itemPeople.imageName.replace('-', '').replace(' ', '').replace(' ', ''); // eslint-disable-line
          state.images.forEach((item) => {
            if (itemPeople.imageName === item.imageName) {
              itemPeople.image = item.url; // eslint-disable-line
            }
          });
          state.listCarts = tmpPeople;
          state.speciesListCarts.push(itemPeople.species);
        });
      });
    },
    // ---------------------------------------
  },
  actions: {
    initialLoad: ({ state, commit }, payload) => {
      commit('loadingImages');
      commit('changeImages');
      const timerStatusImages = setTimeout(function requestImages() {
        if (state.images !== '') {
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
        if (state.requestStatusPeople === true) {
          commit('requestSpeciesAPI');
          clearTimeout(timerStatusPeople);
        } else {
          setTimeout(requestSpecies, 1);
        }
      }, 1);
      const timerStatusSpecies = setTimeout(function requestStatusSpeciesAPI() {
        if (state.requestStatusSpecies === true) {
          commit('mergeArray');
          clearTimeout(timerStatusSpecies);
        } else {
          setTimeout(requestStatusSpeciesAPI, 1);
        }
      }, 1);
      const timerMergeArray = setTimeout(function mergeArray() {
        if (state.mergeStatusArray === true) {
          state.showNavLists = true;
          clearTimeout(timerMergeArray);
          setTimeout(() => {
            commit('defaultWidth');
            state.clientWidth = document.querySelector('#AllHeroes').clientWidth;
          }, 2000);
        } else {
          setTimeout(mergeArray, 1);
        }
      }, 980);
    },
    pagination: ({ state, commit }, payload) => {
      commit('paginationWidthStart');
      state.speciesListCarts = [];
      state.requestStatusPeople = false;
      state.requestStatusSpecies = false;
      state.counter = 0;
      state.viewNameCarts = 'LoadingPage';
      if (payload === 1) {
        commit('requestPeopleAPI');
      } else {
        commit('pagination', payload);
      }
      const timerStatusPeople = setTimeout(function requestSpecies() {
        if (state.requestStatusPeople === true) {
          commit('requestSpeciesAPI');
          clearTimeout(timerStatusPeople);
        } else {
          setTimeout(requestSpecies, 1);
        }
      }, 1);
      const timerStatusSpecies = setTimeout(function requestStatusSpeciesAPI() {
        if (state.requestStatusSpecies === true) {
          commit('mergeArray');
          clearTimeout(timerStatusSpecies);
          commit('paginationWidthStop');
        } else {
          setTimeout(requestStatusSpeciesAPI, 1);
        }
      }, 1);
    },
    // -------------Search component----------
    activeSearch: ({ commit }) => {
      commit('activeSearch');
    },
    stopSearch: ({ commit }, payload) => {
      commit('stopSearch', payload);
    },
    search: ({ state, commit }, payload) => {
      if (payload.length !== 0) {
        commit('paginationWidthStart');
      }
      state.speciesListCarts = [];
      state.requestStatusPeople = false;
      state.requestStatusSpecies = false;
      state.counter = 0;
      commit('search', payload);
      const timerStatusPeople = setTimeout(function requestSpecies() {
        if (state.requestStatusPeople === true) {
          commit('requestSpeciesAPI');
          clearTimeout(timerStatusPeople);
        } else {
          setTimeout(requestSpecies, 1);
        }
      }, 1);
      const timerStatusSpecies = setTimeout(function requestStatusSpeciesAPI() {
        if (state.requestStatusSpecies === true) {
          commit('mergeArray');
          clearTimeout(timerStatusSpecies);
          commit('paginationWidthStop');
          setTimeout(() => {
            state.isShowSearchPages = true;
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
    // ---------------------------------------
    // ---------------SearchPages component-----
    searchPagination: ({ state, commit }, payload) => {
      state.speciesListCarts = [];
      state.requestStatusPeople = false;
      state.requestStatusSpecies = false;
      state.counter = 0;
      commit('searchPagination', payload);
      const timerStatusPeople = setTimeout(function requestSpecies() {
        if (state.requestStatusPeople === true) {
          commit('requestSpeciesAPI');
          clearTimeout(timerStatusPeople);
        } else {
          setTimeout(requestSpecies, 1);
        }
      }, 1);
      const timerStatusSpecies = setTimeout(function requestStatusSpeciesAPI() {
        if (state.requestStatusSpecies === true) {
          commit('mergeArray');
          clearTimeout(timerStatusSpecies);
        } else {
          setTimeout(requestStatusSpeciesAPI, 1);
        }
      }, 1);
    },
    // -----------------------------------------
  },
});
