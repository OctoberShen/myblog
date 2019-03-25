<template>
  <div class="article-tag">
    <p class="title">标签</p>
    <div class="tag-wrapper">
      <div class="tag-item" v-for="(item,index) of tags" :key="index" @click="getArticle">{{item}}</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "tag",
    data() {
      return {
        tags: []
      }
    },
    async mounted() {
      let results = await this.$axios.get('/blog/getTags')
      if (results.data.code === 0) {
        results.data.tags.forEach((item) => {
          this.tags.push(item.tag.split(','))
        })
        this.tags = this.flat(this.tags)//对数组进行降维处理
      } else {
        console.log(results.data.error)
      }
    },
    methods: {
      //数组降维
      flat(arr) {
        const result = []
        function _flat(arr) {
          arr.forEach((item) => {
            if (!Array.isArray(item)) {
              result.push(item)
            } else {
              _flat(item)
            }
          })
        }
        _flat(arr)
        arr = result
        return arr
      },
      getArticle(e) {
        let tag = e.target.innerText;
        this.$store.commit('article/GET_TAG', tag)
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        location.href='/category/TagArticle'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .article-tag
    display flex
    flex-direction column
    align-items center
    .title
      font-size 24px
      font-weight bold
      margin-top 50px
      margin-bottom 20px
    .tag-wrapper
      display flex
      flex-direction row
      justify-content center
      align-items center
      flex-wrap wrap
      max-width 600px
      margin 0 auto
      .tag-item
        min-width 50px
        margin-right 10px
        margin-top 10px
        text-align center
        font-size 14px
        border 1px solid #cccccc
        border-radius 3px
        padding 5px
        cursor pointer
      .tag-item:hover
        background-color #333333
        color #ffffff
</style>
