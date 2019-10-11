import Common from './components/Common.vue'
import People from './components/People/People.vue'

export default [
	{path: '/', component: Common},
	{path: '/:id', component: People},
]