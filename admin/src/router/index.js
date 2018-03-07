import Vue from 'vue'
import Router from 'vue-router'
import adminInfo from '@/components/page/admin_info'
import goodsCategory from '@/components/page/goods_category'
import store from '@/store'
import Hi from '@/components/common/Hi'
import mainPage from '@/components/mainPage'
import login from '@/components/login'
import _user from '@/service/user'
Vue.use(Router)
const VueRouter = new Router({
  routes: [
    {
      path: '/mainPage',
      name: 'mainPage',
      component:mainPage,
      children:[
      	{
	      path: 'admin_info',
	      name: 'adminInfo',
	      meta:{
	      	auth:true
	      },
	      component:adminInfo,
    	},
	    {
	      path: 'goods_category',
	      meta:{
	      	auth:true
	      },
	      name: 'goodsCategory',
	      component:goodsCategory
	    }
      ]
    },
    {
      path: '/',
      name: 'login',
      component:login  	
    }
  ]
});

VueRouter.beforeEach((to,from,next)=>{
	var _this = this;
	if(to.meta.auth){
		if(store.state.isLogin){
			if(to.name === 'adminInfo') {
				_user.checkAdminLevel('super',function(res){
					next();
				},function(err){
					next({path : from.path});
					Vue.prototype.$alert(err, '系统提示',{
						confirmButtonText: '确定'
					});
				});
			}
			next();
		}
		else{
			next('/');
		}
	}
	else{
		next();
	}
})

export default VueRouter;

