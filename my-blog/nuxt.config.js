const pkg = require('./package');


module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
      src: 'https://hm.baidu.com/hm.js?7ba96cef18b2fb655f0cc99484fea692'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/fonts/element-icons.woff',
    'element-ui/lib/theme-chalk/fonts/element-icons.ttf',
    'mavon-editor/dist/css/index.css',
    '@/assets/css/reset.css',
    '@/assets/css/Normalize.css',
    '@/assets/icon/iconfont.css',
    {
      src: '@/common/stylus/base.styl',
      lang: 'stylus'
    }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    {
      src: '@/plugins/vue-mavon-editor',
      ssr: false
    },
    {
      src: '@/assets/icon/iconfont.js',
      ssr: false
    },
    {src:'@/plugins/baidu.js', ssr:false}
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true, // 开启proxy
    credentials: true, //认证信息
    // baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT||3000}`,
    // baseURL: 'http://shenchangbin.top',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  },
  // proxy: {
  //   '/users': {
  //     target: 'http://www.shenchangbin.top',
  //     changeOrigin: true,
  //     pathRewrite: {  //重写地址
  //       '^/users' : '/users'
  //     }
  //   },
  //   '/blog': {
  //     target: 'http://www.shenchangbin.top',
  //     changeOrigin: true,
  //     pathRewrite: {  //重写地址
  //       '^/blog' : '/blog'
  //     }
  //   }
  // },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    // Run ESLint on save
    // if (ctx.isDev && ctx.isClient) {
    //   config.module.rules.push({
    //     enforce: 'pre',
    //     test: /\.(js|vue)$/,
    //     loader: 'eslint-loader',
    //     exclude: /(node_modules)/
    //   })
    // }
    // },
    cache: true,

  }
}
