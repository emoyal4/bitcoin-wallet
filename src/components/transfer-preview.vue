<template>
  <section class="transfer-preview">
    <img :src="move.fromUser.imgUrl" alt="">
    <p>{{move.fromUser.name}} has transfer {{move.amount}} to {{move.toContact.name}}</p>
    <div class="date">
      <h4>{{ date }}</h4>
      <h4>{{ time }}</h4>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    move: Object,
  },
  computed: {
    date() {
      return new Date(this.move.transferAt).toLocaleDateString();
    },
    time() {
      return new Date(this.move.transferAt).toLocaleTimeString();
    },
  },
};
</script>