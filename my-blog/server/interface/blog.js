// import Router from 'koa-router';
// import ArticleSchema from '../dbs/models/article'
// import Passport from './utils/passport'
// import axios from './utils/axios'
// import mongoose from 'mongoose'

const Router = require('koa-router')
const ArticleSchema = require('../dbs/models/article')


let router = new Router({
  prefix: '/blog'
})

// router.get('/test', (ctx, next) => {
//   ctx.body = {
//     status: 200,
//     data: {
//       info: '接口返回信息'
//     }
//   };
// })

router.get('/getMd',async (ctx, next) =>　{
  const result = await ArticleSchema.findOne({
    title: ctx.request.body.title
  })
  const results = await ArticleSchema.find({})
  // 这里没有考虑异常，直接返回了结果
  ctx.body = {
    code: 0,
    result,
    results
  }
})
router.post('/getArticleList',async (ctx, next) =>　{
  try{
    let req = ctx.request.query;
    let { parseInt } = Number;
    let page = parseInt((req.page-1) * req.pagesize);
    let pagesize = parseInt(req.pagesize);
    let article = await ArticleSchema.find({},{__v:0}).skip(page).limit(pagesize).sort({'_id':-1});
    let articleCount = await ArticleSchema.count({});
    ctx.body = {
      code: 0,
      count:articleCount,
      article
    }
  }catch(e){
    //handle error
    ctx.body = {code:1,info:e}
  }

})

router.post('/saveArticle', async (ctx) => {
  const {
    title,
    createTime,
    cover,
    cont,
    md,
    tag
  } = ctx.request.body;//获取前端传来的参数值
  let article = await ArticleSchema.create({
    title,
    createTime,
    cover,
    cont,
    md,
    tag
  }, (err) => {
    ctx.body = {
      code: -1,
      msg: err
    }
  })
  ctx.body = {
    code: 0,
    msg: '发布成功'
  }
})

router.post('/deleteArticle', async (ctx) => {
  try{
    let {id} = ctx.request.body
    console.log('str',id)
    let res = await ArticleSchema.remove({_id:id});
    ctx.body={
      code: 0,
      msg: '删除成功',
      info: res
    }
  }catch (e) {
    ctx.body = {
      code: 1,
      msg: '删除失败',
      err: e
    }
  }
})


// export default router
module.exports = router