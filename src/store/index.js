import Vue from 'vue'
import Vuex from 'vuex'
import contactModule from './modules/contact.module.js'
import userModule from './modules/user.module.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    contactModule,
    userModule
  }
})
