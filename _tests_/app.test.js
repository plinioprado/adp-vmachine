const { app } = require('../lib/app')

describe('app', () => {

    it('should be the Vending Machine App', () => {
      const received = app.getName();
      const expected = 'Vending Machine App';
      expect(received).toBe(expected)
    })

    it('should print inventory', () => {
      app.setDb()
      const received = app.printInventory();
      expect(received).toEqual([])
    })

    describe('should refill inventory', () => {
      

    })

    describe('should re-supply change', () => {

    })

    describe('should dispense inventory based on payment', () => {
      
    })

    describe('should Return change as coins (eg. $0.35 is 1 quarter and 1 dime)', () => {
      
    })

})
