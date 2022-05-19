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
    ...adminUser,
    uri: '/products'
  })

  test.post('it should post new product', {
    ...adminUser,
    uri: '/products',
    item: {name: 'Motorcycle', price: 30300 },
    check: 200
  })
  
  test.post('it should post new product', {
    ...fakeUser,
    uri: '/products',
    item: {name: 'Motorcycle', price: 30300 },
    check: 200
  })
})