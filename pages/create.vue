<template>
  <div>
    <layout-header></layout-header>
    <div class="container">
      <section class="card">
        <header class="card__header">
          <h2>Create a new school</h2>
        </header>
        <div class="card__content">
          <form novalidate @submit.stop.prevent="save">
            <div class="input-container">
              <label for="school-name">School name</label>
              <input id="school-name" v-model="school.name"></input>
            </div>
            <div class="input-container">
              <label for="description">Description</label>
              <textarea id="description" v-model="school.description"></textarea>
            </div>
            <div class="input-container">
              <label for="donation-link">Donation link</label>
              <input id="donation-link" v-model="school.link" type="url"></input>
            </div>

            <file-uploader
              name="sampleFile"
              url="/api/schools/upload"
              @uploaded="onUploaded">
              Drop or select a Excel File (.xls)
            </file-uploader>

            <table v-if="school.data">
              <thead>
                <tr>
                  <th v-for="header in headers">
                    {{header | capFirst}}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(row, index) in school.data"
                >
                   <td v-for="col in row">
                     {{col}}
                   </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>

        <div class="card__actions">
          <button class="primary" @click="save">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import LayoutHeader from '~components/LayoutHeader'
import FileUploader from '~components/FileUploader'

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
          console.log(resp)
        })
        .catch(resp => {
          console.error(resp)
        })
    }
  }
}
</script>

<style scoped>
table {
  max-height: 20em;
  overflow: auto;
}
</style>
