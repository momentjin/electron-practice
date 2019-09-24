import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import CoverletterList from '../views/coverletter/CoverletterList.vue'
import CoverletterDetail from '../views/coverletter/CoverletterDetail.vue'
import Practice from '../views/Practice.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Login from '../views/Login.vue'
import User from '../views/user/User.vue'

import QuestionItem from '../components/coverletter/QuestionItem.vue'
import CoverletterInfo from '../components/coverletter/CoverletterInfo.vue'

Vue.use(Router)

const requireAuth = (to, from, next) => {
	const loginPath = `/login?returnPath=${encodeURIComponent(to.path)}`
	store.getters.isAuth() ? next() : next(loginPath)
}

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/coverletters/:cid',
			name: 'coverletterDetail',
			component: CoverletterDetail,
			beforeEnter: requireAuth,
			children: [
				{
					path: 'info',
					name: 'coverletterInfo',
					component: CoverletterInfo
				},
				{ 
					path: 'questions/:qid',
					name: 'question',
					component: QuestionItem
				}
			]
		},
		{
			path: 'coverletters/new',
			name: 'coverletterNew',
			component: CoverletterDetail,
			beforeEnter: requireAuth
		},
		{
			path: '/coverletters',
			component: CoverletterList,
			beforeEnter: requireAuth,
			alias: '/'
		},
		{
			path: '/dashboard',
			component: Dashboard,
			beforeEnter: requireAuth
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/user',
			component: User
		},
		{
			path: '/practice',
			component: Practice
		}
	],
});


export default router;

