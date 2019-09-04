import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import addNumber from './modules/addNumber'
import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
    modules: {
        addNumber
    },
    plugins: [createPersistedState()]
})
export default store;


// 存数据 相当于data =》     state
// 读数 相当于computed,当state中的数据发生变化才会执行，可以过滤一些数据  =》   getters   this.$store.getters.getIndex
// 通过事件触发   =》 mutations    this.$store.commit(')
// 可实现一步操作,可传参  actions      this.$store.dipatch()
