process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { makeUser, Credentials } = require('ywemay-api-user/test/utils/dummy-users');
const { createUser } = require('ywemay-api-user/controllers/users');
const logIn = require('ywemay-api-test/lib/login');
const User = require('ywemay-api-user/models/user');
const Flood = require('ywemay-api-user/models/flood');
// const Product = require('../models/products');
// const { createItem } = require('../controllers/products');
// const { getItems, getItem } = require('../fake/product');

async function getToken(server, user) {
  try {
    const rez = await logIn({server, credentials: Credentials(user)});
    return rez.body?.token;
  } catch (err) {
    console.error(err);
  }
}

const connect = () => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

const cleanDB = async ({models}) => {
  await connect();
  await User.deleteMany({})
  await Flood.deleteMany({})
  if (Array.isArray(models))
    await models.forEach(m => m.deleteMany({}))
}

const initDB = async ({server, users}) => {
  try {
    await cleanDB();
    if (users !== undefined) {
      await Object.keys(users).forEach(async (key) => {
        const u = users[key];
        const user = await makeUser(u.username, u.roles);
        await createUser({ data: user });
        users[key] = {
          user,
          token: await getToken(server, user)
        }
      });
    }
    return { users };
  }
  catch(err) { console.log(err) }
}

module.exports = {
  cleanDB, initDB
}