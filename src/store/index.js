import Vue from 'vue';
import Vuex from 'vuex';
import storageRef from '../main'; // eslint-disable-line
import swapi from '../api/swapi';
import page from './modules/pages';
import searchPage from './modules/searchPages'; // eslint-disable-line
import searchModule from './modules/search'; // eslint-disable-line
import person from './modules/people'; // eslint-disable-line
import cart from './modules/namePerson'; // eslint-disable-line
import common from './modules/heroesWrapper';
import views from './modules/showComponents';
import mutation from './modules/mutations'; // eslint-disable-line
import actions from './modules/actions'; // eslint-disable-line


Vue.use(Vuex);

export const store = new Vuex.Store({ // eslint-disable-line
  modules: {
    swapi,
    page,
    searchPage,
    searchModule,
    person,
    cart,
    common,
    views,
    mutation,
    actions,
  },
});
