const chai = require('chai');
chai.should();

module.exports = {

  status: (res, status = 200) => {
    res.should.have.status(status);
  },

  list: function(res, {status, itemsCount} = {}) {
    res.should.have.status(status || 200);
    res.body.should.be.a('object');
    res.body.items.should.be.a('array').that.is.not.empty;
    res.body.items[0].should.be.a('object');
    if (itemsCount !== undefined) {
      res.body.items.should.have.length(itemsCount);
    }
  },

  get: function(res, id = false) {
    res.should.have.status(200);
    res.body.should.be.a('object');
    if (id) {
      res.body.item._id.should.be.equal(id);
    }
  },

  post: function(res) {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.createdItem.should.be.a('object');
  },

  put: function(res) {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.result.should.be.a('object');
    res.body.result.n.should.be.equal(1);
    res.body.ops.should.be.a('object');
  },

  delete: function(res) {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.result.should.be.a('object');
    res.body.result.n.should.be.equal(1);
  }
}
