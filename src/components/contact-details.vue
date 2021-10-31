<template>
  <section class="contact-details" @click="$router.push(`contact/${contact._id}`)">
      <img :src="contact.imgUrl" alt="contact-avatar">
      <h2>{{contact.name}}</h2>
      <h3>{{contact.email}}</h3>
      <h3>{{contact.phone}}</h3>
  </section>
</template>

<script>
export default {
    props:{
        contact: Object
    }
}
</script>
