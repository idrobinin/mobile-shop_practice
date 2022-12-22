const BASEURL = 'http://faceprog.ru/reactcourseapi/cart/';

export default {
	namespaced: true,
	state: {
		items: [],
		token:null
	},
	getters: {
		items: state => state.items,
		inCart: state => id => state.items.some(item => item.id == id),
		length: state => state.items.reduce((acc,el) => acc + +el.cnt,0),
		showProductData: (state, getters,rootState,rootGetters) => id => rootGetters['products/all'].find(el => el.id === id),
		totalAmount:(state, getters) => state.items.reduce((acc,el) => {
			if(state.items.length && getters.inCart(el.id)) {
				return acc + +getters.showProductData(el.id).price * +el.cnt
			}
		},0),
		// total: (state, getter, rootState, rootGetters) rootGetters 
	},
	mutations: {
		load(state, { cart, token }){
			state.items = cart;
			state.token = token;
		},
		add(state, id){
			state.items.push({ id, cnt: 1});
		},
		remove(state, id){
			state.items = state.items.filter(item => item.id !== id);
		},
		increaseCnt(state, index){
			state.items[index].cnt++
		},
		decreaseCnt(state, index){
			state.items[index].cnt--
		},

	},

	actions: {
		async load({ commit }){
			// получаем из памяти старый токен
			let oldToken = localStorage.getItem('CART__TOKEN');
			// загружаем корзину со старым токеном чтобы данные не потерялись
			let response = await fetch(`${BASEURL}load.php?token=${oldToken}`);
			// получаем корзину сам токен и нужно ли обновлять токен если его не было
			let { cart, token, needUpdate } = await response.json();

			if(needUpdate){
				localStorage.setItem('CART__TOKEN', token);
			}

			commit('load', { cart, token });
		},
		async add({ commit, getters, state}, id){
			if(!getters.inCart(id) && getters.showProductData(id) !== undefined){
				let response = await fetch(`${BASEURL}add.php?token=${state.token}&id=${id}`);
				let res = await response.json();
				console.log(res)

				if(res){
					commit('add', id);
				}
			}
		},
		async remove({ commit, getters,state }, id){
			if(getters.inCart(id)){
				let response = await fetch(`${BASEURL}remove.php?token=${state.token}&id=${id}`);
				let res = await response.json();
				console.log(res)

				if(res){
					commit('remove', id);
				}
			}
		},
		increaseCnt({commit}, index){
			commit('increaseCnt',index);
		},

		decreaseCnt({commit,state}, index){
			if(state.items[index].cnt > 1){
				commit('decreaseCnt',index)
			}
		}
	}
}

/*
	inCart(state){
		return function(id){
			return state.items.some(item => item.id == id);
		}
	}


	inCart: state => id => state.items.some(item => item.id == id)
*/