
const app = {

  inventory: {},

  coins: {
    '1': 0,
    '5': 0,
    '10': 0,
    '25': 0,
    '50': 0,
    '100': 0,
    '200': 0
  },

  getName: () => {
    return 'Vending Machine App'
  },

  printInventory: () => {
    return 'pi'
  },

  refillInventory: () => {
    return 'ri'
  },

  resupplyChange: () => {
    return 'rc'
  },

  dispenseInventory: () => {
    return 'di'
  },

  returnChangeCoins: () => {
    return 'rc'
  }

}

module.exports = {
  app
}

