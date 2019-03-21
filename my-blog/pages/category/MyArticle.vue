<template>
  <section class="markdown-wrapper">
    <mavon-editor
      ref="mdV"
      :subfield="false"
      defaultOpen="preview"
      :editable="false"
      :toolbarsFlag="false"
      :ishljs="true"
      v-model="content.cont"
    />
  </section>
</template>

<script>

  export default {
    data() {
      return {
        content: '# title'
      }
    },
    async mounted() {
      //在页面加载时读取sessionStorage里的状态信息
      if (window.sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      }
      let id = this.$store.state.article._id
      await this.$axios.post('/blog/getMd', {
        _id: id
      }).then((res) => {
        this.content = res.data.result
      })
    },
  }
</script>

<style lang="stylus" scoped>
  .markdown-wrapper
    max-width: 1000px
    margin 50px auto
    background #ffffff !important
    .v-note-wrapper
      min-height calc(100vh - 210px)
    .v-note-wrapper .v-note-panel .v-note-show .v-show-content
      background #ffffff !important
</style>
