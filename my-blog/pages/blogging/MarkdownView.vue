<template>
  <div class="markdown-wrapper">
    <no-ssr>
      <mavon-editor
        ref="mdV"
        :subfield="false"
        defaultOpen="preview"
        :editable = "false"
        :toolbarsFlag = "false"
        :ishljs = "true"
        v-model="content"
      />
    </no-ssr>
  </div>
</template>

<script>
    export default {
        name: "markdown-view",
      data() {
          return {
            content: '# title',
            articleId: ''
          }
      },
     async mounted() {
      await this.$axios.get('/blog/getMd', {
        params: {title: 'test'}
      }).then((res) => {console.log(res);})
        // const {status, data} = await this.$axios.get('/blog/getArticle')
        // if (status === 200 ) {
        //     console.log(data);
        // } else {
        //
        // }
      }
    }
</script>

<style lang="stylus" scoped>
.markdown-wrapper
  max-width: 1000px
  margin 50px auto
  .v-show-content
    background-color #ffffff !important
</style>
