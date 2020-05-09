<template>
	<el-container class="main_body">
		<el-header>
			<div class="header_left">
				<img src="../assets/logo.png" />
				<span>电商后台管理系统</span>
			</div>
			<el-button type="info" @click="loginOut">退出登录</el-button>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu :unique-opened="true" background-color="#333845" text-color="#fff" active-text-color="#409EFF">
					<!-- 一级菜单(箭头)-->
					<el-submenu v-for="(item, index) in menuList" :key="item.id" :index="String(index)">
						<!-- 一级菜单的模板区域 -->
						<template slot="title">
							<i :class="iconList[index]"></i>
							<!-- 图标 -->
							<span>{{ item.authName }}</span>
							<!-- 文字 -->
						</template>
						<!-- 二级菜单 -->
						<el-menu-item v-for="(item2, index2) in item.children" :key="item2.id" :index="(index + '-' + index2).toString()">
							<i class="el-icon-menu"></i>
							<span slot="title">{{ item2.authName }}</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>Main</el-main>
		</el-container>
	</el-container>
</template>

<script>
import { MessageBox, Loading } from 'element-ui';

export default {
	name: 'Home',
	data() {
		return {
			menuList: [], //菜单列表
			iconList: ['iconfont icon-users', 'iconfont icon-tijikongjian', 'iconfont icon-shangpin', 'iconfont icon-danju', 'iconfont icon-baobiao']
		};
	},
	created() {
		this.getMenuList();
	},
	methods: {
		//获取菜单列表
		async getMenuList() {
			// 对象解构赋值的内部机制：先找到同名属性，然后赋值给相应的变量，实际被赋值的是后者
			const {
				data: { data }
			} = await this.$http.get('/menus');
			this.menuList = data;
			console.log(this.menuList);
		},

		//退出
		loginOut() {
			MessageBox.confirm('确定要退出吗？', '确认信息', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			})
				.then(() => {
					window.sessionStorage.clear();
					let loadingInstance = Loading.service({});
					setTimeout(() => {
						this.$router.push('/login');
						loadingInstance.close();
					}, 1500);
				})
				.catch(action => {});
		}
	}
};
</script>

<style lang="scss" scoped>
.main_body {
	height: 100%;
}
.el-header {
	background-color: #31373b;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.header_left {
		color: white;
		font-size: 16px;
		display: flex;
		align-items: center;
		img {
			height: 60px;
			margin-right: 15px;
		}
	}
}
.el-aside {
	background-color: #333845;
}
.el-main {
	background-color: #eaedf1;
}
.el-menu{
	border-right: 0;
}
.iconfont{
	margin-right: 10px;
}
</style>
