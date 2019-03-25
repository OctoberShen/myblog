const Router = require('koa-router')
const qiniu = require('qiniu')
/**
 * private API
 * @method token
 * @param {object} 获取七牛云上传图片token
 * @return {token|null}  token
 */

let router = new Router({
  prefix: '/img'
})
router.post('/uploadImg',async (ctx, next) =>　{
  try{
      let accessKey = 'bdTF5iPtsu8WwxD1nKuPPzQgsLal8-7Uru08-dOe'  // 源码删除:七牛云获取 ak,必须配置
      let secretKey = 'e-3xl-9cmA6SfmBJopeWSZZ7vT2IczHJM3DAMFW9'  // 源码删除:七牛云获取 sk, 必须配置
      let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
      let options = {
        scope: 'octobershen',  // 对应七牛云存储空间名称
      };
      let putPolicy = new qiniu.rs.PutPolicy(options);
      let uploadToken = putPolicy.uploadToken(mac);
      ctx.body = {
        code: 0,
        uploadToken: uploadToken
      }
  }catch(err) {
    ctx.body = {
      code: -1,
      error: err
    }
  }
})

let getToken = async (ctx) => {
  let accessKey = 'bdTF5iPtsu8WwxD1nKuPPzQgsLal8-7Uru08-dOe'  // 源码删除:七牛云获取 ak,必须配置
  let secretKey = 'e-3xl-9cmA6SfmBJopeWSZZ7vT2IczHJM3DAMFW9'  // 源码删除:七牛云获取 sk, 必须配置
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  let options = {
    scope: 'octobershen',  // 对应七牛云存储空间名称
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);
  ctx.body = uploadToken
}

// export default router
module.exports = router
