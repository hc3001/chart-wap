import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const state = {//要设置的全局访问的state对象
    headerStatus: {
        date: '',
        departmentValue: '8',
        bussinessValue: '0',
        accumulateValue: '1'
    },
    updateTime: '',
    categoryStatus: '0',
}
const getters = {   //实时监听state值的变化(最新状态)

}
const mutations = {
    //修改头部选择方法
    changeSelect(state, select) {   //自定义改变state初始值的方法
        if(select && Object.keys(select).length !== 0) {
            var key = Object.keys(select)[0]
            var value = Object.values(select)[0]
            state.headerStatus[key] = value
        }
    },
    //修改类别方法
    categorySelect(state, status) {
        state.categoryStatus = status
    },
    //修改更新时间方法
    getUpdatetime(state, time) {
        state.updateTime = time
    }
}
const actions = {
    //异步调用获取时间
    getDate({state, commit, dispatch}, select) {
        commit('changeSelect', select)
        dispatch('test')
    },
    test() {
        console.log('test')
    }
}
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer(val) {
        return {
            // 只储存state中的assessmentData
            categoryStatus: val.categoryStatus
        }}
})
console.log('vuexLocal', vuexLocal)
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        test
    },
    plugins: [vuexLocal.plugin]
})
export default store
