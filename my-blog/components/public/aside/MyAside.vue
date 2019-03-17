<template>
  <aside class="aside-wrapper">
    <div class="user-info">
      <img :src="icon" alt="" class="user-icon">
      <p class="username">{{user}}</p>
      <p class="describe">目标全栈工程师，加油，冲呀！！！</p>
      <div class="login">
        <nuxt-link to="/user/Login">
          <button v-show="!isLogin" type="button" class="signin">立即登录</button>
        </nuxt-link>
        <nuxt-link to="/admin/Admin">
          <button v-show="isLogin" type="button" class="blogging">写博客啦</button>
        </nuxt-link>
        <nuxt-link to="/user/Exit">
          <button v-show="isLogin" type="button" class="exit">拜拜喽</button>
        </nuxt-link>
      </div>
    </div>
  </aside>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name: "my-aside",
    data() {
      return {
        isLogin: false,
        user: '',
        icon: 'data:image/png;base64,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'
      }
    },
    async mounted() {
      const {status, data: {user}} = await this.$axios.get('/users/getUser')
      if (status === 200 && user != "") {
        this.user = user
        this.isLogin = true
        this.$store.commit('users/changeName', user);//更新用户名
      } else {
        this.user = this.$store.state.users.username //从vuex中获取username
        this.isLogin = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .aside-wrapper
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 320px;
    background-color: #262a30;
    color: #fff;
    z-index: 1000;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 60px;
    overflow: hidden;
    .user-info
      display flex
      flex-direction column
      align-items center
      justify-content space-between
      .user-icon
        width 100px
        height 100px
        border-radius 3px
      .username
        color #fff
        padding 15px 0
        font-size 16px
        font-weight 700
        text-align center
      .describe
        color: #999
        padding 5px 15px
        font-size 14px
        font-weight 700
        text-align center
    .login
      padding 10px
      .signin, .blogging, .exit
        border-radius 5px
        background-color #999
        color #F5F5F5
        text-align center
        width 100px
        outline none
        border none
        padding 6px

</style>
