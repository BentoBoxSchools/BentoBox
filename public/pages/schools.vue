<template>
  <div>
    <layout-header>
    </layout-header>
    <school-list>
    </school-list>
  </div>
</template>

<script>
import SchoolList from '~components/SchoolList'
import LayoutHeader from '~components/LayoutHeader'

export default {
  name: 'school-list-container',
  components: {
    SchoolList,
    LayoutHeader
  }
}
</script>

