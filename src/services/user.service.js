import axios from 'axios'

import { DbService } from './db-service.js'
import { Utils } from './utils.service.js'

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    query,
    login,
    logout,
    signup,
    remove,
    save,
    getLoggedinUser
}

async function query() {
    var users = await DbService.query(STORAGE_KEY);
    if (!users || !users.length) {
        users = await _createDefaultUsers();
        await DbService.insert(STORAGE_KEY, users);
    }
    return users;
}

async function login(credentials) {
    console.log(credentials);
    const users = await DbService.query(STORAGE_KEY)
    if (users) {
        const user = users.find(user => user.username === credentials.username &&
            user.password === credentials.password)
        if (user) {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        }
        return user;
    }
}

async function signup(newUser) {
    const user = {
        ...newUser,
        imgUrl: `https://randomuser.me/api/portraits/${Math.random > 0.5 ? 'men' : 'women'}/${Utils.getRandomInt(1, 100)}.jpg`,
        coins: Utils.getRandomInt(100, 1000),
        moves: []
    }
    await DbService.post(STORAGE_KEY, user)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user;
}

function logout() {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return Promise.resolve()
}

function remove(id) {
    return DbService.delete(STORAGE_KEY, id);
}

async function save(user) {
    if (user._id) {
        const loggedInUser = await getLoggedinUser()
        if (user._id === loggedInUser._id) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return DbService.put(STORAGE_KEY, user);
    } else {
        return DbService.post(STORAGE_KEY, user)
    }
}


async function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _createDefaultUsers() {
    const users = [
        _createUser(),
        _createUser(),
        _createUser()
    ]
    return users
}

async function _createUser() {
    const res = await axios.get('https://randomuser.me/api/')
    const user = res.data.results[0]
    return {
        username: `${user.name.first} ${user.name.last}`,
        email: user.email,
        password: '123',
        phone: user.cell,
        imgUrl: user.picture.large,
        moves: [],
        coins: Utils.getRandomInt(1, 100)
    }
}

