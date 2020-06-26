const path = require('path')
const autoLoad = require('fastify-autoload')
const formbody = require('fastify-formbody')
const fp = require('fastify-plugin')
const cors = require('fastify-cors')
const swagger = require('fastify-swagger')

/**
 * Configure and starts Fastify server with all required plugins and routes
 * @async
 * @param {Object} config - optional configuration options (default to ./config module)
 *                          May contain a key per plugin (key is plugin name), and an extra
 *                          'fastify' key containing the server configuration object
 * @returns {Fastify.Server} started Fastify server instance
 */

async function plugin(server, config) {
  server
    .register(cors, config.cors)
    .register(swagger, config.swagger)
    .register(formbody)
    .register(autoLoad, {
      dir: path.join(__dirname, 'plugins'),
      options: config
    })
    .register(autoLoad, {
      dir: path.join(__dirname, 'routes'),
      options: config
    })
}

module.exports = fp(plugin)
