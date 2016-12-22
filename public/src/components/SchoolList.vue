<template>
  <md-layout md-gutter class="container">
    <md-layout
      md-flex-xsmall="100"
      md-flex-small="50"
      md-flex-medium="33"
      md-flex="33"
    >
    <md-card v-for="school in schools">
      <md-card-header>
        <div class="md-title">{{school.name}}</div>
        <div class="md-subhead">{{school.data.length}} Students</div>
      </md-card-header>

      <md-card-content>
        {{school.description}}
      </md-card-content>

      <md-card-actions>
        <md-button :href="school.link">Donate Link</md-button>
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
  width: 60em;
  margin: 0 auto !important;
}
</style>
