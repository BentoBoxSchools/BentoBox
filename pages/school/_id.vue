<template>
    <div>
        <layout-header></layout-header>

        <div class="container">
            <section class="card">
                <header class="card__header">
                    <h2>{{school.name}}</h2>
                    <div class="subhead">{{school.data.length}} Students</div>
                </header>

                <div class="card__content">
                    <p>{{school.description}}</p>

                    <table>
                        <thead>
                            <tr>
                                <td v-for="(header, index) in headers">
                                    {{header | capFirst}}
                                </td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(row, index) in school.data">
                                <td v-for="col in row">
                                    {{col}}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="card__actions">
                        <a class="button" target="_blank" :href="school.link">Donate</a>
                    </div>
                </div>
            </section>
        </div>
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
    axios.get(`/api/public/schools/${this.$route.params.id}`)
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
