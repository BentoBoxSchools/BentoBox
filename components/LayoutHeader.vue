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
        <a class="__user button" href="/api/internal/login" v-if="!user">
          Log In
        </a>
        <a class="__user button" v-if="user">
          Hello {{user.displayName}}
        </a>
        <nuxt-link class="__user" tag="button" to="/create" v-if="user">
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
    },
    user () {
      return this.$store.getters.loggedUser
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

