<template>
  <div class="container layout">
    <div v-for="school in schools">
    <section class="card">
      <div class="card__header">
        <h2>
          {{school.name}}
        </h2>
        <div class="subhead">{{school.data.length}} Students</div>
      </div>

      <div class="card__content">
        {{school.description}}
      </div>

      <div class="card__actions">
        <nuxt-link
          tag="button"
          :to="'/school/' + school._id"
        >
          Detail
        </nuxt-link>
        <a class="button" target="_blank"
          :href="school.link"
        >
          Donate <md-icon>link</md-icon>
        </a>
      </div>
    </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'school-list',
  data () {
    return {
      schools: []
    }
  },
  mounted () {
    axios.get('/api/schools')
      .then(resp => {
        this.schools = resp.data
      })
      .catch(resp => {
        alert('We have trouble getting schools. Please try again later.')
      })
  }
}
</script>

<style scoped>
.container {
  max-width: 60em;
  margin: 0 auto !important;
}
.md-layout {
  align-items: flex-start;
}
.md-layout .md-layout {
  margin-bottom: 1.5em;
}
.md-card {
  width: 100%;
}
</style>
