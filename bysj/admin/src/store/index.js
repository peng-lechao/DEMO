import Vue  from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
	state:{
	  isLogin : false,
	  adminInfo:{},
	  typeLists:[]
	},
	mutations:{
		setLevel(state,data){
			state.level = data;
		},
		setIsActive(state,name){
			state.isActive = name;
		}
	},
	actions:{
		add2(context,price){
			context.commit('add',10);
		},
		reduce2(context,price){
			context.commit('reduce',20);
		}

	}
})