import Vue from 'vue'
import Router from 'vue-router'
import CoverletterList from '../views/CoverletterList.vue'
import CoverletterView from '../views/CoverletterView.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/coverletters/:cid',
			component: CoverletterView,
		},
		{
			path: 'coverletters/new',
			component: CoverletterView,
		},
		{
			path: '/coverletters',
			component: CoverletterList,
		},
	],
});
