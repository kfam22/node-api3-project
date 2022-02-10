const User = require('../users/users-model');

function logger(req, res, next) {
  const time = new Date().toLocaleString()
  console.log(`[timestamp: ${time}] [method: ${req.method}] [url: ${req.url}]`)
  next()
}

async function validateUserId(req, res, next) {
  // console.log('validateUserId middleware')
  try{
    // get user by id
    const user = await User.getById(req.params.id)
    // does the user exist? !user send 404 and msg
    if(!user){
      res
      .status(404)
      .json({
        message: "user not found"
      })
    } else {
      // else use the user
      req.user = user
      // next middleware
      next()
    }
  } catch (err) {
    console.log(err.message)
  }
}

function validateUser(req, res, next) {
  // console.log('validateUser middleware')
  if(req.body.name && req.body.name.trim()){
    req.body.name = req.body.name.trim();
    next();
  } else {
    next({
      status: 400,
      message: "missing required name field"
    })
  }
}

function validatePost(req, res, next) {
  console.log('validatePost middleware')
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
logger,
validateUserId,
validateUser,
validatePost
}