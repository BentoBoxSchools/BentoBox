<template>
  <main id="bentobox-app">
    <layout-header>
    </layout-header>
    <landing-page>
    </landing-page>
  </main>
</template>

<script>
import LayoutHeader from './components/LayoutHeader'
import LandingPage from './components/LandingPage'

export default {
  name: 'app',
  components: {
    LandingPage,
    LayoutHeader
  }
}
</script>

<style scoped>
#bentobox-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
}
.md-fab {
  z-index: 9999999999999999;
}
</style>
