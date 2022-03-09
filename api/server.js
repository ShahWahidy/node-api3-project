const express = require('express');
const logger = require('morgan')
const userRouter = require('./users/users-router')
const server = express();

server.use(express.json())
server.use(logger('dev'))

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
