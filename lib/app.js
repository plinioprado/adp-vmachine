
let app = new class App {

  constructor() {
    this.name = 'Vending Machine App'
    this.itemCountMax = 5
    this.inventory
    this.coins
    this.resetDb()
  }

  getName() {
    return this.name
  }

  printInventory() {
    return { code: 200, data: this.inventory }
  }

  refillInventory(batch) {

    try {
      
      //validate
      let inv = JSON.parse(JSON.stringify(this.inventory))
      batch.map(item => {
        if (!inv[item.id]) throw 'invalid id'
        if (typeof item.qt !== 'number') throw 'qt not number'
        if ( item.qt < 1 ) throw 'qt < 1'
        if (item.qt !==  Math.floor(item.qt)) throw 'qt not integer'
        this.inventory[item.id].qt += item.qt
      })
      return { code: 200 }
    } catch(e) {
      return { code: 400, data: 'error' + e }
    }
  }

  resupplyChange() {
    return 'rc'
  }

  dispenseInventory() {
    return 'di'
  }

  returnChangeCoins() {
    return 'rc'
  }

  resetDb() {
    this.inventory = {
      '0': { name: 'item1', qt: 0 },
      '1': { name: 'item2', qt: 0 },
      '2': { name: 'item3', qt: 0 },
      '3': { name: 'item4', qt: 0 },
      '4': { name: 'item5', qt: 0 }
    }
    this.coins = {
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

