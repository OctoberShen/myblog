const Router = require('koa-router')
const qiniu = require('qiniu')
const formidable = require('formidable')

let router = new Router({
  prefix: '/img'
})
router.post('/uploadImg',async (ctx, next) =>　{
  try{
      let accessKey = ''  // 源码删除:七牛云获取 ak,必须配置
      let secretKey = ''  // 源码删除:七牛云获取 sk, 必须配置
      let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
      let options = {
        scope: 'octobershen',  // 对应七牛云存储空间名称
        expires: 7200
      };
      let putPolicy = new qiniu.rs.PutPolicy(options);
      let uploadToken = putPolicy.uploadToken(mac);
      let form = formidable.IncomingForm();
      let {respErr, respBody, respInfo, filename} = await new Promise((resolve) => {
      form.parse(ctx.req, function (err, fields, file) {
        if(file) {
          let localFile = file.file.path
          let config = new qiniu.conf.Config();
          let formUploader = new qiniu.form_up.FormUploader(config);
          let putExtra = new qiniu.form_up.PutExtra();
          let key= file.file.name;
          formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr, respBody, respInfo) {
            resolve({
              respErr,
              respBody,
              respInfo,
              filename: key
            })
          })
        }
      })
    })
    ctx.body = {
      respErr,
      img: `http://image.shenchangbin.top/${respBody.key}`,//在七牛云上配置域名
      hash: respBody.hash,
      status: respInfo.statusCode,
      filename: respBody.key
    }
  }catch(error) {
    ctx.body = {
      code: -1,
      error: error
    }
  }
})

router.post('/deleteImg', async (ctx) =>{
  try {
    var bucket = "octobershen";
    var {key} =ctx.request.body ;
    let accessKey = ''   // 源码删除:七牛云获取 ak,必须配置
    let secretKey = ''  // 源码删除:七牛云获取 sk,必须配置
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let config = new qiniu.conf.Config();
    let bucketManager = new qiniu.rs.BucketManager(mac, config);
    let {error, respInfo} = await new Promise((resolve) => {
      bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
        resolve({error: err,respBody, respInfo})
      });
    })
    ctx.body = {
      code: 0,
      msg: '删除成功',
      info: respInfo
    }
  }catch (err) {
    ctx.body = {
      code: -1,
      error: err
    }
  }
})

// export default router
module.exports = router
