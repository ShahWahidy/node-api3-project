const Users = require('../users/users-model')


async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(404).json({
      message: 'user not found',
    })

  }
}

function validateUser(req, res, next) {
  console.log('req body', req.body)
  const { name } = req.body
  if(!name || !name.trim()){
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
      req.name = name.trim()
      next()
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if(!text|| !text.trim()){
    res.status(400).json({
      message: 'missing required text field'
    })
  }else{
    req.text = text.trim();
    next();
  }
}

module.exports = {
  validateUser,
  validateUserId,
  validatePost,
}
