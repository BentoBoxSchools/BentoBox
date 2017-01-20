<template>
  <header>
    <section class="container flex center">
      <nuxt-link to="/" class="title">
        <h1>
          BentoBox
        </h1>
      </nuxt-link>
      <div class="fill"></div>

      <div class="actions">
        <nuxt-link tag="button" to="/schools" class="raised">
          Schools
        </nuxt-link>
        <nuxt-link class="__user" tag="button" to="/">
          Log In
        </nuxt-link>
        <nuxt-link class="__user" tag="button" to="/create">
          Add your school
        </nuxt-link>
      </div>
    </section>
  </header>
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
header {
  display: flex;
  background-color: #009688;
}
header a.title {
  margin: 0 1em;
  color: #fff;
}

@media (max-width: 786px) {
  .actions .__user {
    display: none;
  }
}
</style>

