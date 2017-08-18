const { app } = require('../lib/app')

describe('app', () => {

  it('should print empty inventory report when reset', () => {

    app.resetInventory()
    const received = app.printInventory();
    const expected = {
      code: 200,
      products: {
      '0': { name: 'item1', qt: 0 },
      '1': { name: 'item2', qt: 0 },
      '2': { name: 'item3', qt: 0 },
      '3': { name: 'item4', qt: 0 },
      '4': { name: 'item5', qt: 0 }
      }
    }
    expect(received).toEqual(expected)
  })

  it('should print empty coin report when reset', () => {
    
    app.resetCashier()
    const received = app.printCashier()
    const expected = {
        code: 200,
        coins: {
          '1': 0,
          '5': 0,
          '10': 0,
          '25': 0,
          '50': 0,
          '100': 0,
          '200': 0
        }   
    }
    expect(received).toEqual(expected)
  })

  describe('Refill inventory', () => {

    const mockProducts1 = [
      { id: '0', qt: 10 },
      { id: '1', qt: 20 },
      { id: '2', qt: 30 }
    ]

    it('should not load number', () => {
      const received = app.refillInventory(1);
      expect(received.code).toBe(400)
    })

    it('should load array', () => {
      app.resetInventory()
      const received = app.refillInventory(mockProducts1)
      expect(received).toEqual({ code: 200 })
    })

    it('load should be added in empty inventory', () => {
      const received = app.printInventory()
      const expected = {
        code: 200,
        products: {
        '0': { name: 'item1', qt: 10 },
        '1': { name: 'item2', qt: 20 },
        '2': { name: 'item3', qt: 30 },
        '3': { name: 'item4', qt: 0 },
        '4': { name: 'item5', qt: 0 }
        }
      }
      expect(received).toEqual(expected)
    })

    const mockProducts2 = [
      { id: '2', qt: 10 },
      { id: '3', qt: 20 }
    ]

    it('load should be added in loaded inventory', () => {
      app.refillInventory(mockProducts2)
      const received = app.printInventory()
      const expected = {
        code: 200,
        products: {
        '0': { name: 'item1', qt: 10 },
        '1': { name: 'item2', qt: 20 },
        '2': { name: 'item3', qt: 40 },
        '3': { name: 'item4', qt: 20 },
        '4': { name: 'item5', qt: 0 }
        }
      }
      expect(received).toEqual(expected)
    })  
  })

  describe('should re-supply change', () => {

    it('should not load number', () => {
      const received = app.resupplyChange(1);
      expect(received.code).toBe(400)
    })

    const mockCoins1 = {
      '1': 7,
      '5': 6,
      '10': 5,
      '25': 4,
      '50': 3,
      '100': 2,
      '200': 1
      }

    it('should load coin array', () => {
      const received = app.resupplyChange(mockCoins1)
      expect(received).toEqual({ code: 200 })
    })

    it('load should be added in empty cashier', () => {
      const received = app.printCashier()
      const expected = {
        code: 200,
        coins: {
          '1': 7,
          '5': 6,
          '10': 5,
          '25': 4,
          '50': 3,
          '100': 2,
          '200': 1
          }
      }
      expect(received).toEqual(expected)
    })

  })

  describe('should dispense inventory based on payment', () => {
    
  })

  describe('should return change as coins (eg. $0.35 is 1 quarter and 1 dime)', () => {
    
  })

})
