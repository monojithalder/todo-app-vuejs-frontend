<template>
  <div id="app" class="container">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
  import Header from '@/components/Header'
export default {
  name: 'App',
  components: {
      'Header': Header
  }
}
</script>


