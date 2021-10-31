<template>
  <section class="main-layout page login-page">
    <div v-if="isLogin" class="login">
      <span v-if="msg">{{ msg }}</span>
      <h1>login</h1>
      <form @submit.prevent="login">
        <label for="username">User name</label>
        <input type="text" id="username" v-model="user.username" />
        <label for="pass">Password</label>
        <input type="password" id="pass" v-model="user.password" />
        <button type="submit">Login</button>
      </form>
      <p>New here? <span @click="isLogin = !isLogin">Signup</span></p>
    </div>

    <div v-if="!isLogin" class="login">
      <h1>Signup</h1>
      <form @submit.prevent="signup">
        <label for="username">User name</label>
        <input type="text" id="username" v-model="newUser.username" />
        <label for="pass">Password</label>
        <input type="password" id="pass" v-model="newUser.password" />
        <label for="email">Email</label>
        <input type="email" id="email" v-model="newUser.email" />
        <label for="phone">Phone</label>
        <input type="text" id="phone" v-model="newUser.phone" />
        <button type="submit">Signup</button>
      </form>
      <p>Already member? <span @click="isLogin = !isLogin">Login</span></p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      newUser: {
        username: "",
        password: "",
        email: "",
        phone: "",
      },
      msg: null,
      isLogin: true,
    };
  },
  methods: {
    async login() {
      const credentials = {
        username: this.user.username,
        password: this.user.password,
      };
      await this.$store.dispatch("login", credentials);
      this.clearForm();
    },
    async signup() {
      const user = {
        username: this.newUser.username,
        password: this.newUser.password,
        phone: this.newUser.phone,
        email: this.newUser.email,
      };
      await this.$store.dispatch("signup", user);
      this.clearForm();
    },
    clearForm() {
      if (this.loggedInUser) {
        this.user = {
          username: "",
          password: "",
        };
        this.newUser = {
          username: "",
          password: "",
          email: "",
          phone: "",
        };
        this.$router.push("/wallet");
      } else {
        this.msg = "login faild, please try again";
        setTimeout(() => {
          this.msg = null;
        }, 3000);
      }
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>
