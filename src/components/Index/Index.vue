<style scoped lang="less">
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
		.ivu-layout-header {
			padding: 0;
		}
		/deep/.horizontalbox.ivu-layout-header {
			background: #192940 !important;
		}
		/deep/ .ivu-layout-sider {
			height: calc(100vh - 64px);
			overflow-y: scroll;
		}
		/deep/ .ivu-menu-dark,
		/deep/ .ivu-layout-sider,
		/deep/ .ivu-menu-submenu-title {
			background: #192940 !important;
		}
		.ivu-menu-submenu-title {
			display: flex;
			align-items: center;

			i,
			span {
				color: #8b97a2;
			}

			i {
				font-size: 26px;
			}
		}

		.ivu-menu-opened {
			background: #0d1a2c;

			i,
			span {
				color: #f9650c;
			}
		}

		/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active {
			color: #fff;
			background: transparent !important;
		}

		/deep/ .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
			color: #8b97a2;
			padding-left: 62px !important;
		}

		.layout-header-bar {
			background: #fff;
			box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
		}
		.breadcrumbItems {
			font-size: 18px;
			font-weight: bold;
		}
	}
	.headerbox {
		display: flex;
		justify-content: space-between;
		padding: 0 24px;
		box-sizing: border-box;
		.layout-logo {
			width: auto;
			display: flex;
			align-items: center;
			height: 100%;
			color: #fff;
			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				margin-right: 20px;
			}
			.ivu-icon {
				color: #fff;
				cursor: pointer;
			}
		}
		.layout-nav{
			cursor: pointer;
		}
	}
	.ivu-layout-has-sider {
		height: calc(100vh - 66px);
		overflow-y: auto;
		.ivu-layout-has-sider {
			flex: inherit;
		}
		::-webkit-scrollbar {
			display: none;
		}
	}
	/deep/ .hidetransform {
		width: 0 !important;
		min-width: 0 !important;
		flex: inherit !important;
		overflow: hidden !important;
		transition: all 1s;
	}

	.containerbox {
		.ivu-layout-header {
			padding-left: 20px;
		}
		.ivu-layout-content {
			height: calc(100vh - 154px);
			overflow-y: scroll;
		}
	}
	::-webkit-scrollbar {
		display: none;
	}
