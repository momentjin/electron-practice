import Vue from 'vue'
import Router from 'vue-router'
import Coverletters from '../views/Coverletters.vue'
import CoverletterView from '../views/CoverletterView.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/coverletters/:cid',
			name: 'coverletter_view',
			component: CoverletterView,
		},
		{
			path: '/coverletters',
			name: 'coverletters',
			component: Coverletters,
		},
	],
});
