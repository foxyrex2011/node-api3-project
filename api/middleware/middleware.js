const Posts = require('../posts/posts-model')
const Users = require('../users/users-model')

function logger(req, res, next) {
  const timestamp = new Date().toLocaleDateString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
    if (!user) {
      next({status: 404, message: 'user not found'})
    } else {
      res.user = user
      next()
    }
  } catch {

  }
  next()
}

function validateUser(req, res, next) {
  const {name} = req.body;
    if (!name || !name.trim()) {
      res.status(400).json({
        message: 'missing required name field'
      })
    } else {
      req.name = name.trim()
      next()
    }
}

function validatePost(req, res, next) {
  const {text} = req.body
    if (!text || !text.trim()) {
      res.status(400).json({
        message: 'missing required text field'
      })
    } else {
      req.text = text.trim()
      next()
    }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}