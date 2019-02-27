<template>
  <div>
    <my-header></my-header>
    <nuxt />
  </div>
</template>
<script>
  import MyHeader from '../components/public/header/MyHeader';
  export default {
    components: {
      MyHeader
    }
  }
</script>
<style>

</style>
