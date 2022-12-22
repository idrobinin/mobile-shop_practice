export default {
    namespaced: true,
    state: {

    },
    getters: {
         findProductInCard: (state, getters,rootState,rootGetters) => id => rootGetters['cart/items'].find(el => el.id === id).cnt,
         findIndexOfProductInCard: (state, getters,rootState,rootGetters) => id => rootGetters['cart/items'].findIndex(el => el.id === id)
    },
    mutations: {

    },
    actions: {

    }
}

