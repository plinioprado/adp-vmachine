const { app } = require('../lib/app')

describe('app', () => {

    it('should be the Vending Machine App', () => {
      const received = app.getName();
      const expected = 'Vending Machine App';
      expect(received).toBe(expected)
    })

    it('should reset and print empty inventory', () => {
      app.resetDb()
      const received = app.printInventory();
      const expected = {
        code: 200,
        data: {
        '0': { name: 'item1', qt: 0 },
        '1': { name: 'item2', qt: 0 },
        '2': { name: 'item3', qt: 0 },
        '3': { name: 'item4', qt: 0 },
        '4': { name: 'item5', qt: 0 }
        }
      }
      expect(received).toEqual(expected)
    })

    describe('Refill inventory', () => {

      const mockData = [
        { id: '0', qt: 10 },
        { id: '1', qt: 20 },
        { id: '2', qt: 30 }
      ]

      it('should not load number', () => {
        const received = app.refillInventory(1);
        expect(received.code).toBe(400)
      })
      
      it('should load array', () => {
        app.resetDb()
        const received = app.refillInventory(mockData)
        expect(received.code).toBe(200)
      })  

      it('load should be added in empty inventory', () => {
        const received = app.printInventory()
        const expected = {
          code: 200,
          data: {
          '0': { name: 'item1', qt: 10 },
          '1': { name: 'item2', qt: 20 },
          '2': { name: 'item3', qt: 30 },
          '3': { name: 'item4', qt: 0 },
          '4': { name: 'item5', qt: 0 }
          }
        }
        expect(received).toEqual(expected)
      })
      
      it('load should be added in loaded inventory', () => {
        app.refillInventory(mockData)
        const received = app.printInventory()
        const expected = {
          code: 200,
          data: {
          '0': { name: 'item1', qt: 20 },
          '1': { name: 'item2', qt: 40 },
          '2': { name: 'item3', qt: 60 },
          '3': { name: 'item4', qt: 0 },
          '4': { name: 'item5', qt: 0 }
          }
        }
        expect(received).toEqual(expected)
      })  
    
    })



    describe('should re-supply change', () => {

    })

    describe('should dispense inventory based on payment', () => {
      
    })

    describe('should Return change as coins (eg. $0.35 is 1 quarter and 1 dime)', () => {
      
    })

})
