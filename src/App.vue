<template>
  <div id="app">
    <div class="container chat-border">
        <Header />
        <router-view />
        <Footer />         
    </div>
  </div>
</template>

<script>
import '@/assets/css/styles.css'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>

</style>
