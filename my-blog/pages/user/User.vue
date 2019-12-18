<template>
    <section class="user">
      <h1 class="user-title">关于博客</h1>
      <div class="introduce-wrapper">
        <div class="introduce-item">
          <p class="question">1.为什么要做这个博客？</p>
          <p class="answer">这个是我写的第一个博客,自己独立完成了前台页面和后台接口的全部工作，首先写这个博客的初衷是为了把这段时间学的新知识加以利用以及巩固，其次也是为了让自己将平时在工作和学习中积累
          的一些笔记做个归纳整理，最后是希望自己养成写博客的习惯。
          </p>
        </div>
        <div class="introduce-item">
          <p class="question">2.博客使用的技术栈有哪些？</p>
          <p class="answer">博客使用的技术栈主要有Nuxt.js、Vue.js、Node.js、koa2、Element-UI、MongoDB、Nginx</p>
        </div>
        <div class="introduce-item">
          <p class="question">3.博客实现了那些功能？</p>
          <div class="answer">
          <ul class="answer-list">
            <li>1.用户登录/注册/退出</li>
            <li>2.发布博客文章</li>
            <li>3.修改博客文章</li>
            <li>4.文章卡片展示</li>
            <li>5.文章详情页</li>
            <li>6.文章分类</li>
            <li>7.文章搜索</li>
            <li>8.个人页面</li>
            <li>9.后台管理页面(需登录)</li>
            <li>10.草稿箱</li>
            <li>11.照片墙（开发中）</li>
            <li>12.评论（开发中）</li>
            <li>13.图片上传</li>
            <li>14.用户管理（开发中）</li>
          </ul>
          </div>
        </div>
        <div class="introduce-item">
          <p class="question">4.博客源码地址？</p>
          <p class="answer"><a class="project-address" href="https://gitee.com/OctoberShen/my-blog">https://gitee.com/OctoberShen/my-blog</a></p>
        </div>
      </div>
      <span class="separator"></span>
      <h1 class="user-title">关于我</h1>
      <div class="introduce-wrapper">
        <!-- <div class="introduce-item">
          <p class="question">1.编程经历</p>
          <p class="answer">
            我叫沈昌斌，24岁，浙江温州人。从一开始的什么都不懂到现在成为一个能独挡一面的前端开发（公司只有我一个前端，没办法咱啥都得会一点啊，哈哈），差不多已经两年的时间了。
              这两年先是重构了公司的智慧校园平台项目，这个项目主要是针对中小学老师日常办公和学生及家长的家校联合的功能。前端主要技术栈是jquery、jquery-ui、bootstrap模板引擎是
              Freemarker,后台用的java、springBoot。得益于这个项目非常复杂的业务，我使用jquery的能力在那时候进步的很快。然后公司又启动了这个项目的微信企业号的计划，这个项目我
              主要使用了mui这个框架，这个框架封装了挺多类似原生APP的UI组件。通过这个项目熟悉了移动端的开发与pc端的不同之处，对于响应式布局这块基本采用了rem、百分比、@media、calc
              几种办法来实现，到后期又加上了flex布局。这段时间踩了不少安卓苹果设备兼容性的坑，不过也让我的代码调试能力得到了很大提升。然后公司准备做在线教育这块的内容，让我
              先做一个绘画白板的demo，首先我采用的是原生canvas来制作，一开始顺利的开发好了白板的画笔和基本图形，但是在开发录制回放和后续测试中发现性能并没有达到我们预期的效果
              于是我将目光锁定了在了svg上，我使用了snap.svg.js来开发绘画白板，然后用node.js写了websocket服务来实现多个浏览器之间的画面同步和聊天。在此期间也学习了ES6语法，和
              vue.js于是便有了现在的这个博客，这次选择的是vue.js + node.js作为前后台的主要语言，使用了Nuxt.js做了SSR，UI使用的是element-ui，数据库使用的是mongoDB。用来git来做
              版本管理。基本上是实现了从前端到后端全流程的开发以及打包部署上线的过程，这次遇到的主要难题还是集中在服务端部署这块了（毕竟之前一直没有接触过这块内容），通过万能的goole和百度还是挺过来了。
              这次的开发经历还是学到了很多东西，比如Linux的一些基本操作命令，mongoose的使用，比如跨域问题，在vue中可以通过proxyTable来解决，而Nuxt.js中也可以通过@nuxtjs/proxy来配置跨域，但是在线上版本无效
              最后通过Nginx配置反向代理来解决。
            再接再厉，继续加油！
            
          </p>
        </div> -->
        <div class="introduce-item">
          <p class="question">技术栈</p>
          <div class="answer">
            <ul class="answer-list">
              <li>html/html5</li>
              <li>css/css3</li>
              <li>javascript/jquery</li>
              <li>es6</li>
              <li>svg/canvas</li>
              <li>vue.js</li>
              <li>nuxt.js</li>
              <li>node.js</li>
            </ul>
          </div>
        </div>

        <div class="introduce-item">
          <p class="question">兴趣爱好</p>
          <div class="answer">
            <ul class="answer-list">
              <li>健身</li>
              <li>篮球</li>
              <li>code</li>
              <li>做饭</li>
              <li>游戏（塞尔达/2K系列/LOL）</li>
              <li>摄影</li>
            </ul>
          </div>
        </div>

        <div class="introduce-item">
          <p class="question">9102年目标</p>
          <div class="answer">
            <ul class="answer-list">
              <li>开发完博客剩余功能</li>
              <li>维护博客坚持写博客</li>
              <li>开发一款自己的小程序</li>
              <li>学习一波vue源码</li>
              <li>看完12本书</li>
            </ul>
          </div>
        </div>

        <div class="introduce-item">
          <p class="question">联系方式</p>
          <div class="answer">
            <ul class="answer-list">
              <li>邮箱：shenchangbin@163.com</li>
              <li>qq: 1099784977</li>
            </ul>
          </div>
        </div>

      </div>

    </section>
</template>

<script>
    export default {
        name: "user",
    }
</script>

<style lang="stylus" scoped>
@media screen and (max-width 768px)
  .user
    max-width 90% !important
    .user-title
      font-size 20px !important
    .question
      font-size 16px !important
    .answer
      font-size 14px !important

.user
  max-width 1000px
  margin 0 auto
  padding 14px
  display flex
  flex-direction column
  align-items center
  margin-top 50px
  margin-bottom 50px
  box-shadow 0 0px 3px rgba(0,0,0,0.157), 0 0px 3px rgba(0,0,0,0.227)
  .user-title
    font-size 24px
    margin-bottom 20px
  .separator
    display inline-block
    width 100%
    height 1px
    margin-top 10px
    margin-bottom 10px
    background-color #cccccc
  .introduce-wrapper
    width 100%
    .introduce-item
      display flex
      flex-direction column
      justify-content space-between
      margin-bottom 10px
      .question
        font-size 18px
        font-weight 550
        margin-bottom 10px
      .answer
        font-size 16px
        color #7f828b
        padding-left 16px
        line-height 1.6
        .project-address
          color #449be6


</style>
