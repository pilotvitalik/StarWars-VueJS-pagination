import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './Routers.js'
import debounce from 'lodash.debounce';
import { store } from './store/store';

Vue.config.productionTip = false;

export const bus = new Vue();
export const axios = require('axios');
Vue.prototype.$debounce = debounce;

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
	routes: Routes,
	mode: 'history'
	});

new Vue({
	store,
  render: h => h(App),
  router: router,
}).$mount('#app');
