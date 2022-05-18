const chai = require('chai');
const chaiHttp = require('chai-http');
const Check = require('./check');
const doLogIn = require('./login');

chai.use(chaiHttp);

function doCheck(res, check, def) {
  if (check === true) return def(res);
  if (Number.isInteger(check)) return Check.status(res, check);
  if (typeof check === 'function') check(res);
}

function runTest(method, done) {
  if (typeof method !== 'function') return done();
  method(params).then(() => {
    done();
  })
  .catch(err => console.error(err));
}

module.exports = ({server, uriLogIn = '/auth/login'}) => {

  const logIn = (params) => {
    doLogIn({server, uriLogIn, ...params})
  }

  return {
    list: function(params, done) {
      const { uri, check } = params;
      const t = new Promise((resolve, reject) => {
        logIn(params).then(login => {
          chai.request(server)
            .get(uri)
            .set({"x-token": login.body.token })
            .end((err, res) => {
              if(err) return reject(err);
              doCheck(res, check, Check.list);
              return resolve(res);
            });
        }).catch(err => resolve(err));
      });
      runTest(t, done);
    },

    get: function(params, done) {
      const { uri, id, check } = params;
      const t = new Promise((resolve, reject) => {
        logIn(params).then(login => {
          chai.request(server)
            .get(uri + (id ? `/${id}` : ''))
            .set({"x-token": login.body.token })
            .end((err, res) => {
              if(err) return reject(err);
              doCheck(res, check, Check.get);
              return resolve(res);
            });
        }).catch(err => resolve(err));
      });
      runTest(t, done);
    },

    post: function(params, done) {
      const { uri, item, check } = params;
      const t = new Promise((resolve, reject) => {
        logIn(params).then(login => {
          chai.request(server)
            .post(uri)
            .set({"x-token": login.body.token, "content-type": "application/json" })
            .send(item)
            .end((err, res) => {
              if(err) return reject(err);
              doCheck(res, check, Check.post);
              return resolve(res);
            });
        }).catch(err => resolve(err));
      });
      runTest(t, done);
    },

    put: function(params, done) {
      const { uri, id, ops, check } = params;
      const t = new Promise((resolve, reject) => {
        logIn(params).then(login => {
          chai.request(server)
            .put(uri + (id ? `/${id}` : ''))
            .set({"x-token": login.body.token, "content-type": "application/json" })
            .send(ops)
            .end((err, res) => {
              if(err) return reject(err);
              doCheck(res, check, Check.put);
              return resolve(res);
            });
        }).catch(err => resolve(err));
      });
      runTest(t, done);
    },

    delete: function(params, done) {
      const { uri, id, check } = params;
      const t = new Promise((resolve, reject) => {
        logIn(params).then(login => {
          chai.request(server)
            .delete(uri + (id ? `/${id}` : ''))
            .set({"x-token": login.body.token, "content-type": "application/json" })
            .end((err, res) => {
              if(err) return reject(err);
              doCheck(res, check, Check.delete);
              return resolve(res);
            });
        }).catch(err => resolve(err));
      });
      runTest(t, done);
    },
  }
}