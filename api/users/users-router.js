const express = require('express');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const User = require('./users-model');
const Posts = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
  .then(users => {
    res.json(users)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
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

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
  .then(() => {
    res.status(200).json(req.user)
  })
  .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  User.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
    Posts.insert({
      user_id: req.params.id,
      text: req.body.text
    })
    .then(post => {
      res.status(201).json(post)
    })
    .catch(next)
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack
  })
})

module.exports = router