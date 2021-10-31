<template>
  <section class="contact-preview" @click="$emit('selectContact', contact)">
    <img :src="contact.thumbnailUrl" alt="contact-avatar" />
    <h4>{{ contact.name }}</h4>
  </section>
</template>

<script>
export default {
  props: {
    contact: Object,
  },
};
</script>

