'use strict'

const bootstrap = (router, routes, version) => {

  router.use(`/api/${version}`, routes)

  router.get('/', (request, response) => {
    response.status(200).json({ statusMessage: 'OK', statusCode: 200 })
  })

}

module.exports = {
  bootstrap
}