// import Koa from 'koa'
// import consola from 'consola'
// import { Nuxt, Builder } from 'nuxt'
// import mongoose from 'mongoose'
// import bodyParser from 'koa-bodyparser'
// import session from 'koa-generic-session'
// import Redis from 'koa-redis'
// import json from 'koa-json'
// import dbConfig from './dbs/config'
// import passport from './interface/utils/passport'
// import users from './interface/users'
// import blog from './interface/blog'
const Koa  = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const Redis = require('koa-redis')
const json = require('koa-json')
const dbConfig = require('./dbs/config')
const passport = require('./interface/utils/passport')
const users = require('./interface/users')
const blog = require('./interface/blog')
const img = require('./interface/img')

const app = new Koa();

//配置session存储
app.keys = ['myBlog', 'keyskeys']//显示在cookie上的名字
app.proxy = true
app.use(session({key: 'myBlog', prefix: 'myBlog:uid', store: new Redis()}))
app.use(bodyParser({
  extendsType: ['json', 'from', 'text']
}))
app.use(json())
//连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  //引入路由
  app.use(users.routes()).use(users.allowedMethods())
  app.use(blog.routes()).use(blog.allowedMethods())
  app.use(img.routes()).use(img.allowedMethods())
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start();
