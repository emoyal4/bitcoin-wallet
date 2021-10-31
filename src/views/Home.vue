<template>
  <section class="main-layout page">
    <div class="home">
      <h1>Universal crypto wallet</h1>
      <p>
        Get a cryptocurrency loan backed by the TOP 15 coins with up to 90% loan
        to value ratio (LTV). Earn crypto with 12.3% APR + compounding interest.
        Store, exchange and pay anytime.
      </p>
      <button @click="redirect">GET STARTED</button>
      <img
        src="https://assets-global.website-files.com/5cc19fbd198b8d31a9c64876/60b622fb628ab52aec59cae0_main_hero-p-1080.jpeg"
        alt="hero"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    redirect() {
      if (this.loggedInUser) {
        this.$router.push("/wallet");
      } else {
        this.$router.push("/login");
      }
    },
  },
  components: {},
};
</script>
