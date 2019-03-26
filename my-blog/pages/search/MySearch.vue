<template>
  <section class="my-search">
    <input v-model="keyword" class="search" type="text" placeholder="请输入标题/内容/tag搜索...">
    <div class="noData" v-show="isNoData">
      <img src="../../static/images/nodatadefault.png" class="default-img" alt="">
      <p class="default-text">未找到文章</p>
    </div>
    <el-row class="article-card" v-for="(item, index) of article" :key="index">
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <div class="article-title">
            <span :data-id="item._id" class="title-text" @click="readMore">{{item.title}}</span>
          </div>
          <div style="padding: 14px;">
            <span class="article-digest">{{item.cont === undefined?"":item.cont.substr(0, 50)}}</span>
            <div class="bottom clearfix">
              <time class="time">{{item.createTime === undefined?"":item.createTime.substr(0, 10)}}</time>
              <span class="view-count">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconiconset0207"></use>
                  </svg>{{item.count}}次浏览</span>
              <button :data-id="item._id" type="text" class="button" @click="readMore">阅读原文 >></button>
            </div>
          </div>
          <div class="article-tags">
               <span class="article-tag" v-for="(tagItem, index) of item.tag.split(',')" :key="index"
                     @click="getArticle">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon2"></use>
                </svg>
                {{tagItem}}
              </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  export default {
    name: "my-search",
    data() {
      return {
        article: [],
        keyword: '',
        _mySession: []
      }
    },
    async mounted() {
      let {data} = await this.$axios.get('/blog/getAdminArticleList')
      this._mySession = data.article
    },
    computed: {
      isNoData() {
        return !this.article.length
      }
    },
    watch: {
      keyword () {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        if (!this.keyword) {
          this.article = [];
          return
        }
        this.timer = setTimeout( () => {
          const result = [];
            this._mySession.forEach((value) => {
              if (value.cont.indexOf(this.keyword) > -1 || value.tag.indexOf(this.keyword) > -1 || value.title.indexOf(this.keyword) > -1){
                result.push(value)
              }
            })
          this.article = result
          console.log(this.article)
        }, 100)
      }
    },
    methods: {
      readMore(e) {
        let id = e.target.attributes[1].nodeValue;
        this.$store.commit('article/GET_ID', id)//将当前点击的文章id保存到vuex
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
        location.href = '/category/MyArticle'
      },
      getArticle(e) {
        let tag = this.trim(e.target.innerText);
        this.$store.commit('article/GET_TAG', tag)
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
        location.href = '/category/TagArticle'
      },
      //去掉前后空格
      trim(str) {
        return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .my-search
    max-width 1000px
    margin 0 auto
    padding 14px
    display flex
    flex-direction column
    .search
      width 100%
      height 35px
      border 1px solid #cccccc
      border-radius 3px
      padding 10px
    .noData
      display flex
      flex-direction column
      justify-content center
      align-items center
      margin-top 50px
      .default-img
        width 240px
        height 190px
      .default-text
        margin-top 20px
        color #a5a5a5
    .article-card
      margin-top 20px
      margin-bottom 20px
      .article-title
        font-size: 22px
        width 100%
        height 100%
        padding 14px 14px 0 14px
        color #333333
        .title-text
          position relative
          cursor pointer
        .title-text::after
          content ""
          position absolute
          bottom -2px
          left 0
          width 100%
          height 2px
          background-color #333
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
        border none
        background none
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
          -webkit-tap-highlight-color rgba(0, 0, 0, 0)
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
