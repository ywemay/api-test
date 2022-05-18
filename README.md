# YWEmay API Test Helpers

An NPM package uses to simplify writting API testing functions.

## Install

```bash
npm i -D ywemay-api-test
```

## Usage

```js
process.env.NODE_ENV = 'test';

const apiTest = require('ywemay-api-test');
const server = require('../server');

const test = apiTest({
  server,
  uriLogIn: '/auth/login',
})

const userAdmin = {username: 'admin', password: 'password'}

describe('My API endpoint test', () => {

  beforeEach((done) => {
    // connect to db - clear/insert data
    done();
  })

  test.get('it shall get products list', {
    ...userAdmin,
    uri: '/products',
    check: 200, //if number - check status
  })

  test.post('it shall post a product', {
    ...userAdmin,
    uri: '/products',
    item: {name: 'Headphones', price: 123},
    check: (res) => { // own check function
      res.should.have.status(200);
      res.body.should.be.a('object');
    }
  })
  
  test.put('it shall modify a product', {
    ...userAdmin,
    uri: '/products',
    id: '92348029384',
    ops: {price: 231},
    check: (res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
    }
  })

  test.delete('it shall delete the product', {
    ...userAdmin,
    id: '92348029384',
    check: 200,
  })
})
```