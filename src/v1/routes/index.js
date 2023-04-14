const getCurrentVersion = require('../controllers/version')

const routes = require('express').Router


routes.route('version').get(getCurrentVersion)

module.exports = routes