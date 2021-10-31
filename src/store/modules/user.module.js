import { userService } from "../../services/user.service.js"

export default {
  state: {
    loggedInUser: null
  },
  getters: {
    loggedInUser(state) {
      return state.loggedInUser
    }
  },
  mutations: {
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user
    }
  },
  actions: {
    async setLoggedInUser(context) {
      const user = await userService.getLoggedinUser()
      if (user) context.commit({ type: 'setLoggedInUser', user })
    },
    async login(context, credentials) {
      const user = await userService.login(credentials)
      context.commit({ type: 'setLoggedInUser', user })
    },
    async logout(context) {
      await userService.logout()
      context.commit({ type: 'setLoggedInUser', user: null })
    },
    async signup(context, newUser) {
      const user = await userService.signup(newUser)
      context.commit({ type: 'setLoggedInUser', user })
    },
    async saveUser(context, {user}) {
      await userService.save(user)
      if (user._id === context.state.loggedInUser._id) context.commit({ type: 'setLoggedInUser', user: user })
    }
  },
  modules: {
  }
}