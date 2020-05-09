import Vue from 'vue'
import VueRouter from 'vue-router'
import {
	MessageBox,
	Loading
} from 'element-ui';
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'


Vue.use(VueRouter)

const routes = [{
		path: '',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/home',
		component: Home
	}
]

const router = new VueRouter({
	routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
	// to: Route: 即将要进入的目标 路由对象  
	// from: Route: 当前导航正要离开的路由  
	// next: Function: 一定要调用该方法来 resolve 这个钩子。

	// 如果访问的是登录页,直接走下一步
	if (to.path == '/login') {
		return next()
	} else {
		const TOKEN = window.sessionStorage.getItem('token')
		if (!TOKEN) {
			MessageBox.alert('当前用户未登录,请登录', '提示', {
				confirmButtonText: '确定',
				callback: action => {
					let loadingInstance = Loading.service({});
					setTimeout(() => {
						loadingInstance.close();
						next('/login')
					}, 1500);
				}
			});
		} else {
			next()
		}
	}
})

export default router
