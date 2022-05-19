# YWEmay API Test Helpers

An NPM package uses to simplify writting API testing functions.

## Install

```bash
npm i -D ywemay-api-test
```

## Usage

```js
process.env.NODE_ENV = "test";

const apiTest = require("ywemay-api-test");
const server = require("../server");

const test = apiTest({
  server,
  uriLogIn: "/auth/login",
});

const userAdmin = { username: "admin", password: "password" };

describe("My API endpoint test", () => {
  beforeEach((done) => {
    // connect to db - clear/insert data
    done();
  });

  const ops = {
    credentials: userAdmin,
    uri: "/products",
  };

  test.list("it shall get products list", {
    ...ops,
    check: 200, //if number - check status
  });

  test.list("it shall get products list", {
    // if 'credentials' key omitted - log in/authorization will not be performed
    // as result not token will be sent to the tested route
    uri: "/products",
    check: 200, //if number - check status
  });

  test.get("it shall get products list", {
    ...ops,
    id: "09u09u09au0uf",
    // check: 200, //if check key omitted - default check function will be used
  });

  test.post("it shall post a product", {
    ...ops,
    item: { name: "Headphones", price: 123 },
    // own check function:
    check: (res) => {
      res.should.have.status(200);
      res.body.should.be.a("object");
    },
  });

  test.put("it shall modify a product", {
    ...ops,
    id: "92348029384",
    ops: { price: 231 },
    check: (res) => {
      res.should.have.status(200);
      res.body.should.be.a("object");
    },
  });

  test.delete("it shall delete the product", {
    ...ops,
    id: "92348029384",
    check: 200,
  });
});
```
