<template>
  <div>
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
import SchoolList from './components/SchoolList'
import LayoutHeader from './components/LayoutHeader'

export default {
  name: 'school-list-container',
  components: {
    SchoolList,
    LayoutHeader
  }
}
</script>
