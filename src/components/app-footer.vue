<template>
  <section class="app-footer main-layout">
    <div class="footer-container">
       <div class="logo" @click="$router.push('/')">
        <h1><span>B</span><span>W</span></h1>
        <h1>Bitcoin wallet</h1>
      </div>
      <small>&copy; coffeeRights eliMoyal() 2021</small>
      <nav class="nav">
        <router-link exact to="/">Home</router-link>
        <router-link exact to="/wallet">wallet</router-link>
        <router-link exact to="/login">login</router-link>
      </nav>
    </div>
  </section>
</template>

<script>
export default {};
</script>

