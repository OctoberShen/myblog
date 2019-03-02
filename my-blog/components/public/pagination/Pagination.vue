<template>
  <div class="pagination" v-show="total > 0">
    <el-pagination
      background
      layout="prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPae"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          pageSize: 10,
          total: 1,
          currentPae: 1
        }
      },
      methods: {
        handleCurrentChange: function (val) {
          console.log(val)
        }
      }
    }
</script>

<style lang="stylus" scoped>
.pagination
  width 100%
  padding 10px 0
  display flex
  display -webkit-flex
  flex-direction row
  justify-content center
  background-color #fff

</style>
