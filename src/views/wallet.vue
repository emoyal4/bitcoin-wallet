<template>
  <section class="main-layout page">
    <div class="wallet">
      <div class="left">
        <div v-if="loggedInUser" class="user-info">
          <div class="user-info-header">
            <img :src="loggedInUser.imgUrl" alt="user-avatar" />

            <div>
              <h2>{{ loggedInUser.username }}</h2>
              <h2>{{ loggedInUser.email }}</h2>
              <h2>{{ loggedInUser.phone }}</h2>
            </div>
          </div>
          <div class="user-balance">
            <h3>
              <span>Total Balance</span>
              <span>₿{{ loggedInUser.coins }}</span>
              <span>{{ userBitcoinRate }}</span>
            </h3>
            <h3>
              <span>Bitcoin Rate</span>
              <span>{{ bitcoinRate }}</span>
            </h3>
          </div>
        </div>
        <div v-else class="user-login">
          <h1>sign up for free and and unlock your asset’s value!</h1>
          <button class="main-btn" @click="$emit($router.push('/login'))">
            signup
          </button>
        </div>

        <div class="charts">
          <h2>Trade Volume</h2>
          <trade-chart :data="tradeData" :divider="10000000" :multi="2.1" />
          <h2>Market Price</h2>
          <trade-chart :data="priceData" :divider="1000" :multi="3" />
        </div>
      </div>

      <div v-if="loggedInUser" class="right">
        <div class="contact-details-container">
          <contact-details v-if="selectedContact" :contact="selectedContact" />
        </div>
        <contact-filter @setFilter="setFilter($event)" />
        <contact-list
          :contacts="contactsToDisplay"
          :selectedContact="selectedContact"
          @selectContact="setSelectedContact"
        />
      </div>
    </div>
  </section>
</template>

<script>
import contactList from "../components/contacts-list";
import contactFilter from "../components/contact-filter";
import contactDetails from "../components/contact-details";
import { bitcoinService } from "../services/bitcoin.service.js";
import TradeChart from "../components/trade-chart.vue";

export default {
  data() {
    return {
      filterBy: "",
      selectedContact: null,
      rate: null,
      tradeData: null,
      priceData: null,
    };
  },
  created() {
    this.$store.dispatch("loadContacts");
    this.getRate();
    this.getTradeData();
    this.getMarketPriceData();
  },
  mounted() {
    this.selectedContact = this.$store.getters.contacts[0];
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    setSelectedContact(contact) {
      this.selectedContact = contact;
    },
    async getRate() {
      this.rate = await bitcoinService.getRate();
    },
    async getTradeData() {
      const res = await bitcoinService.getTradeData();
      this.tradeData = res;
    },
    async getMarketPriceData() {
      const res = await bitcoinService.getMarketPriceData();
      this.priceData = res;
    },
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts;
    },
    bitcoinRate() {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(1 / this.rate);
    },
    userBitcoinRate() {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(this.loggedInUser.coins * (1 / this.rate));
    },
    contactsToDisplay() {
      var regex = new RegExp(this.filterBy, "i");
      return this.contacts.filter((contact) => {
        return regex.test(contact.name);
      });
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  watch: {
    contacts: {
      handler: function (newVal) {
        this.selectedContact = newVal[0];
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    contactList,
    contactFilter,
    contactDetails,
    TradeChart,
  },
};
</script>


