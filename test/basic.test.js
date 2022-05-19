const apiTest = require('../index')
server = require('./server')

const test = apiTest({
  server
})

const adminUser = {
  username: 'admin',
  password: 'password'
}

const fakeUser = {
  username: 'fake',
  password: 'password'
}

describe('Basic test', function () {

  test.list('it should get products', {
    credentials: adminUser,
    uri: '/products'
  })
  
  test.put('it should get product', {
    credentials: adminUser,
    uri: '/products/A12',
    check: 200
  })

  test.post('it should post new product', {
    credentials: adminUser,
    uri: '/products',
    item: {name: 'Motorcycle', price: 30300 },
    // check: 200
  })
  
  test.put('it should patch product', {
    credentials: adminUser,
    uri: '/products/A12',
    ops: {price: 30340 },
    // check: 200
  })
  
  test.delete('it should delete product', {
    credentials: adminUser,
    uri: '/products/A12',
    ops: {price: 30340 },
    check: 200
  })
})