<template>
  <section class="contact-filter">
      <input type="text" v-model="filterBy" placeholder="Search for contacts" @input="$emit('setFilter', filterBy)"/>
      <button @click="$router.push('/contact')">+</button>
  </section>
</template>

<script>
export default {
    data(){
        return{
            filterBy: ''
        }
    }

}
</script>
