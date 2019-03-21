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
          <el-submenu index="2">
            <template slot="title">写博客</template>
            <nuxt-link to="/blogging/Blogging">
              <el-menu-item index="2-1">编辑博客</el-menu-item>
            </nuxt-link>
            <el-menu-item index="2-2">草稿箱</el-menu-item>
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
          <el-table :data="presentation">
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
          <pagination-item
            :page-size="pageSize"
            :total="articleCount"
            @currentChange="pageChange"
          ></pagination-item>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import mongoose from 'mongoose'
  import paginationItem from '../../components/public/pagination/Pagination'
  import {mapMutations} from 'vuex'
  export default {
    name: "admin",
    layout: 'Blank',
    components: {
      paginationItem
    },
    data() {
      return {
        article: [], //全部文章数据
        pageSize: 10,//每页显示条数
        articleCount: 0, //总条数
        currentPage: 1
      }
    },
    async asyncData({app}) {
      let {data} = await app.$axios.get('/blog/getAdminArticleList')
      return {
        article: data.article,
        articleCount: data.count
      }
    },
    mounted() {
      this.$store.commit('article/GET_ARTICLE', this.article)//将文章列表保存到vuex
    },
    methods: {
      pageChange(val) {
        this.currentPage = val//设置当前页码
      },
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
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                location.href='/admin/Admin'
              } else {
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
      presentation: function () {
        let start = (this.currentPage - 1) * this.pageSize
        let end = this.article.length - start> this.pageSize ? start+this.pageSize : this.article.length
        return this.article.slice(start, end);
      }
    },
    watch: {}
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
