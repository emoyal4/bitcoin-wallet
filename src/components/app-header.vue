<template>
  <section class="app-header main-layout">
    <div :class="{ open: isNavOpen }" class="header-container">
    <div @click="isNavOpen = !isNavOpen" class="screen"></div>
      <div class="logo" @click="$router.push('/')">
        <h1><span>B</span><span>W</span></h1>
        <h1>Bitcoin wallet</h1>
      </div>
      <nav class="nav">
        <router-link exact to="/">Home</router-link>
        <router-link exact to="/wallet">Wallet</router-link>
        <router-link class="login-link" v-if="!loggedInUser" exact to="/login">Login</router-link>
      </nav>

      <div v-if="loggedInUser" class="user-info">
        <button @click="logout">Logout</button>
        <img :src="loggedInUser.imgUrl" alt="user-avatar" />
      </div>
      <router-link class="login-link" v-else to="/login">Login</router-link>

      <button class="hamburger-btn" @click="isNavOpen = !isNavOpen">☰</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isNavOpen: false,
    };
  },
  created() {
    this.$store.dispatch({ type: "setLoggedInUser" });
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: "logout" });
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>

