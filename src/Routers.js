import Common from './components/Wrapper/Common/Common.vue'
import AllHeroes_pages from './components/Wrapper/Common/AllHeroes_pages/AllHeroes_pages.vue'

export default [
	{path: '/1', component: Common},
	{path: '/:id', component: AllHeroes_pages},
]