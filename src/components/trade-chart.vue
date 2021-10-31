<template>
  <section class="trade-chart">
    <span
      v-for="trade in data"
      :key="trade.value"
      :style="{ height: `${(trade.value / divider) * multi}px` }"
    >
      <p>
        <span>{{ getForrmatValue(trade.value) }}M</span>
        <span>{{trade.date}}</span>
      </p>
    </span>
    <section>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </section>
  </section>
</template>

<script>
export default {
  props: ["data", "multi", "divider"],
  methods: {
    getForrmatValue(val) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(val);
    },
    getForrmatedTime(timestamp) {
      return new Date(Date.now() - timestamp).toLocaleDateString();
    },
  },
};
</script>

<style>
</style>