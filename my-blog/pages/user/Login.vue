<template>
  <div class="wrapper">
    <section class="my-register">
      <section class="left">
        <img :src="dailyImg" class="daily-img" alt="" >
        <span class="daily-text">我没有想赢，我只是不想输</span>
        <span class="daily-from">《飞驰人生》</span>
      </section>
      <div class="middle-line"></div>
      <section class="right">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="register-form">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginBlog">登录</el-button>
            <el-button  @click="backRegister">马上注册</el-button>
            <span class="error">{{error}}</span>
          </el-form-item>
        </el-form>
      </section>
    </section>
  </div>

</template>

<script>
  import CryptoJS from 'crypto-js'
    export default {
        name: "login",
      layout: 'Blank',
      data() {
        let validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            callback();
          }
        };
          return {
            error: '',
            dailyImg: 'http://image.wufazhuce.com/Fg5TR-x6bZSSG2QL4lEUuzfT0-V8',
            registerForm: {
              username: '',
              password: '',
            },
            rules: {
              username: [
                { required: true, message: '请输入用户名，汉字不超过8个字，英文不超过16个字', trigger: 'blur' }
              ],
              password: [
                { required: true, validator: validatePass, trigger: 'blur' }
              ]
            }
          };
      },
      methods: {
        loginBlog () {
          let that=this;
          that.$axios.post('/users/signin',{
            username:window.encodeURIComponent(that.registerForm.username),
            password:CryptoJS.MD5(that.registerForm.password).toString()
          }).then(({status,data})=>{
            if(status===200){
              if(data&&data.code===0){
                location.href='/'
              }else{
                that.error=data.msg
              }
            }else{
              that.error=`服务器出错`
            }
          })
        },
        backRegister () {
          location.href = '/user/Register'
        }
      }
    }
</script>

<style lang="stylus" scoped>
  .wrapper
    width 100%
    height 100vh
    padding 100px 0
    background-color #f6eadc
    .my-register
      display flex
      max-width 1000px
      min-height 500px
      margin 0 auto
      padding 50px
      background-color #ffffff
      border-radius 25px
      box-shadow 1px 1px 1px #cdd0d7
      flex-direction row
      justify-content space-between
      align-items center
      .left
        display flex
        flex-direction column
        justify-content space-between
        align-items center
        width 50%
        .daily-img
          width 100%
          height auto
        .daily-text, .daily-from
          margin-top 15px
          color #c2bfbf
        .status
          font-size 12px
          color #c2bfbf
      .middle-line
        width 2px
        min-height 400px
        margin-right -68px
        background-color #cdd0d7
      .right
        width calc(50% - 50px)
</style>
