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

router.post('/getMd',async (ctx, next) =>　{
 try{
   const result = await ArticleSchema.findOne({
     _id: ctx.request.body._id
   })
   // const results = await ArticleSchema.find({})//全部文章
   // 这里没有考虑异常，直接返回了结果
   ctx.body = {
     code: 0,
     result
   }
 }catch(err) {
   ctx.body = {
     code: -1,
     error: err
   }
 }
})

router.get('/getTags',async (ctx, next) =>　{
  try{
    const tags = await ArticleSchema.find({},{tag: 1})//全部文章
    ctx.body = {
      code: 0,
      tags
    }
  }catch(err) {
    ctx.body = {
      code: -1,
      error: err
    }
  }
})

router.post('/getCategory',async (ctx, next) =>　{
  try{
    let {tag} = ctx.request.body
    const article = await ArticleSchema.find({tag: new RegExp(tag, "i")})//查询tag中含有对应字符串的数据
    ctx.body = {
      code: 0,
      article,
      count: article.length
    }
  }catch(err) {
    ctx.body = {
      code: -1,
      error: err
    }
  }
})

router.post('/getArticleList',async (ctx, next) =>　{
  try{
    let req = ctx.request.body;
    let page = (req.page-1) * req.pageSize;
    let pageSize = parseInt(req.pageSize);
    let article = await ArticleSchema.find({}).skip(page).limit(pageSize).sort({'_id':-1});//skip(n)跳过前面的n条数据，limit()限制返回结果的最大数量
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
router.get('/getAdminArticleList',async (ctx, next) =>　{
  try{
    let article = await ArticleSchema.find({}).sort({'_id':-1});
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
    tag,
    count
  } = ctx.request.body;//获取前端传来的参数值
  let article = await ArticleSchema.create({
    title,
    createTime,
    cover,
    cont,
    md,
    tag,
    count
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

router.post('/UpdateArticle', async (ctx) => {
  const {
    _id,
    title,
    createTime,
    cover,
    cont,
    md,
    tag
  } = ctx.request.body;//获取前端传来的参数值
  let article = await ArticleSchema.update({_id:_id},{
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
    msg: '修改成功'
  }
})

router.post('/UpdateViewCount', async (ctx) => {
  const {
    _id,
    count
  } = ctx.request.body;//获取前端传来的参数值
  let article = await ArticleSchema.update({_id:_id},{
   count
  }, (err) => {
    ctx.body = {
      code: -1,
      msg: err
    }
  })
  ctx.body = {
    code: 0,
  }
})

router.post('/deleteArticle', async (ctx) => {
  try{
    let {id} = ctx.request.body
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
