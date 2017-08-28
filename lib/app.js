
class App {

  constructor() {
    this.name = 'Vending Machine App'
    this.itemCountMax = 5
    this.inventory = {
      '0': { name: 'item1', price: 1.00, qt: 0 },
      '1': { name: 'item2', price: 1.25, qt: 0 },
      '2': { name: 'item3', price: 0.66, qt: 0 },
      '3': { name: 'item4', price: 1.00, qt: 0 },
      '4': { name: 'item5', proce: 3.00, qt: 0 }
    }
    this.cashier
    this.resetInventory()
    this.resetCashier()
  }

  getName() {
    return this.name
  }


  printInventory() {
    return { code: 200, products: this.inventory }
  }

  printCashier() {
    return { code: 200, coins: this.cashier }
  }

  refillInventory(batch) {

    try {

      // Validate
      if(typeof batch !== 'object') throw 'invalid input'
      let newInv = JSON.parse(JSON.stringify(this.inventory))
      batch.map(item => {
        if (!newInv[item.id]) throw 'invalid id'
        if (typeof item.qt !== 'number') throw 'qt not number'
        if ( item.qt < 1 ) throw 'qt < 1'
        if (item.qt !==  Math.floor(item.qt)) throw 'qt not integer'
        newInv[item.id].qt += item.qt
      })
      
      // Update
      this.inventory = JSON.parse(JSON.stringify(newInv))
      return { code: 200 }

    } catch(e) {
      return { code: 400, data: 'refill error: ' + e }
    }
  }

  resupplyChange(batch) {

    try {

      // Validate

      let newCoins = JSON.parse(JSON.stringify(this.cashier))
      if(typeof batch !== 'object') throw 'invalid input'
      Object.keys(batch).map(item => {
        if (newCoins[item] === undefined) throw 'invalid coin'
        if (typeof batch[item] !== 'number') throw 'qt not number'
        if (batch[item] < 1 ) throw 'qt < 1'
        if (batch[item] !==  Math.floor(batch[item])) throw 'qt not integer'
        newCoins[item] += batch[item]
      })

      // Update

      this.cashier = JSON.parse(JSON.stringify(newCoins))
      return { code: 200 }

    } catch(e) {
      return { code: 400, data: 'resupply error: ' + e }
    }
  }

  sell(saleData) {
    this.saleDispense(saleData)
    this.saleReturnChange(saleData)
  }

  saleDispense(saleData) {

    try {

      //validate

      let prd = this.inventory[saleData.product]
      if (prd === undefined) throw 'invalid product'
      if (prd.qt < 1 ) throw 'product not available'
      let vl = 0
      Object.keys(saleData.payment).forEach(coin => {
        if (this.cashier[coin] === undefined) throw `invalid payment coin ${coin}`

        const qt = saleData.payment[coin]
        if (typeof qt !== 'number') throw `invalid payment qt (${qt})`
        if (qt < 0 ) throw 'negative coin qt'
        if (qt !== Math.floor(qt, 0)) throw 'not int payment qt'
        vl += (qt * coin/100)
      })
      if (vl < prd.price) throw 'not enough money'

      //update

      this.inventory[saleData.product].qt -= 1
      return { code: 200 }

    } catch(e) {
      return { code: 400, data: 'dispense error: ' + e }
    }
  }

  saleReturnChange(saleData) {

    try {

      // Receive coins 

      const valRec = Object.keys(saleData.payment).reduce((acc, item) => {
        this.cashier[item] += 1
        return acc + (item * saleData.payment[item])/100
      }, 0)

      // Return change

      let changeVal = (valRec - this.inventory[saleData.product].price) * 100
      let changeCoins = {}

      for (let coin of Object.keys(this.cashier).reverse()) {
        if (changeVal === 0) break // change completed
        if (coin > changeVal) continue // coin value above change amount

        const take = Math.min(Math.floor(changeVal/coin), this.cashier[coin]);
        changeCoins[coin.toString()] = take
        changeVal -= (take * coin)
        this.cashier[coin] -= take
      }

      return { code: 200, change: changeCoins }
    } catch(e) {
      return { code: 400, data: 'change error: ' + e }
    }
  }

  resetInventory() {
    Object.keys(this.inventory).map(item => this.inventory[item].qt = 0)
  }

  resetCashier() {
    this.cashier = {
    '1': 0,
    '5': 0,
    '10': 0,
    '25': 0,
    '50': 0,
    '100': 0,
    '200': 0
    }  
  }

}

module.exports = {
  App
}

