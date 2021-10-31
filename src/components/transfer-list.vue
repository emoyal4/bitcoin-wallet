<template>
  <section class="transfer-list">
    <transfer-preview
      v-for="move in moves"
      :key="move.transferAt + move.amount"
      :move="move"
    />
  </section>
</template>

<script>
import TransferPreview from './transfer-preview.vue';

export default {
  props: {
    contact: Object,
  },
  
  computed:{
    moves(){
      return this.contact.moves
    }
  },
  components: {
    TransferPreview,
  },
};
</script>