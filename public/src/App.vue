<template>
  <div id="app">
    <layout-header>
    </layout-header>
    <school-list>
    </school-list>
    <router-link tag="md-button" class="md-fab md-fab-bottom-right"
      to="/create">
      <md-icon>add</md-icon>
    </router-link>
  </div>
</template>

<script>
import LayoutHeader from './components/LayoutHeader'
import SchoolList from './components/SchoolList'

export default {
  name: 'app',
  components: {
    LayoutHeader,
    SchoolList
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
}
.md-fab {
  z-index: 9999999999999999;
}
</style>
