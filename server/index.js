const { Sequelize } = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

app.use(bodyParser.json())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

app.post('/query', async (req, res) => {
  try {
    const { database, username, password, host, port } = req.body.connection
    const sequelize = new Sequelize(database, username, password, {
      host,
      port: Number(port),
      dialect: 'mysql'
    })

    const query = req.body.query
    const [results, metadata] = await sequelize.query(query)
    await sequelize.close()

    res.json({
      results,
      metadata
    })
  } catch (error) {
    res.status(500).json({
      connected: false,
      error
    })
  }
})

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
