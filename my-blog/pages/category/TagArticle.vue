<template>
  <div class="article-wrapper">
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
                  </svg>{{articleCount}}次浏览</span>
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
    <pagination-item
      :page-size="pageSize"
      :total="total"
      @currentChange="pageChange"
    >
    </pagination-item>
  </div>
</template>

<script>
  import paginationItem from '../../components/public/pagination/Pagination'

  export default {
    name: "tag-article",
    components: {
      paginationItem
    },
    data() {
      return {
        pageSize: 8,
        total: 0, //文章总数
        article: [], //全部文章数据
        currentPage: 1, //当前页数
        articleCount: parseInt(Math.random(10, 100))
      }
    },
    async mounted() {
      //在页面加载时读取sessionStorage里的状态信息
      if (window.sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      }
      let tag = this.$store.state.article.TAG
      await this.$axios.post('/blog/getCategory', {
        tag: tag
      }).then((res) => {
        this.article = res.data.article
        this.total = this.article.length
      })
    },
    methods: {
      readMore(e) {
        let id = e.target.attributes[1].nodeValue;
        this.$store.commit('article/GET_ID', id)//将当前点击的文章id保存到vuex
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
        location.href = '/category/MyArticle'
      },
      async pageChange(val) {
        let {page, pageSize} = {page: val, pageSize: (this.pageSize)}
        let {data} = await this.$axios.post('/blog/getArticleList', {page, pageSize})
        this.article = data.article
        this.total = data.count
        //异步更新完数据回到顶部
        this.timer = setInterval(() => {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          let ispeed = Math.floor(-osTop / 10)
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          this.isTop = true
          if (osTop === 0) {
            clearInterval(this.timer)
          }
        }, 5)
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
  .article-wrapper
    max-width 1000px
    margin 0 auto
    margin-top 50px
    padding 0 10px
    .article-card
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
