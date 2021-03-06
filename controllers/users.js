'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user')
var Users = require('../models/users')

router.route('/users/:user_id')
  .get(function (req, res) {
    User.where('id', req.params.user_id).fetch()
    .then (function (user) {
      if (user) {
        res.json(user.toJSON())
      }
      else {
        res.status(500).json({error: true, data: {message: 'Unabled to find user'}});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })

router.route('/users')
  // fetch all users
  .get(function (req, res) {
    Users.forge()
    .fetch({
      columns: ['id', 'email', 'name']
    })
    .then(function (collection) {
      res.json(collection.toJSON());
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })
  // create a user
  .post(function (req, res) {
    User.forge({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .save()
    .then(function (user) {
      res.json({error: false, data: {id: user.get('id')}})
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}})
    })
  })

module.exports = router;
