import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import debounce from 'lodash.debounce';
import firebase from 'firebase/app';
import storage from 'firebase/storage'; // eslint-disable-line
import { store } from './store/index'; // eslint-disable-line
import Routes from './Routers';
import App from './App.vue';

Vue.config.productionTip = false;

export const bus = new Vue();
Vue.prototype.$debounce = debounce;

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history',
});

const firebaseApp = firebase.initializeApp({
  /* *** (API auth key) */
});

const storageRef = firebaseApp.storage().ref();

export default storageRef;

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app');
