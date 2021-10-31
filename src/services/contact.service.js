'use strict';
import axios from 'axios'
import { DbService } from './db-service.js';
import { Utils } from './utils.service.js';

const KEY = 'contacts';

export default {
    query,
    get,
    remove,
    save,
    getNextContactId,
    getEmptyContact
}


async function query() {
    var contacts = await DbService.query(KEY);
    if (!contacts || !contacts.length) {
        contacts = await _createDefaultContacts();
        await DbService.insert(KEY, contacts);
    }
    return contacts;
}

async function get(id) {
    const contact = await DbService.get(KEY, id);
    if (!contact) {
        throw new Error('Unknown Contact')
    }
    return contact
}

function remove(id) {
    return DbService.delete(KEY, id);
}

function save(contact) {
    if (contact._id) return DbService.put(KEY, contact);
    else return DbService.post(KEY, contact)
}

async function getNextContactId(id, diff) {
    const contacts = await DbService.query(KEY);
    const idx = contacts.findIndex(contact => contact._id === id)
    if (idx + diff < 0) return contacts[contacts.length - 1]._id
    if (idx + diff > contacts.length - 1) return contacts[0]._id
    return contacts[idx + diff]._id
}

async function _createDefaultContacts() {
    return [
        await _createContact(true),
        await _createContact(true),
        await _createContact(true),
        await _createContact(true),
        await _createContact(true),
        await _createContact(true),
        await _createContact(true),
        await _createContact(true),
        await _createContact(true)
    ];
}

function getEmptyContact(){
    return _createContact(false)
}


async function _createContact(isDefault) {
    if (isDefault) {
        const res = await axios.get('https://randomuser.me/api/')
        const user = res.data.results[0]
        return {
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            phone: user.cell,
            thumbnailUrl: user.picture.thumbnail,
            imgUrl: user.picture.large,
            moves: [],
            coins: Utils.getRandomInt(1, 100)
        }
    } else {
        const imgUrl = `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Utils.getRandomInt(1, 100)}.jpg`
        return {
            name: '',
            email: '',
            phone: '',
            imgUrl: imgUrl,
            thumbnailUrl: imgUrl,
            moves: [],
            coins: Utils.getRandomInt(1, 100)
        }
    }
}