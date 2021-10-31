<template>
  <section class="contact-list">
      <contact-preview :class="{'selected-contact': (selectedContact && selectedContact._id === contact._id)}" v-for="contact in contacts" :contact ="contact" :key="contact._id" @selectContact="$emit('selectContact', $event)"/>
  </section>
</template>

<script>
    import contactPreview from '../components/contacts-preview'
export default {
  props: {
    contacts: Array,
    selectedContact: Object
  },
  components:{
      contactPreview
  }
};
</script>

