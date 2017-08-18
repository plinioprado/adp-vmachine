
let app = new class App {

  constructor() {
    this.setDb()
  }

  getName() {
    return this.name
  }

  printInventory() {
    return this.inventory
  }

  refillInventory() {
    return 'ri'
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

  setDb() {
    this.name = 'Vending Machine App'
    this.itemCountMax = 10
    this.inventory = []
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

