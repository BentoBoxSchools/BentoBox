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

        <md-table-card>
         <md-table @sort="onSort">
           <md-table-header>
             <md-table-row>
               <md-table-head v-for="(header, index) in headers"
                 :md-numeric="isIndexNumeric(index)"
                 :md-sort-by="header">
                 {{header | capFirst}}
               </md-table-head>
             </md-table-row>
           </md-table-header>

           <md-table-body>
             <md-table-row
               v-for="(row, index) in dataForTable"
               :key="index"
            >
               <md-table-cell
                 v-for="col in row"
                 :md-numeric="isNumeric(col)"
                 :key="index"
               >
                 {{col}}
               </md-table-cell>
             </md-table-row>
           </md-table-body>
         </md-table>

         <md-table-pagination
           :md-size="pagination.size"
           :md-page="pagination.page"
           md-label="Students"
           md-separator="of"
           :md-page-options="[10, 20, 40, 60, 80, 100]"
           @pagination="onPagination"></md-table-pagination>
         </md-card-content>
       </md-table-card>

      <md-card-actions>
        <md-button target="_blank" :href="school.link">Donate</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios'

import LayoutHeader from '~components/LayoutHeader'

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
      },
      pagination: {
        size: 10,
        page: 1
      },
      sort: {
        name: '',
        type: 'asc'
      }
    }
  },
  computed: {
    headers () {
      return this.school.data.length ? Object.keys(this.school.data[0]) : []
    },
    dataForTable() {
      return this.school.data.filter((d, i) => {
        let {size, page} = this.pagination
        return i >= size * (page - 1) && i < size * page
      }).sort((a, b) => {
        let {name, type} = this.sort
        return type === 'desc' ? a[name] - b[name] : b[name] - a[name]
      })
    }
  },
  methods: {
    onSort (sort) {
      this.sort = sort
    },
    onPagination (pagination) {
      this.pagination = pagination
    },
    isIndexNumeric (index) {
      if (this.school.data.length < 1) {
        return false
      } else {
        let name = Object.keys(this.school.data[0])[index]
        let value = this.school.data[0][name]
        return this.isNumeric(value)
      }
    },
    isNumeric (value) {
      return !isNaN(value) && isFinite(value)
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
