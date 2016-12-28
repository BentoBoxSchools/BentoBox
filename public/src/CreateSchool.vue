<template>
  <div>
    <layout-header></layout-header>
    <md-card>
      <md-card-header>
        <div class="md-title">Create a new school</div>
      </md-card-header>
      <md-card-content>
        <form novalidate @submit.stop.prevent="save">
         <md-input-container>
           <label>School name</label>
           <md-input v-model="school.name"></md-input>
         </md-input-container>
         <md-input-container>
           <label>Description</label>
           <md-textarea v-model="school.description"></md-textarea>
         </md-input-container>
         <md-input-container>
           <label>Donation link</label>
           <md-input v-model="school.link" type="url"></md-input>
         </md-input-container>

         <file-uploader
           name="sampleFile"
           url="/api/schools/upload"
           @uploaded="onUploaded">
           Drop or select a Excel File (.xls)
         </file-uploader>

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

        </form>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised" @click="save">
          Create
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios'

import LayoutHeader from './components/LayoutHeader'
import FileUploader from './components/FileUploader'

import router from './router'

export default {
  name: 'create-school',
  components: {
    LayoutHeader,
    FileUploader
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
  filters: {
    capFirst: function (value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
    }
  },
  computed: {
    headers () {
      return this.school.data.length ? Object.keys(this.school.data[0]) : []
    }
  },
  methods: {
    onUploaded (data) {
      this.school.data = data
    },
    save () {
      axios.post('/api/schools', this.school)
        .then(resp => {
          router.push({ path: '/' })
        })
        .catch(resp => {
          console.error(resp)
        })
    }
  }
}
</script>

<style scoped>
.md-card {
  width: 50em;
  padding: 1em;
  margin: 0 auto;
}

.md-table {
  max-height: 20em;
  overflow: auto;
}
</style>
