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

        <md-table v-if="school.data">
           <md-table-header>
             <md-table-row>
               <md-table-head v-for="header in headers">
                 {{header | capFirst}}
               </md-table-head>
             </md-table-row>
           </md-table-header>

           <md-table-body>
             <md-table-row
               v-for="(row, index) in school.data"
               :key="index"
            >
               <md-table-cell v-for="col in row">
                 {{col}}
               </md-table-cell>
             </md-table-row>
           </md-table-body>
         </md-table>
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
  filters: {
    capFirst: function (value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
    }
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
  computed: {
    headers () {
      return this.school.data.length ? Object.keys(this.school.data[0]) : []
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
