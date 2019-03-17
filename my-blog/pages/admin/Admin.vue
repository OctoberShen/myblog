<template>
  <div class="admin-container">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <nuxt-link to="/">
            <el-menu-item index="0" class="back-home">OctoberShen</el-menu-item>
          </nuxt-link>
        </el-menu>
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">文章管理</template>
            <el-menu-item index="1-1">文章列表</el-menu-item>
            <el-menu-item index="1-2">文章分类/标签</el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>

      <el-container class="list-container">
        <el-breadcrumb class="admin-breadcrumb" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" :replace="true">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-table :data="article">
            <!--<el-table-column align="center" prop="num" label="序号"></el-table-column>-->
            <el-table-column align="center" prop="createTime" label="发布时间"></el-table-column>
            <el-table-column align="center" prop="title" label="文章名称"></el-table-column>
            <el-table-column align="center" prop="tag" label="标签"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <button
                  class="edit"
                  title="编辑"
                  @click="editArticle(scope)"
                >
                  <svg class="icon " aria-hidden="true">
                    <use xlink:href="#iconbianji"></use>
                  </svg>
                </button>
                <button
                  class="delete"
                  title="删除"
                  @click="deleteArticle(scope)"
                >
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshanchu"></use>
                  </svg>
                </button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import mongoose from 'mongoose'
  export default {
    name: "admin",
    layout: 'Blank',
    data() {
      return {
        article: {}
      }
    },
    async asyncData({app}) {
      let {page, pageSize} = {page: 1, pageSize: 10}
      let {data} = await app.$axios.post('/blog/getArticleList', {
        page,
        pageSize
      })
      return {
        article: data.article,
        articleCount: data.count
      }
    },
    methods: {
      editArticle(obj) {
        console.log(obj)
      },
      deleteArticle(obj) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/blog/deleteArticle', {id: obj.row._id})
            .then((res) => {
              if(res.data.code === 0){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else {
                console.log(res.data.err)
                this.$message({
                  type: 'warning',
                  message: res.data.msg
                });
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    computed: {
      reArt() {
        return this.article = this.article
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" scoped>

  .back-home, .back-home:hover
    color #262a30
    font-size 18px
    text-align center
    font-weight bold
    border-bottom 1px solid #cccccc
    background-color none

  .list-container
    display flex
    flex-direction column
    .admin-breadcrumb
      display flex
      flex-direction row
      align-items center
      width 100%
      height 56px
      padding 27.5px
      border-bottom 1px solid #cccccc

  .el-main
    padding-top 0
    .edit, .delete
      background none !important
      border none
      width 32px
      height 32px
      .icon
        width 100%
        height 100%
</style>
