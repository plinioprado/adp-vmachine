const { app } = require('../lib/app')

describe('app', () => {

  it('should print empty inventory report when reset', () => {

    app.resetInventory()
    const received = app.printInventory();
    const expected = {
      code: 200,
      products: {
      '0': { name: 'item1', price: 1.00, qt: 0 },
      '1': { name: 'item2', price: 1.25, qt: 0 },
      '2': { name: 'item3', price: 0.66, qt: 0 },
      '3': { name: 'item4', price: 1.00, qt: 0 },
      '4': { name: 'item5', proce: 3.00, qt: 0 }
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
          '0': { name: 'item1', price: 1.00, qt: 10 },
          '1': { name: 'item2', price: 1.25, qt: 20 },
          '2': { name: 'item3', price: 0.66, qt: 30 },
          '3': { name: 'item4', price: 1.00, qt: 0 },
          '4': { name: 'item5', proce: 3.00, qt: 0 }
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
          '0': { name: 'item1', price: 1.00, qt: 10 },
          '1': { name: 'item2', price: 1.25, qt: 20 },
          '2': { name: 'item3', price: 0.66, qt: 40 },
          '3': { name: 'item4', price: 1.00, qt: 20 },
          '4': { name: 'item5', proce: 3.00, qt: 0 }
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

    it('should load coin array', () => {
      const received = app.resupplyChange({
        '1': 4,
        '5': 9,
        '10': 9,
        '25': 9,
        '50': 9,
        '100': 9,
        '200': 9        
      })
      expect(received).toEqual({ code: 200 })
    })

    it('load should be added to empty cashier', () => {
      const received = app.printCashier()
      const expected = {
        code: 200,
        coins: {
          '1': 4,
          '5': 9,
          '10': 9,
          '25': 9,
          '50': 9,
          '100': 9,
          '200': 9
          }
      }
      expect(received).toEqual(expected)
    })

    it('load should be added in loaded cashier', () => {
      app.resupplyChange({
        '1': 1,
        '5': 1,
        '10': 1,
        '25': 1,
        '50': 1,
        '100': 1,
        '200': 1        
      })
      const received = app.printCashier()
      const expected = {
        code: 200,
        coins: {
          '1': 5,
          '5': 10,
          '10': 10,
          '25': 10,
          '50': 10,
          '100': 10,
          '200': 10
          }
      }
      expect(received).toEqual(expected)
    })


  })

  describe('sell', () => {

    describe('when dispense inventory', () => {

      it('should return ok if valid data', () => {
        const received = app.saleDispense({
          product: '1',
          payment: {
            '100': 1,
            '50': 1
          }
        })
        expect(received).toEqual({ code: 200 })
      })

      it('should return error when invalid product', () => {
        const received = app.saleDispense(
            {
              product: 'x',
              payment: { '100': 1 }
            }
          )
        expect(received.code).toEqual(400)
      })

      it('should return error when unavailbable product', () => {
        const received = app.saleDispense(
            {
              product: '5',
              payment: { '200': 1 }
            }
          )
        expect(received.code).toEqual(400)
      })

      it('should return error when invalid coin', () => {
        const received = app.saleDispense(
            {
              product: '1',
              payment: { '33': 1 }
            }
          )
        expect(received.code).toEqual(400)
      })

      it('should return error when insufficient money', () => {
        const received = app.saleDispense(
            {
              product: '1',
              payment: { '10': 1 }
            }
          )
        expect(received.code).toEqual(400)
      })

      it('cashier should not be impacted by invalid sales', () => {
        const received = app.printCashier()
        const expected = {
          code: 200,
          coins: {
            '1': 5,
            '5': 10,
            '10': 10,
            '25': 10,
            '50': 10,
            '100': 10,
            '200': 10
            }
        }
        expect(received).toEqual(expected)
      })
    })

    describe('when return change', () => {
      
      it('should return change if valid data', () => {
        const received = app.saleReturnChange(
          {
            product: '2',
            payment: {
              '100': 1
            }
          }
        )
        expect(received).toEqual({ code: 200, change: { '25': 1, '5': 1, '1': 4 } })
      })

      it('cashier should reflect received and returned coins', () => {   
        const received = app.printCashier()
        const expected = {
          code: 200,
          coins: {
            '1': 1,
            '5': 9,
            '10': 10,
            '25': 9,
            '50': 10,
            '100': 11,
            '200': 10
            }
        }
        expect(received).toEqual(expected)
      })   

      it('should return change limited to available coins, confirming if last change updated cashier', () => {
        const received = app.saleReturnChange(
          {
            product: '2',
            payment: {
              '100': 1
            }
          }
        )
        expect(received).toEqual({ code: 200, change: { '25': 1, '5': 1, '1': 1 } })
      })

    })

    // describe('sale should dispense inventory then return change', () => {

    //   app.saleDispense = jest.fn(() => true)
    //   app.saleReturnChange = jest.fn(() => true)

    //   it('should call dispense inventory', () => {
    //     app.sell(mockSale)
    //     expect(app.saleDispense).toHaveBeenCalled()
    //   })
  
    //   it('then should call return change', () => {
    //     app.sell(mockSale)
    //     expect(app.saleReturnChange).toHaveBeenCalled()
    //   })

    // })

  })  

})
