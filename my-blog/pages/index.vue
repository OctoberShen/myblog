<template>
  <article class="container">
    <home-article />
    <!--<pagination />-->
  </article>
</template>

<script>
import HomeArticle from '~/components/home/HomeArticle'
// import Pagination from '../components/public/pagination/Pagination';
export default {
  components: {
    HomeArticle,
    // Pagination
  },
  mounted () {
    //在页面加载时读取sessionStorage里的状态信息
    if (window.sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
     // 友盟统计添加
    const script = document.createElement("script");
    script.src =
      "https://s9.cnzz.com/z_stat.php?id=1278054308&web_id=1278054308";
    script.language = "JavaScript";
    document.body.appendChild(script);
  },
  watch: {
    $route() {
      if (window._czc) {
        let location = window.location;
        let contentUrl = location.pathname + location.hash;
        let refererUrl = "/";
        window._czc.push(["_trackPageview", contentUrl, refererUrl]);
      }
    }
  }
}
</script>

<style lang="stylus">
/*@import "@/common/stylus/main.styl"*/
</style>
