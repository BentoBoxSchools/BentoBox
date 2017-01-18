<template>
  <md-whiteframe md-tag="md-toolbar" :md-elevation="depth">
    <router-link tag="md-button" to="/">
      <md-icon>school</md-icon>
    </router-link>
    <h1 class="md-title">
      BentoBox
    </h1>

    <div class="actions">
      <router-link tag="md-button" to="/schools" class="md-raised">
        Schools
      </router-link>
      <router-link class="__user" tag="md-button" to="/">
        Log In
      </router-link>
      <router-link class="__user" tag="md-button" to="/create">
        Add your school
      </router-link>
    </div>
  </md-whiteframe>
</template>

<script>
export default {
  name: 'layout-header',
  computed: {
    depth () {
      return (this.$router.currentRoute.path === '/') ? 0 : 2
    }
  }
}
</script>

<style scoped>
h1.md-title {
  flex: 1;
}

@media (max-width: 786px) {
  .actions .__user {
    display: none;
  }
}
</style>

