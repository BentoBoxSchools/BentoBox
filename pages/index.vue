<template>
  <main id="bentobox-app">
    <layout-header>
    </layout-header>
    <landing-page>
    </landing-page>
  </main>
</template>

<script>
import LayoutHeader from '~components/LayoutHeader'
import LandingPage from '~components/LandingPage'

export default {
  name: 'app',
  middleware: 'authentication',
  components: {
    LandingPage,
    LayoutHeader
  }
}
</script>

<style scoped>
#bentobox-app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
}
</style>
