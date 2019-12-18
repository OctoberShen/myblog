<template>
  <div class="my-footer">
    <div class="foot-wrapper">
      <p class="footer-content">
        本站旨在个人学习并实践前后端技术
      </p>
      <p class="footer-content">
        本站使用技术栈有Vue.js、Nuxt.js、Node.js、MongoDB
      </p>
      <p class="footer-content">
        本站由@OctoberShen创建
      </p>
      <div class="num">@2019-2020 octobershen 版权所有 ICP证： <a class="link" href="http://www.beian.miit.gov.cn">浙ICP备17053888号</a></div>
    </div>
  </div>
</template>

<script>
    export default {

    }
</script>

<style lang="stylus" scoped>
.my-footer
  position relative
  height 120px
  width 100%
  bottom 0
  left 0
  background-color #262a30
  .foot-wrapper
    position: relative;
    max-width: 1000px;
    padding: 0 20px;
    margin: 0 auto;
    height: 120px;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #999
    .num
      .link
        color: #e87a06;

</style>
