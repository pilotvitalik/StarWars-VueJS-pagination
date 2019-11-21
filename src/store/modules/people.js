import Vue from 'vue';
import storageRef from '../../main'; // eslint-disable-line
import common from './heroesWrapper';

export default {
  state: {
    descriptionList: '', // data for array of People component
    showPeople: false, // show People component
    animateLoadHome: false, // animation while load data name`s home from server
    showHome: false, // show name`s home after receive data
    animateLoadFilms: false, // animation while load data names of films from server
    showFilms: false, // show names of films after receive data
    closeBtn: '',
    calendImg: '',
    filmImg: '',
    genderImg: '',
    ufoImg: '',
    worldImg: '',
  },
  mutations: {
    loadingImages: (state) => {
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
    descript: (state, payload) => {
      state.showPeople = true;
      state.animateLoadHome = true;
      state.animateLoadFilms = true;
      common.state.blur = 'blur(5px)';
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
            state.animateLoadFilms = false;
            state.descriptionList.nameFilms = arrFilms;
            setTimeout(() => {
              state.showFilms = true;
            }, 350);
          }
        });
      }
    },
    closeDescript: (state) => {
      common.state.blur = '';
      state.descriptionList = '';
      state.animateLoadFilms = false;
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
  },
};
