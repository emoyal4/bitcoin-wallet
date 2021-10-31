import contactService from "../../services/contact.service"

export default {
  state: {
    contacts: []
  },
  getters: {
    contacts(state) {
      return state.contacts
    }
  },
  mutations: {
    loadContacts(state, { contacts }) {
      state.contacts = contacts
    },
    saveContact(state, { contact }) {
      const idx = state.contacts.findIndex(currContact => currContact._id === contact._id)
      if (idx === -1) state.contacts.push(contact)
      else state.contacts.splice(idx, 1, contact)
    },
    removeContact(state, { contactId }) {
      const idx = state.contacts.findIndex(currContact => currContact._id === contactId)
      if (idx !== -1) state.contacts.splice(idx, 1)
    },
  },
  actions: {
    async loadContacts(context) {
      const contacts = await contactService.query()
      context.commit({ type: 'loadContacts', contacts })
    },
    async saveContact(context, { contact }) {
      await contactService.save(contact)
      context.commit({ type: 'saveContact', contact })
    },
    async removeContact(context, { contactId }) {
      await contactService.remove(contactId)
      context.commit({ type: 'removeContact', contactId })
    },
  },
  modules: {
  }
}