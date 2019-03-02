<template>
  <article class="container">
    <home-article />
    <pagination />
  </article>
</template>

<script>
import HomeArticle from '~/components/home/HomeArticle'
import Pagination from '../components/public/pagination/Pagination';
export default {
  components: {
    HomeArticle,
    Pagination
  }
}
</script>

<style lang="stylus">
/*@import "@/common/stylus/main.styl"*/
</style>
