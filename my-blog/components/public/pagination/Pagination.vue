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
      @prev-click="prevClick"
      @next-click="nextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
    export default {
      props: ['pageSize', 'total'],
      data () {
        return {
          currentPae: 1
        }
      },
      methods: {
        handleCurrentChange: function (val) {
          this.$emit('currentChange', val);
        },
        prevClick: function(val) {
          // console.log(val)
        },
        nextClick: function(val) {
          // console.log(val)
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
