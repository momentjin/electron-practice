import Vue from 'vue'
import Router from 'vue-router'
import CoverletterList from '../views/coverletter/CoverletterList.vue'
import CoverletterView from '../views/coverletter/CoverletterView.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'

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
		{
			path: '/dashboard',
			component: Dashboard,
		}
	],
});
