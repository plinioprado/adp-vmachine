
let app = new class App {

  constructor() {
    this.name = 'Vending Machine App'
    this.itemCountMax = 5
    this.inventory
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
      if(typeof batch !== 'object') throw 'invalid input'
      let newInv = JSON.parse(JSON.stringify(this.inventory))
      batch.map(item => {
        if (!newInv[item.id]) throw 'invalid id'
        if (typeof item.qt !== 'number') throw 'qt not number'
        if ( item.qt < 1 ) throw 'qt < 1'
        if (item.qt !==  Math.floor(item.qt)) throw 'qt not integer'
        newInv[item.id].qt += item.qt
      })
      this.inventory = JSON.parse(JSON.stringify(newInv))
      return { code: 200 }
    } catch(e) {
      return { code: 400, data: 'refill error: ' + e }
    }
  }

  resupplyChange(batch) {

    try {
      
      let newCoins = JSON.parse(JSON.stringify(this.cashier))
      if(typeof batch !== 'object') throw 'invalid input'
      Object.keys(batch).map(item => {
        if (newCoins[item] === undefined) throw 'invalid coin'
        if (typeof batch[item] !== 'number') throw 'qt not number'
        if (batch[item] < 1 ) throw 'qt < 1'
        if (batch[item] !==  Math.floor(batch[item])) throw 'qt not integer'
        newCoins[item] += batch[item]
      })
      this.cashier = JSON.parse(JSON.stringify(newCoins))
      return { code: 200 }
    } catch(e) {
      return { code: 400, data: 'resupply error: ' + e }
    }
  }

  dispenseInventory() {
    return 'di'
  }

  returnChangeCoins() {
    return 'rc'
  }

  resetInventory() {
    this.inventory = {
      '0': { name: 'item1', qt: 0 },
      '1': { name: 'item2', qt: 0 },
      '2': { name: 'item3', qt: 0 },
      '3': { name: 'item4', qt: 0 },
      '4': { name: 'item5', qt: 0 }
    }
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
  app
}

