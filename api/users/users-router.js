const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const {
  validatePost,
  validateUser,
  validateUserId
} = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
  .then(users => {
    res.json(users)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert({name: req.name})
  .then(newUser => {
    res.json(newUser)
  })
  .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, {name: req.name})
  .then(() => {
    return Users.getById(req.params.id)
  })
  .then(user => {
    res.json(user)
  })
  .catch(next)
});

router.delete('/:id', validateUserId,  async (req, res, next) => {
  try{
    await Users.remove(req.params.id)
    res.json(req.user)
   }catch (err){
      next(err)
   }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try{
    const result = await Users.getUserPosts(req.params.id)
    res.json(result)
   }catch (err){
      next(err)
   }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try{
    const result = await Posts.insert({
      user_id: req.params.id,
      text: req.text
    })
    res.status(201).json(result)
  }catch (err){
    next(err)
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customeMessage: 'users router crashed',
    message: err.message,
    stack: err.stack
  })
})
module.exports = router
