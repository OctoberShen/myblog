<template>
  <div class="wrapper">
    <section class="my-register">
      <section class="left">
        <img :src="dailyImg" class="daily-img" alt="" >
        <span class="daily-text">我没有想赢，我只是不想输</span>
        <span class="daily-from">《飞驰人生》</span>
      </section>
      <section class="right">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px"
                 class="register-form">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="registerForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input type="text" v-model="registerForm.email" autocomplete="off"></el-input>
            <el-button size="mini" @click="sendMessage">发送验证码</el-button>
            <span class="status">{{ statusMsg }}</span>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input type="text" v-model="registerForm.code" autocomplete="off" maxlength="4"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="refister()">注册</el-button>
            <el-button @click="backSignIn">返回登录</el-button>
            <span class="error">{{ error }}</span>
          </el-form-item>
        </el-form>
      </section>
    </section>
  </div>
</template>

<script>
  import CrypTo from 'crypto-js'

  export default {
    name: "register",
    layout: 'Blank',
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dailyImg: 'http://image.wufazhuce.com/Fg5TR-x6bZSSG2QL4lEUuzfT0-V8',
        statusMsg: '',
        error: '',
        registerForm: {
          name: '',
          pass: '',
          checkPass: '',
          email: '',
          code: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名,汉字不超过8个字,英文不超过16个字', trigger: 'blur'}
          ],
          pass: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      sendMessage() {
        const that = this;
        let namePass, emailPass
        if (that.timerid) {
          return false
        }
        this.$refs['registerForm'].validateField('name', (valid) => {
          namePass = valid
        })
        that.statusMsg = ''
        if (namePass) {
          //有值说明没有通过验证
          return false
        }
        this.$refs['registerForm'].validateField('email', (valid) => {
          emailPass = valid
        })
        if (!namePass && !emailPass) {
          that.$axios.post('/users/verify', {
            username: encodeURIComponent(that.registerForm.name),
            email: that.registerForm.email
          }).then(({status, data}) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60
              that.statusMsg = `验证码已发送，剩余${count--}秒`
              that.timerid = setInterval(function () {
                that.statusMsg = `验证码已发送，剩余${count--}秒`
                if (count === 0) {
                  clearInterval(that.timerid)
                }
              }, 1000)
            } else {
              that.statusMsg = data.msg
            }
          })
        }
      },
      refister() {
        let that = this
        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            that.$axios.post('/users/signup', {
              username: encodeURIComponent(that.registerForm.name),
              password: CrypTo.MD5(that.registerForm.pass).toString(),
              email: that.registerForm.email,
              code: that.registerForm.code
            }).then(({status, data}) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = '/user/Login'
                } else {
                  that.error = data.msg
                }
              } else {
                that.error = `服务器出错，错误码:${status}`
              }
              setTimeout(function () {
                that.error = ''
              }, 1500)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      backSignIn() {
        location.href = '/user/Login'
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
      .right
        border-left 1px solid #c2bfbf
        .status
          font-size 12px
          color #c2bfbf


</style>
