<template>
  <md-layout md-gutter class="container">
    <md-layout
      md-flex-xsmall="100"
      md-flex-small="50"
      md-flex-medium="33"
      md-flex="33"
      v-for="school in schools"
    >
    <md-card>
      <md-card-header>
        <div class="md-title">
          {{school.name}}
        </div>
        <div class="md-subhead">{{school.data.length}} Students</div>
      </md-card-header>

      <md-card-content>
        {{school.description}}
      </md-card-content>

      <md-card-actions>
        <router-link
          tag="md-button"
          :to="'/school/' + school._id"
        >
          Detail
        </router-link>
        <md-button target="_blank"
          :href="school.link"
        >
          Donate <md-icon>link</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
    </md-layout>
  </md-layout>
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
