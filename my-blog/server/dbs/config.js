export default {
  dbs: 'mongodb://127.0.0.1:27017/myBlog',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get port() {
      return 587
    },
    get user() {
      return '3415895109@qq.com'
    },
    get pass() {
      return '自己的授权码'
    },
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase();
      }
    },
    get expire() {
      return () => {
        return new Date().getTime()+60*1000*60
      }
    }
  }
}
