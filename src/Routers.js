import Common from './components/Wrapper/Common/Common.vue';
import SearchCarts from './components/Wrapper/Common/AllHeroes/SearchCarts/SearchCarts.vue'
import ListCarts from './components/Wrapper/Common/AllHeroes/ListCarts/ListCarts.vue'

export default [
	{path: '/', component: Common, props: true,
	children: [
		{path: '', name: 'ListCarts', component: ListCarts, props: true},
		{path: 'search', name: 'search', component: SearchCarts, props: true}
	]
},

]