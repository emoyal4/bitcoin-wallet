<template>
  <div id="app">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>




<script>
import appHeader from "./components/app-header";
import appFooter from "./components/app-footer";

export default {
  components: {
    appHeader,
    appFooter,
  },
};
</script>



