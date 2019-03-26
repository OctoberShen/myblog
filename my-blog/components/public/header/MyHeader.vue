<template>
  <div class="header-container" id="m-header">
    <div class="header-wrapper">
      <nuxt-link class="logeLink" to="/">
        <div class="logo">
          <p class="line"></p>
          <p class="blog-name">OctoberShen</p>
          <p class="line"></p>
        </div>
      </nuxt-link>
      <div class="nav">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-nav"
          mode="horizontal"
          background-color="#f9f9f9"
          text-color="#262a30"
          router
        >
          <el-menu-item index="/">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconhome2"></use>
            </svg>
            首页
          </el-menu-item>

          <el-menu-item index="/category/Tag">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconpaper"></use>
            </svg>
            分类
          </el-menu-item>

          <el-menu-item v-if="isFinish" index="/fitness/MyFitness">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconjianshenfang"></use>
            </svg>
            健身
          </el-menu-item>

          <el-menu-item v-if="isFinish" index="/photo/MyPhoto">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconsheyinglvxing"></use>
            </svg>
            摄影
          </el-menu-item>

          <el-menu-item v-if="isFinish" index="/game/MyGame">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconiconfontyouxihudong"></use>
            </svg>
            游戏
          </el-menu-item>

          <el-menu-item index="/user/User">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icontimerauto"></use>
            </svg>
            个人
          </el-menu-item>
          <el-menu-item index="/search/MySearch">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconnav-search"></use>
            </svg>
            搜索
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "my-header",
      data () {
        return {
          activeIndex: '1',
          isFinish: false
        }
      },
      methods: {

      }
    }
</script>

<style lang="stylus" scoped>
@keyframes logo-name
    0%
      margin-left: -60px;
      opacity: 0
    to
      margin-left: 0;
      opacity: 1
@keyframes logo-line
    0%
      width: 0
    to
      width: 100px
@media screen and (max-width 768px)
    .el-menu-item
      padding 0 5px
@media screen and (max-width 420px)
    .logeLink
      display none
    .nav
      width 100%


  .header-container
  position relative
  width 100%
  background-color #f9f9f9
  .header-wrapper
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    max-width 1000px
    height 90px
    margin 0 auto
    padding 0 10px
    .logo
      display flex
      flex-direction column
      align-items center
      justify-content space-between
      height 100%
      color #262a30
      font-size 20px
      font-weight 700
      padding 25px
      box-sizing border-box
      cursor pointer
      .blog-name
        animation logo-name .5s
      .line
        width 100px
        height 2px
        background-color #262a30
        animation logo-line .5s
        transition width .3s
    .logo:hover .line
        width 0
    .nav .el-menu--horizontal>.el-menu-item.is-active
      border-bottom: 2px solid #303133;
    .nav .el-menu--horizontal>.el-menu-item:hover
      color #ffffff !important
      background-color #262a30 !important
</style>
