const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

module.exports = ({server, username, password, url = '/auth/login'}) => {
  return new Promise((resolve, reject) => {
    chai.request(server)
      .post(url)
      .send({username, password})
      .end((err, res) => {
          err ? reject(err) : resolve(res);
      })
  })
}