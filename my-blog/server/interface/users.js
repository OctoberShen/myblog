// import Router from 'koa-router';
// import Redis from 'koa-redis';
// import nodeMailer from 'nodemailer'
// import UserSchema from '../dbs/models/users'
// import ArticleSchema from '../dbs/models/article'
// import Passport from './utils/passport'
// import Email from '../dbs/config'
// import axios from './utils/axios'

const Router = require('koa-router');
const Redis = require('koa-redis');
const nodeMailer = require('nodemailer');
const UserSchema = require('../dbs/models/users');
const ArticleSchema = require('../dbs/models/article');
const Passport = require('./utils/passport');
const Email = require('../dbs/config');
const axios = require('./utils/axios');


let router = new Router({
  prefix: '/users'
})
let Store = new Redis().client

router.post('/signup', async (ctx)=> {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;
  if(code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if(code === saveCode) {
      if(new Date().getTime() - saveExpire > 0){
        ctx.body = {
          code:　-1,
          msg: '验证码已过期，请重新发送'
        }
        return false
      }
    }else {
      ctx.body = {
        code: -1,
        msg:　'请填写正确的验证码'
      }
    }
  }else {
    ctx.body = {
      code:　-1,
      msg: '请填写验证码'
    }
  }
  let user = await UserSchema.find({
    username
  })
  if(user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  let nuser = await UserSchema.create({
    username,
    password,
    email
  })
  if(nuser) {
    let res = await axios.post('/signin', {username,password})
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    }else {
      ctx.body = {
        code: -1,
        mas: 'error'
      }
    }
  }else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info, status) {
    if(err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    }else {
      if(user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      }else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire <0) {
    ctx.body = {
      code: -1,
      msg: '请求过于频繁，请稍后再试'
    }
    return false
  }
  //配置邮件发送验证码相关
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: Email.smtp.port,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  let mailOptions = {
    from: `OctoberShen<${Email.smtp.user}>`,
    to: ko.email,
    subject: '博客注册码',
    html: `您的注册码是${ko.code},如果不是本人操作请忽略！`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error)
    }else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，有效期1分钟，可能会存在延迟请耐心等待'
  }
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  //判断是否为登录状态
  if(!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  }else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async (ctx) =>　{
  if(ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  }else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

// export default router
module.exports = router
