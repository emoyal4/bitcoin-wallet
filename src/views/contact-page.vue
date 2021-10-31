<template>
  <section v-if="contact" class="main-layout page">
    <div class="contact-page">
      <div class="contact-nav">
        <button @click="navigateContact(-1)">Previous</button>
        <button @click="navigateContact(1)">Next</button>
      </div>

      <div class="contact-info">
        <template v-if="!isEditable">
        <img :src="contact.imgUrl" alt="contact-avatar" />
          <label for="name">Name</label>
          <h2 id="name">
            {{ contact.name }}
          </h2>
          <label for="email">Email</label>
          <h2 id="email">
            {{ contact.email }}
          </h2>
          <label for="phone">Phone</label>
          <h2 id="phone">
            {{ contact.phone }}
          </h2>
        </template>
        <template v-else>
          <img :src="contact.imgUrl" @click="changeImg" alt="contact-avatar" />
          <label for="name">Name</label>
          <input id="name" v-model="contact.name" />
          <label for="email">Email</label>
          <input id="name" v-model="contact.email" />
          <label for="phone">Phone</label>
          <input id="name" v-model="contact.phone" />
        </template>

        <div class="btn-container">
          <button class="main-btn" @click="editContact">
            {{ !isEditable ? "Edit" : "Save" }}
          </button>
          <button
            v-if="contact._id"
            class="main-btn remove-btn"
            @click="removeContact"
          >
            Remove
          </button>
        </div>
      </div>
      <div class="transfer-container">
        <transfer-fund :contact="contact" />
        <transfer-list :contact="contact" />
      </div>
    </div>
  </section>
</template>

<script>
import TransferFund from "../components/transfer-fund.vue";
import TransferList from "../components/transfer-list.vue";
import contactService from "../services/contact.service.js";
import { Utils } from "../services/utils.service.js";

export default {
  data() {
    return {
      contact: null,
      isEditable: false,
    };
  },
  created() {
    const { contactId } = this.$route.params;
    if (!contactId) this.getEmptyContact();
    else this.setContact(contactId);
  },
  methods: {
    async setContact(id) {
      this.contact = await contactService.get(id);
    },
    editContact() {
      if (!this.isEditable) {
        this.isEditable = true;
      } else {
        this.isEditable = false;
        this.saveContact();
      }
    },
    saveContact() {
      this.$store.dispatch({ type: "saveContact", contact: this.contact });
    },
    removeContact() {
      this.$store.dispatch({
        type: "removeContact",
        contactId: this.contact._id,
      });
      this.$router.push("/wallet");
    },
    async getEmptyContact() {
      this.contact = await contactService.getEmptyContact();
      this.isEditable = true;
    },
    async navigateContact(diff) {
      const id = await contactService.getNextContactId(this.contact._id, diff);
      this.$router.push(`/contact/${id}`);
      this.isEditable = false;
    },
    changeImg() {
      const imgUrl = `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? "men" : "women"
      }/${Utils.getRandomInt(1, 100)}.jpg`;
      this.contact.imgUrl = imgUrl;
      this.contact.thumbnailUrl = imgUrl;
    },
  },
  watch: {
    "$route.params.contactId": {
      handler: function (newVal) {
        this.setContact(newVal);
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    TransferFund,
    TransferList,
  },
};
</script>

