const { addToWaitlist } = require('../controllers/waitlist')


const routes = require('express').Router()

routes.route('/waitlist').post(addToWaitlist)

module.exports = routes