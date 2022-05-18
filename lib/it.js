const chai = require('chai');
chai.should();
const Request = require('./request')

function makeIt(cb) {
  return function(descr, params) {
    it(descr, (done) => {
      cb(params, done);
    });
  }
}

module.exports = (params) => {
  
  const req = Request(params);

  return {
    get: makeIt(req.get),
    list: makeIt(req.list),
    post: makeIt(req.post),
    put: makeIt(req.put),
    delete: makeIt(req.delete),
  }
} 
