import Vue from 'vue';
import Vuex from 'vuex';

import luke_skywalker from '../assets/common/peoples/luke_skywalker.png';// eslint-disable-line
import c_3po from '../assets/common/peoples/c_3po.png';// eslint-disable-line
import r2_d2 from '../assets/common/peoples/r2_d2.png';// eslint-disable-line
import darth_vader from '../assets/common/peoples/darth_vader.png';// eslint-disable-line
import leia_organa from '../assets/common/peoples/leia_organa.png';// eslint-disable-line
import owen_lars from '../assets/common/peoples/owen_lars.png';// eslint-disable-line
import beru_whitesun_lars from '../assets/common/peoples/beru_whitesun_lars.png';// eslint-disable-line
import r5_d4 from '../assets/common/peoples/r5_d4.png';// eslint-disable-line
import biggsDarklighter from '../assets/common/peoples/biggs_darklighter.png';// eslint-disable-line
import obi_wan_kenobi from '../assets/common/peoples/obi_wan_kenobi.png';// eslint-disable-line

Vue.use(Vuex);

export const store = new Vuex.Store({ // eslint-disable-line
  state: {
    images: [
      luke_skywalker,// eslint-disable-line
      c_3po,// eslint-disable-line
      r2_d2,// eslint-disable-line
      darth_vader,// eslint-disable-line
      leia_organa,// eslint-disable-line
      owen_lars,// eslint-disable-line
      beru_whitesun_lars,// eslint-disable-line
      r5_d4,// eslint-disable-line
      biggsDarklighter,// eslint-disable-line
      obi_wan_kenobi,// eslint-disable-line
    ],
    peopleAPI: 'https://swapi.co/api/people/',
    pagesAPI: 'https://swapi.co/api/people/?page=',
    searchAPI: 'https://swapi.co/api/people/?search=',
    searchPagesAPI: '&page=',
    speciesListCarts: [],
    listCarts: '',
    listCharacters: '',
    showNavLists: false,
    showLoadPage: false,
    requestStatusPeople: false,
    requestStatusSpecies: false,
    mergeStatusArray: false,
    counter: 0,
    view: 'ListCarts',
    viewPages: 'Pages',
    //-------------Search component----------
    isActiveSearch: false,
    isDisplaySearch: true,
    isCloseSearch: false,
    //---------------------------------------
    //----------------Pages-------------------
    listPages: [],
    //----------------------------------------
    //-------------SearchPages component----------
    searchPages: [],
    searchResult: '',
    //---------------------------------------
    //-------------People component----------
    descriptionList: '',
    blur: '',
    showPeople: false,
    animateLoadHome: false,
    statusReceiveHome: false,
    animateLoadFilms: {
      film: false,
      others: false,
    },
    statusReceiveFilms: false,
    //---------------------------------------
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
    //-------------Search component----------
    activeSearch: (state) => {
      return state.isActiveSearch;
    },
    displaySearch: (state) => {
      return state.isDisplaySearch;
    },
    closeSearch: (state) => {
      return state.isCloseSearch;
    },
    //---------------------------------------
    //-------------People component----------
    showBlur: (state) => {
      return state.blur;
    },
    showPeople: (state) => {
      return state.showPeople
    }
    //---------------------------------------
  },
  mutations: {
    changeImages: (state) => {
      state.images = state.images.map((item) => { // eslint-disable-line
        return {
          url: item,
          imageName: '',
        };
      });
      state.images.forEach((item) => {
        item.imageName = item.url.slice(5, item.url.indexOf('.')); // eslint-disable-line
      });
    },
    requestPeopleAPI: (state) => {
      let tmpPeople = '';
      Vue.http.get(state.peopleAPI).then((response) => {
        let pages = (Math.ceil(response.body.count / 10) + 1);
        for (let i = 1; i < pages; i++) {
          state.listPages.push(i);
        }
        state.requestStatusPeople = response.ok;
        tmpPeople = response.body.results;
        tmpPeople.forEach((itemPeople) => {
          itemPeople.imageName = ''; // eslint-disable-line
          itemPeople.image = ''; // eslint-disable-line
          itemPeople.speciesName = ''; // eslint-disable-line
          itemPeople.imageName = itemPeople.name.toLowerCase().replace('-', '_').replace(' ', '_').replace(' ', '_'); // eslint-disable-line
          state.images.forEach((item) => {
            if (itemPeople.imageName === item.imageName) {
              itemPeople.image = item.url; // eslint-disable-line
            }
          });
          state.listCarts = tmpPeople;
          state.speciesListCarts.push(itemPeople.species)
        });
      });
    },
    requestSpeciesAPI: (state) => {
      let tmpSpecies = [];
      let uniqSpecies = [];
      state.speciesListCarts.forEach((item) => {
        item.forEach((species) => {
          tmpSpecies.push(species)
        })
      })
      state.speciesListCarts = [];
      for(let str of tmpSpecies){
        if(!uniqSpecies.includes(str)){
          uniqSpecies.push(str)
        }
      }
      tmpSpecies = [];
      let statusSpeciesAPI = [];
      uniqSpecies.forEach((item) => {
        Vue.http.get(item).then((response) => {
          if(response.ok === true){
            state.counter++;
          } else {
            state.counter
          }
          tmpSpecies.push(response);
          state.speciesListCarts = tmpSpecies.map((item) => {
            return {
              species: item.body.name,
              url: item.url,
            };
          });
          statusSpeciesAPI = tmpSpecies.map((item) => {
            return item.ok
          });
          if(state.counter === uniqSpecies.length){
            tmpSpecies = [];
            for(let str of statusSpeciesAPI){
              if(!tmpSpecies.includes(str)){
                tmpSpecies.push(str)
              }
            }
            if (!tmpSpecies.includes(false)) {
              state.requestStatusSpecies = tmpSpecies[0];
            }
          }
        })
      })
    },
    mergeArray: (state) => {
      state.listCarts.forEach((item) => {
        if(item.species.length === 0){
          item.speciesName = 'species uknown'
        }
        item.species.forEach((itemURL) => {
          state.speciesListCarts.forEach((itemSpecies) => {
            if (itemURL === itemSpecies.url) {
              item.speciesName = itemSpecies.species
            }
          });
        });
      });
      state.listCharacters = state.listCarts;
      state.mergeStatusArray = true;
    },
    defaultWidth: () => {
      document.querySelector('body').style.overflowY = 'auto';
      document.querySelector('body').style.pointerEvents = 'auto';
        let withScroll = document.documentElement.clientWidth
        let outScroll = window.innerWidth
        let body = document.querySelector('body')
        let headerTitle = document.querySelector('#Header>.logo')
        let left =  document.querySelectorAll('.left')
        let padding = document.querySelector('.padding');
        if(withScroll < outScroll){
          let delta = (outScroll - withScroll)*100/outScroll;
          let newDelta = parseFloat(delta.toFixed(2), 10);  
          body.style.width = (100+newDelta)+'%';
          body.style.overflowX = 'hidden';
          headerTitle.style.paddingLeft = -newDelta+'%';
          for(let i = 0; i < left.length; i++){
            left[i].style.paddingLeft = -newDelta+'%';
          }
        }
        if(outScroll <= 767){
          body.style.width = outScroll
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
              state.requestStatusPeople = response.ok;
              tmpPeople = response.body.results;
              tmpPeople.forEach((itemPeople) => {
                itemPeople.imageName = ''; // eslint-disable-line
                itemPeople.image = ''; // eslint-disable-line
                itemPeople.speciesName = ''; // eslint-disable-line
                itemPeople.imageName = itemPeople.name.toLowerCase().replace('-', '_').replace(' ', '_').replace(' ', '_'); // eslint-disable-line
                state.images.forEach((item) => {
                  if (itemPeople.imageName === item.imageName) {
                    itemPeople.image = item.url; // eslint-disable-line
                  }
                });
                state.listCarts = tmpPeople;
                state.speciesListCarts.push(itemPeople.species)
              });
            });
    },
    //-------------Search component----------
    activeSearch: (state) => {
      state.isActiveSearch = true;
      state.isDisplaySearch = false;
      setTimeout(() => {
        state.isDisplaySearch = true;
        state.isCloseSearch = true
      }, 2900)
    },
    stopSearch: (state) => {
      state.isActiveSearch = false;
      state.isDisplaySearch = true;
      state.isCloseSearch = false;
    },
    search: (state, payload) => {
      state.view = 'SearchCarts';
      state.viewPages = 'SearchPages';
      state.searchPages = [];
      let tmpPeople = '';
            Vue.http.get(state.searchAPI + payload).then((response) => {
              for(let i = 1; i < Math.ceil(response.body.count/10) + 1;i++){
                state.searchPages.push(i);
              }
              state.searchResult = payload;
              state.requestStatusPeople = response.ok;
              tmpPeople = response.body.results;
              tmpPeople.forEach((itemPeople) => {
                itemPeople.imageName = ''; // eslint-disable-line
                itemPeople.image = ''; // eslint-disable-line
                itemPeople.speciesName = ''; // eslint-disable-line
                itemPeople.imageName = itemPeople.name.toLowerCase().replace('-', '_').replace(' ', '_').replace(' ', '_'); // eslint-disable-line
                state.images.forEach((item) => {
                  if (itemPeople.imageName === item.imageName) {
                    itemPeople.image = item.url; // eslint-disable-line
                  }
                });
                state.listCarts = tmpPeople;
                state.speciesListCarts.push(itemPeople.species)
              });
            });
    },
    //---------------------------------------
    //-------------People component----------
    descript: (state, payload) => {
      state.showPeople = true;
      state.animateLoadHome = true;
      state.animateLoadFilms.film = true;
      state.animateLoadFilms.others = true;
      state.blur = 'blur(5px)';
      document.querySelector('body').style.overflowY = 'hidden';
      document.querySelector('body').style.width = '100%';
      state.descriptionList = payload;
      state.descriptionList.home = '';
      state.descriptionList.nameFilms = '';
    },
    receiveHomeWorld: (state) => {
      Vue.http.get(state.descriptionList.homeworld).then(response => {
        if(response.ok == true){
          state.descriptionList.home = response.body.name
          state.animateLoadHome = false
        }
      })
    },
    receiveFilms: (state) => {
      let arrFilms = [];
      let counterFilms = 0;
      for(let i = 0; i < state.descriptionList.films.length; i++){
        Vue.http.get(state.descriptionList.films[i]).then(response => {
          if(response.ok == true){
            counterFilms++
            arrFilms.push(response.data.title);
          }
          if(counterFilms === state.descriptionList.films.length){
            state.descriptionList.nameFilms = arrFilms;
            state.animateLoadFilms.film = false;
            state.animateLoadFilms.others = false;
          }
        })
      }
    },
    closeDescript: (state) => {
      state.blur = '';
      state.descriptionList = '';
      state.animateLoadFilms.film = false;
      state.animateLoadHome = false;
      state.showPeople = false;
      document.querySelector('body').style.overflowY = 'auto';
      let withScroll = document.documentElement.clientWidth
        let outScroll = window.innerWidth
        let body = document.querySelector('body')
        if(withScroll < outScroll){
          let delta = (outScroll - withScroll)*100/outScroll;
          let newDelta = parseFloat(delta.toFixed(16), 10);
          body.style.width = (100+newDelta)+'%';
          body.style.overflowX = 'hidden';
        };
    },
    //---------------------------------------
    //---------SearchPages component--------
    searchPagination: (state, payload) => {
      let tmpPeople = '';
            Vue.http.get(state.searchAPI + state.searchResult + state.searchPagesAPI + payload).then((response) => {
              state.requestStatusPeople = response.ok;
              tmpPeople = response.body.results;
              tmpPeople.forEach((itemPeople) => {
                itemPeople.imageName = ''; // eslint-disable-line
                itemPeople.image = ''; // eslint-disable-line
                itemPeople.speciesName = ''; // eslint-disable-line
                itemPeople.imageName = itemPeople.name.toLowerCase().replace('-', '_').replace(' ', '_').replace(' ', '_'); // eslint-disable-line
                state.images.forEach((item) => {
                  if (itemPeople.imageName === item.imageName) {
                    itemPeople.image = item.url; // eslint-disable-line
                  }
                });
                state.listCarts = tmpPeople;
                state.speciesListCarts.push(itemPeople.species)
              });
            });
    },
    //---------------------------------------
  },
  actions: {
    initialLoad: ({state, commit}, payload) => {
      commit('changeImages');
      if(payload.fullPath === '/'){
        commit('requestPeopleAPI');
      } else {
        commit('pagination', payload.query.page);
      }
      let timerStatusPeople = setTimeout(function requestSpecies() {
        if(state.requestStatusPeople === true){
          commit('requestSpeciesAPI');
          clearTimeout(timerStatusPeople);
        }else{
          setTimeout(requestSpecies, 1)
        }
      },1)
      let timerStatusSpecies = setTimeout(function requestStatusSpeciesAPI() {
        if(state.requestStatusSpecies === true){
          commit('mergeArray')
          clearTimeout(timerStatusSpecies);
        }else{
          setTimeout(requestStatusSpeciesAPI, 1)
        }
      },1)
      let timerMergeArray = setTimeout(function mergeArray() {
        if(state.mergeStatusArray === true){
          state.showNavLists = true;
          clearTimeout(timerMergeArray);
          setTimeout(() => {
            commit('defaultWidth')
          }, 2000)
        }else{
          setTimeout(mergeArray, 1)
        }
      }, 980);
    },
    pagination: ({ state, commit }, payload ) => {
      state.speciesListCarts = [];
      state.requestStatusPeople = false;
      state.requestStatusSpecies = false;
      state.counter = 0;
      if(payload === '/'){
        commit('requestPeopleAPI');
      } else {
        commit('pagination', payload);
      }
      let timerStatusPeople = setTimeout(function requestSpecies() {
        if(state.requestStatusPeople === true){
          commit('requestSpeciesAPI');
          clearTimeout(timerStatusPeople);
        }else{
          setTimeout(requestSpecies, 1)
        }
      },1)
      let timerStatusSpecies = setTimeout(function requestStatusSpeciesAPI() {
        if(state.requestStatusSpecies === true){
          commit('mergeArray')
          clearTimeout(timerStatusSpecies);
        }else{
          setTimeout(requestStatusSpeciesAPI, 1)
        }
      },1)
    },
    //-------------Search component----------
    activeSearch: ({ commit }) => {
      commit('activeSearch')
    },
    stopSearch: ({ commit }) => {
      commit('stopSearch')
    },
    search: ({ state, commit }, payload) => {
      state.speciesListCarts = [];
      state.requestStatusPeople = false;
      state.requestStatusSpecies = false;
      state.counter = 0;
      commit('search', payload)
      let timerStatusPeople = setTimeout(function requestSpecies() {
        if(state.requestStatusPeople === true){
          commit('requestSpeciesAPI');
          clearTimeout(timerStatusPeople);
        }else{
          setTimeout(requestSpecies, 1)
        }
      },1)
      let timerStatusSpecies = setTimeout(function requestStatusSpeciesAPI() {
        if(state.requestStatusSpecies === true){
          commit('mergeArray')
          clearTimeout(timerStatusSpecies);
        }else{
          setTimeout(requestStatusSpeciesAPI, 1)
        }
      },1)
    },
    descript: ({state, commit}, payload) => {
      commit('descript', payload);
      commit('receiveHomeWorld');
      commit('receiveFilms')
    },
    closeDescript: ({ commit }) => {
      commit('closeDescript');
    },
    //---------------------------------------
    //---------------SearchPages component-----
    searchPagination: ({ state, commit }, payload) => {
      state.speciesListCarts = [];
      state.requestStatusPeople = false;
      state.requestStatusSpecies = false;
      state.counter = 0;
      commit('searchPagination', payload)
      let timerStatusPeople = setTimeout(function requestSpecies() {
        if(state.requestStatusPeople === true){
          commit('requestSpeciesAPI');
          clearTimeout(timerStatusPeople);
        }else{
          setTimeout(requestSpecies, 1)
        }
      },1)
      let timerStatusSpecies = setTimeout(function requestStatusSpeciesAPI() {
        if(state.requestStatusSpecies === true){
          commit('mergeArray')
          clearTimeout(timerStatusSpecies);
        }else{
          setTimeout(requestStatusSpeciesAPI, 1)
        }
      },1)
    }
    //-----------------------------------------
  },
});