</style>
<template>
	<div class="layout">
		<Layout>
			<Header class="horizontalbox">
				<Menu mode="horizontal" class="headerbox" theme="dark" active-name="1">
					<div class="layout-logo">
						<img src="../../../static/0.jpg" alt="" />
						<span>欢迎进入物联网管理后台</span>
						<Icon @click.native="collapsedSider" :style="{ margin: '0 20px' }" type="md-menu" size="24"></Icon>
					</div>
					<div class="layout-nav" style="color: #fff;">
						<span>欢迎你，123。当前余额：0.00</span>
						<!-- <MenuItem name="1">
							<Icon type="ios-navigate"></Icon>
							Item 1
						</MenuItem> -->
					</div>
				</Menu>
			</Header>
			<Layout>
				<Sider v-if="collapsibles" :class="collapsibles ? '' : 'hidetransform'" breakpoint="md" hide-trigger>
					<Menu theme="dark" accordion class="navbox" width="auto" :open-names="[Submenuname]" :active-name="activeName" @on-open-change="onOpenChanged">
						<!-- <Menu class="navbox" :active-name="activename" theme="dark" width="auto" :open-names="['1']"> -->

						<Submenu name="1">
							<template slot="title">
								<Icon class="l_iconfont l_iconlvzhou_gailan-copy"></Icon>
								<span>平台首页</span>
							</template>
							<!-- 						第一种方式
							<MenuItem name="3-1" @click.native="choosencomp('Pramaryuser')">普通用户</MenuItem>
							<MenuItem name="3-2" @click.native="choosencomp('Otheruser')">董事/总代</MenuItem> -->
							<!-- 第二种方式   通过设置子路由 -->
							<MenuItem name="/Overview" @click.native="onSelected('/Overview', '平台首页')">平台首页</MenuItem>
						</Submenu>
						<Submenu name="2">
							<template slot="title">
								<Icon class="l_iconfont l_iconicon_gailan"></Icon>
								<span>余额记录</span>
							</template>
							<MenuItem name="/Balancerecord" @click.native="onSelected('/Balancerecord', '余额记录')">余额记录</MenuItem>
						</Submenu>
						<Submenu name="3">
							<template slot="title">
								<Icon class="l_iconfont l_iconicon_caigouguanli9"></Icon>
								<span>物联卡管理</span>
							</template>
							<MenuItem name="/Unicomcard" @click.native="onSelected('/Unicomcard', '联通流量卡')">联通流量卡</MenuItem>
							<MenuItem name="/Trafficcard" @click.native="onSelected('/Trafficcard', '移动流量卡')">移动流量卡</MenuItem>
							<MenuItem name="/Telecommunicationcard" @click.native="onSelected('/Telecommunicationcard', '电信流量卡')">电信流量卡</MenuItem>
							<MenuItem name="/Singleprepaid" @click.native="onSelected('/Singleprepaid', '单卡充值')">单卡充值</MenuItem>
							<MenuItem name="/Batchtopup" @click.native="onSelected('/Batchtopup', '批量充值')">批量充值</MenuItem>
							<MenuItem name="/Batchthrough" @click.native="onSelected('/Batchthrough', '批量划卡')">批量划卡</MenuItem>
						</Submenu>
						<Submenu name="4">
							<template slot="title">
								<Icon class="l_iconfont l_iconicon_caigouguanli"></Icon>
								<span>代理商管理</span>
							</template>
							<MenuItem name="/Agentlist" @click.native="onSelected('/Agentlist', '代理商列表')">代理商列表</MenuItem>
							<MenuItem name="/Addagent" @click.native="onSelected('/Addagent', '添加代理商')">添加代理商</MenuItem>

						</Submenu>
						<Submenu name="5">
							<template slot="title">
								<Icon class="l_iconfont l_iconicon_caigouguanli8"></Icon>
								<span>操作日记</span>
							</template>
							<MenuItem name="/Operatingadiary" @click.native="onSelected('/Operatingadiary', '操作日记')">操作日记</MenuItem>
						</Submenu>
						
					</Menu>
					<div slot="trigger"></div>
				</Sider>
				<Layout class="containerbox">
					<Header class="layout-header-bar" :style="{ background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)' }">
						<span class="breadcrumbItems">{{ breadcrumbItems }}</span>
					</Header>
					<Content :style="{ margin: '20px', background: '#fff', minHeight: '220px' }">
						<div>
							<div class="incontbox" id="incontbox"><router-view /></div>
						</div>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isCollapsed: true,
			collapsibles: true,
			Submenuname: '2',
			activeName: '/Overview',
			// navActive: '/Overview', //第一种方式渲染 右侧内容区域所需要渲染出的组件,
			breadcrumbItems: '平台首页', //面包屑
			accordion: true, //开启手风琴效果,
			paramname: '', //内部跳转
			modal10: false
		};
	},
	computed: {
		rotateIcon() {
			return ['menu-icon', this.isCollapsed ? 'rotate-icon' : ''];
		},
		menuitemClasses: function() {
			return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
		}
	},
	methods: {
		// 侧边栏显示隐藏
		collapsedSider() {
			this.collapsibles = !this.collapsibles;
			// this.$refs.side1.toggleCollapse();
		},
		// 侧边导航路由跳转
		onSelected: function(name, breadcrumbItems) {
			localStorage.setItem('Submenuname', this.Submenuname);
			// 点击同一个不做任何操作
			this.activeName = name;
			if (this.$route.path == name) {
				return;
			}
			this.$router.push({
				path: name
			});
			this.breadcrumbItems = breadcrumbItems;
			localStorage.setItem('breadcrumbItems', this.breadcrumbItems);
		},
		// 默认展开一级菜单时，选中第一项子菜单
		onOpenChanged: function(params) {
			var _this = this;
			// console.log(params)
			this.Submenuname = [params[0]];
			localStorage.setItem('Submenuname', this.Submenuname);
			switch (params[0]) {
				case '1':
					_this.onSelected('/Overview', '平台首页');
					return;
				case '2':
					_this.onSelected('/Balancerecord', '余额记录');
					return;
				case '3':
					_this.onSelected('/Unicomcard', '联通流量卡');
					return;
				case '4':
					_this.onSelected('/Agentlist', '代理商列表');
					return;
				case '5':
					_this.onSelected('/Operatingadiary', '操作日记');
					return;
				case '6':
					_this.onSelected('/Userinformation', '用户信息');
					return;
			}
		},
		// 退出登录
		logoutfun: function() {
			// this.$store.commit('logout')
			this.modal10 = true;
		},
		confirmfun() {
			localStorage.clear();
			localStorage.setItem('Submenuname', 0);
			localStorage.setItem('breadcrumbItems', '平台首页');
			this.$router.push({
				path: '/login'
			});
		},
		// 激活二级菜单
		setopenfun() {
			this.breadcrumbItems = localStorage.getItem('breadcrumbItems');
			switch (this.$route.name) {
				case '/Supplierdetails':
					this.activeName = '/Trafficcard';
					return;
				case '/Assess':
					this.activeName = '/Trafficcard';
					return;
				case '/Goodsdetails':
					this.activeName = '/Agentlist';
					return;
			}
		},
		// 获取商品分类
		getcategory_list() {
			// setcategory_list
			var _this = this;
			this.$post('/phone/Week/week_commodity', {
				// token:this.$store.state.token
			}).then(data => {
				if (data.code == 1) {
					if (data.data && data.data.category_list.length > 0) {
						_this.$store.commit('setcategory_list', [
							{
								category_name: '请选择商品分类',
								id: '请选择商品分类'
							},
							...data.data.category_list
						]);
					}
				}
			});
		}
	}
};
</script>
