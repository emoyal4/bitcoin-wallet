<template>
  <section class="transfer-fund">
    <h2>Transfer fund to {{ contact.name }}</h2>
    <form @submit="transferFund">
      <label for="amount">Amount</label>
      <input
        type="number"
        id="amount"
        placeholder="Enter amount"
        v-model="move.amount"
      />
      <button class="main-btn">Transfer</button>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    contact: Object,
  },
  data() {
    return {
      move: {
        transferAt: null,
        amount: null,
        toContact: null,
        fromUser: null,
      },
    };
  },
  created() {
    this.move.toContact = {
      _id: this.contact._id,
      name: this.contact.name,
      imgUrl: this.contact.imgUrl,
    };
    this.move.fromUser = {
      _id: this.loggedInUser._id,
      name: this.loggedInUser.username,
      imgUrl: this.loggedInUser.imgUrl,
    };
  },
  methods: {
    async transferFund() {
      this.move.transferAt = Date.now();
      const toContact = {
        ...this.contact,
        moves: [...this.contact.moves, this.move],
        coins: this.contact.coins + this.move.amount,
      };
      const fromUser = {
        ...this.loggedInUser,
        moves: [...this.loggedInUser.moves, this.move],
        coins: this.loggedInUser.coins - this.move.amount,
      };
      this.$store.dispatch({ type: "saveContact", contact: toContact });
      this.$store.dispatch({ type: "saveUser", user: fromUser });
      this.clearForm()
    },
    clearForm(){
      this.move = {
        transferAt: null,
        amount: null,
        toContact: null,
        fromUser: null,
      }
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>