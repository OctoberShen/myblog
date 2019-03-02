<template>
  <div>
    <my-header></my-header>
    <nuxt />
    <my-footer></my-footer>
  </div>
</template>
<script>
  import MyHeader from '../components/public/header/MyHeader';
  import MyFooter from '../components/public/footer/MyFooter';
  export default {
    components: {
      MyHeader,
      MyFooter
    }
  }
</script>
<style>

</style>
