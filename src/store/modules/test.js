const state = {
    items: [],
    checkoutStatus: null
}

const getters = {

}

const mutations = {
    pushNumber(state, n) {
        console.log('state', state)
        state.items.push(n)
    }
}

const actions = {
    getpushNumber({state, commit, dispatch, rootState}) {
        console.log('root', rootState)
        commit('pushNumber', 1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
