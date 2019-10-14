import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './Routers.js'


Vue.config.productionTip = false;

export const bus = new Vue();
export const axios = require('axios');

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
	routes: Routes,
	mode: 'history'
	});

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app');
