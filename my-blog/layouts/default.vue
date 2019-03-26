<template>
  <div class="default">
    <div class="user-toggle" :class="{toggleColor:showAside}" @click="asideToggle">
      <svg class="icon user-icon" aria-hidden="true">
        <use xlink:href="#icongengduoneirong"></use>
      </svg>
    </div>
      <div class="go-top" @click="goTop" ref="btn">
        <svg class="icon top-icon"  aria-hidden="true">
          <use xlink:href="#iconfanhuidingbu"></use>
        </svg>
      </div>
    <div class="left-container" v-show="showAside">
      <my-aside ></my-aside>
    </div>
    <div class="main-container">
      <my-header></my-header>
      <nuxt class="main-content"/>
      <my-footer></my-footer>
    </div>
  </div>
</template>
<script>
  import MyHeader from '../components/public/header/MyHeader';
  import MyFooter from '../components/public/footer/MyFooter';
  import MyAside from '../components/public/aside/MyAside';

  export default {
    data () {
      return {
        showAside: false,
        isTop: true,
        timer: null
      }
    },
    components: {
      MyHeader,
      MyFooter,
      MyAside
    },
    mounted () {
      this.needScroll()
    },
    methods: {
      asideToggle () {
        if(this.showAside) {
            this.showAside = false
        }else {
            this.showAside = true
        }
      },
      needScroll () {
        let obtn = this.$refs.btn
        window.onscroll = function () {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          if (osTop > 0) {
            obtn.style.display = 'block'
          } else {
            obtn.style.display = 'none'
          }
          if (!this.isTop) {
            clearInterval(this.timer)
          }
          this.isTop = false
        }
      },
      goTop () {
        this.timer = setInterval(() => {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          let ispeed = Math.floor(-osTop / 10)
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          this.isTop = true
          if (osTop === 0) {
            clearInterval(this.timer)
          }
        }, 30)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @media screen and (max-width 1025px)
    .user-toggle
      display none

  .default
    display flex
    flex-direction row
    .user-toggle
      position fixed
      top: 10px
      left 20px
      z-index 1001
      color #262a30
      width 32px
      height 32px
      cursor pointer
      .user-icon
        width 100%
        height 100%
    .toggleColor
      color #ffffff
    .go-top
      display none
      position fixed
      right: 10px
      bottom 20px
      z-index 1001
      color #ffffff
      padding 5px
      cursor pointer
      border-radius 3px
      background-color #262a30
      .top-icon
        width 32px
        height 32px
    .left-container
      position relative
      width 320px
    .main-container
      width 100%
      flex 1
      position relative
      .main-content
        min-height calc(100vh - 210px)
</style>
