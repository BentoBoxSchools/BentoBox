<template>
  <md-toolbar class="md-transparent">
    <router-link tag="md-button" class="md-icon-button" to="/">
      <md-icon>school</md-icon>
    </router-link>

    <h2 class="md-title">
      BentoBox
    </h2>
  </md-toolbar>
</template>

<script>
export default {
  name: 'layout-header'
}
</script>

<style scoped>
h2.md-title {
  flex: 1;
}
</style>
