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
			name: 'coverletterDetail',
			component: CoverletterView,
		},
		{
			path: 'coverletters/new',
			name: 'coverletterNew',
			component: CoverletterView,
		},
		{
			path: '/coverletters',
			component: CoverletterList,
		},
	],
});
