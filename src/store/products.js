import axios from 'axios'
export default {
	namespaced: true,
	state: {
		items: []
	},
	getters: {
		all: state => state.items,
	},
	mutations: {
		setItems(state,products) {
			state.items = products
		}
	},
	actions: {

		// асинхронная загрузка данных в магазин
		async load({ commit }){
			let response = await axios.get('http://faceprog.ru/reactcourseapi/products/all.php');
			let products = response.data
			commit('setItems', products);
		}
	}
}

