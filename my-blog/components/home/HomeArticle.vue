<template>
  <div class="view-wrapper">
    <div id="home">
      <el-row class="article-card" v-for="(article, index) of articleCard" :key="index">
        <el-col :span="24">
          <el-card :body-style="{ padding: '0px' }">
            <div class="cover">
              <div class="article-title">
                <span class="title-text">{{article.titleText}}</span>
              </div>
              <img :src="article.imgSrc" class="image">
            </div>
            <div style="padding: 14px;">
              <span class="article-digest">{{article.articleDigest}}</span>
              <div class="bottom clearfix">
                <time class="time">{{article.currentDate }}</time>
                <span class="view-count">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconiconset0207"></use>
                  </svg>{{article.viewCount}}次浏览</span>
                <el-button type="text" class="button">阅读原文 >></el-button>
              </div>
            </div>
            <div class="article-tags">
               <span class="article-tag" v-for="(tag, index) of article.articleTags" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon2"></use>
                </svg>
                {{tag}}
              </span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeArticle",
    data() {
      return {
        articleCard: [
          {
            titleText:'第一篇文章',
            articleDigest:'文章摘要打了客服就爱看大力金刚玩打了可视对讲阿卡丽骄傲离开大数据时代的撒垃圾肯定是拉动打打看见卡傻吊就按客人都是高速路开关机可视对讲六块腹肌东方丽景',
            currentDate: '2019-02-28',
            viewCount: 1,
            imgSrc: 'https://drscdn.500px.org/photo/189980635/h%3D1065/v2?webp=true&sig=1a4b9ae32802778e733d8556a7a9769e155f275f5eadfdb460da947df6c2b2ae',
            articleTags: ['vue', 'node', 'elementUI']
          },
          {
            titleText:'第二篇文章',
            articleDigest:'文章摘要打了客服就爱看大力金刚玩打了可视对讲阿卡丽骄傲离开大数据时代的撒垃圾肯定是拉动打打看见卡傻吊就按客人都是高速路开关机可视对讲六块腹肌东方丽景',
            currentDate: '2019-02-28',
            viewCount: 1,
            imgSrc: 'https://drscdn.500px.org/photo/179458515/h%3D1065/v2?webp=true&sig=c6a6cfb2f652fc9d96aeec040e1c2c09eee257ea81476579ad38cf0856bb23cf',
            articleTags: ['vue', 'node', 'elementUI']
          }
        ],
      }
    },
    beforeMount(){

    },
    methods: {

    }
  }
</script>

<style lang="stylus" scoped>

  .view-wrapper
    max-width 1000px
    min-width 320px
    margin 0 auto
    padding 0 10px
    min-height calc(100vh - 120px)
    transition width .3s
    #home
      position relative
      padding 30px 10px 10px 10px
      min-height 100px
      .article-card
        margin-bottom 20px
        .cover
          position relative
          .article-title
            position: absolute
            font-size: 24px
            width 100%
            height 100%
            top 0
            left 0
            font-weight 700
            color #fff
            display flex
            align-items center
            justify-content center
            .title-text
              position relative
              cursor pointer
            .title-text::after
              content ""
              position absolute
              bottom 0
              left 0
              width 100%
              height 2px
              background-color #fff
              visibility hidden
              transform scaleX(0)
              transition-duration .2s
              transition-timing-function ease
            .title-text:hover::after
              visibility visible
              transform scaleX(1)
              transition-duration .2s
              transition-timing-function ease
        .time
          font-size 13px
          color #999
        .view-count
          font-size 13px
          color #999
        .bottom
          margin-top 13px
          line-height 12px
        .button
          position relative
          padding 0
          float right
          color: #303133
        .button::after
          content ""
          position absolute
          bottom -2px
          left 0
          width 100%
          height 1px
          background-color #262a30
          visibility visible
          transform scaleX(1)
          transition-duration .2s
          transition-timing-function ease
        .button:hover::after
          width 0
        .image
          width 100%
          display block
        .article-tags
          padding 14px
          border-top 1px solid #eeeeee
          .article-tag
            color #fff
            padding 5px
            background-color #262a30
            font-size 12px
            margin-right 5px
            border-radius 5px
            transition all .3s
            position relative
            margin-left 10px
            margin-top 10px
            line-height 1
            cursor pointer
            -webkit-tap-highlight-color rgba(0,0,0,0)
          .article-tag::before
            position absolute
            left -9px
            top 0
            width 0
            height 0
            content ""
            border-top 14px solid transparent
            border-bottom 11px solid transparent
            border-right 12px solid #262a30
            transition all .3s

</style>
