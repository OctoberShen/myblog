<template>
  <div class="blogging-container">
    <div class="blogging-header">
      <input type="text" class="title" v-model="title" placeholder="文章标题..."/>
      <div class="cover-update" title="上传封面大图">
        <svg class="icon cover-img" aria-hidden="true">
          <use xlink:href="#iconicon-test"></use>
        </svg>
      </div>
      <input type="text" class="tag" v-model="tag" placeholder="文章标签"/>
      <el-button class="el-button el-button--primary is-plain publish" @click="publishArticle">发布</el-button>
    </div>
    <no-ssr>
      <mavon-editor
        ref="md"
        :toolbars="markdownOption"
        v-model="content"
        :ishljs='true'
        @save="saveBlogging"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
      />
    </no-ssr>
  </div>
</template>

<script>

  let options = {
    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    mark: true, // 标记
    superscript: true, // 上角标
    subscript: true, // 下角标
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
    link: true, // 链接
    imagelink: true, // 图片链接
    code: true, // code
    table: true, // 表格
    fullscreen: true, // 全屏编辑
    readmodel: true, // 沉浸式阅读
    htmlcode: true, // 展示html源码
    help: true, // 帮助
    /* 1.3.5 */
    undo: true, // 上一步
    redo: true, // 下一步
    trash: true, // 清空
    save: true, // 保存（触发events中的save事件）
    /* 1.4.2 */
    navigation: true, // 导航目录
    /* 2.1.8 */
    alignleft: true, // 左对齐
    aligncenter: true, // 居中
    alignright: true, // 右对齐
    /* 2.2.1 */
    subfield: true, // 单双栏模式
    preview: true, // 预览
  }

  export default {
    name: "blogging",
    layout: 'Blank',
    data() {
      return {
        title: '',
        cover: 'http://img4.cache.netease.com/photo/0001/2016-07-13/BRSR3QMR00AO0001.jpg',
        content: "",
        tag: '',
        markdownOption: options,
      }
    },
    components: {},
    methods: {
      saveBlogging(str, md) {
        console.log(str, md)
      },
      // 绑定@imgAdd event
      imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        let self = this
        let formdata = new FormData();
        let $vm = self.$refs.md
        formdata.append('image', $file);
        self.$axios({
          url: 'server url',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          $vm.$img2Url(pos, url);
        })
      },
      imgDel(img) {

      },
      //获取当前时间
      getNowFormatDate() {
        let date = new Date();
        let seperator1 = "-";
        let seperator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
        return currentdate;
      },
      publishArticle() {
        let title = this.title;
        let cover = this.cover;
        let createTime = this.getNowFormatDate();
        let cont = this.content //输入的文本
        let md = this.$refs.md.d_render //html代码
        let tag = this.tag
        if (title=="" || cont=="") {
          this.$message({
            message: '未填写标题或内容',
            type: 'warning'
          })
          return
        }
        let self = this;
        self.$axios.post('/blog/saveArticle', {
          title,
          cover,
          createTime,
          cont,
          md,
          tag
        }).then(({status, data}) => {
          if (status === 200 && data.code === 0) {
            //elementUI提示
            self.$message({
              message: data.msg,
              type: 'success'
            });
            location.href='/admin/Admin'
          }else {
            self.$message.error(data.msg);
          }
        })

      }
    }
  }
</script>

<style lang="stylus" scoped>
  .blogging-header
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    height 60px
    .title
      width 50%
      border none
      font-size 2rem
      text-indent 1rem
    .tag
      border none
      font-size 2rem
      text-indent 1rem
    .cover-update
      width 48px
      height 48px
      position absolute
      right 10rem
      cursor pointer
      .cover-img
        width 100%
        height 100%
    .publish
      margin-right 2rem
</style>
