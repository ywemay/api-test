const express = require('express');
const app = express();

process.env.JWT_KEY = 'alkjsdhfpa9werhapsdjhfffffffffff';

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/products')

app.use(express.json());

app.use('/auth', userRoutes);
app.use('/products', productRoutes);

module.exports = app;