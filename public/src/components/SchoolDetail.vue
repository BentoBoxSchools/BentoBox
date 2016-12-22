<template>
  <div>
    <layout-header></layout-header>

    <md-card>
      <md-card-header>
        <div class="md-title">{{school.name}}</div>
        <div class="md-subhead">{{school.data.length}} Students</div>
      </md-card-header>

      <md-card-content>
        <p>{{school.description}}</p>

        <pre>{{school.data}}</pre>
      </md-card-content>

      <md-card-actions>
        <md-button target="_blank" :href="school.link">Donate</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios'

import LayoutHeader from './LayoutHeader'

export default {
  name: 'school-detail',
  components: {
    LayoutHeader
  },
  data () {
    return {
      school: {
        name: '',
        description: '',
        link: '',
        data: []
      }
    }
  },
  mounted () {
    axios.get(`/api/schools/${this.$route.params.id}`)
      .then(resp => {
        this.school = resp.data
        this.school.data.splice(0, 2)
      })
  }
}
</script>

<style>
.md-card {
  max-width: 60em;
  margin: 0 auto;
}
pre {
  max-height: 20em;
  overflow: auto;
}
</style>
