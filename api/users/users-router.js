const express = require('express');
const { validateUserId, validateUser } = require('../middleware/middleware');
const User = require('./users-model');


// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  User.get()
  .then(users => {
    res.json(users)
  })
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(next)
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user)
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack
  })
})

// do not forget to export the router
module.exports = router