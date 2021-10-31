import axios from 'axios'

export const bitcoinService = {
    getRate,
    getTradeData,
    getMarketPriceData
}

async function getRate() {
    var rate = JSON.parse(localStorage.getItem('rate'))
    if (!rate) {
        const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
        rate = res.data
        localStorage.setItem('rate', JSON.stringify(rate))
    }
    return rate
}
async function getTradeData() {
    var rate = JSON.parse(localStorage.getItem('trade-volume'))
    if (!rate) {
        const res = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
        rate = res.data
        localStorage.setItem('trade-volume', JSON.stringify(rate))
    }
    rate = rate.values.map(val => {return {date: new Date(val.x * 1000).toLocaleDateString() , value: val.y }})
    return rate
}
async function getMarketPriceData() {
    var price = JSON.parse(localStorage.getItem('market-price'))
    if (!price) {
        const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
        price = res.data
        localStorage.setItem('market-price', JSON.stringify(price))
    }
    price = price.values.map(val => {return {date: new Date(val.x * 1000).toLocaleDateString() , value: val.y }})
    return price
}