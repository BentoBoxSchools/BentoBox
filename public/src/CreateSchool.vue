<template>
  <div>
    <layout-header></layout-header>
    <md-card>
      <md-card-header>
        <div class="md-title">Create a new school</div>
      </md-card-header>
      <md-card-content>
        <form
         id='uploadForm'
         action='/api/upload'
         method='POST'
         encType="multipart/form-data"
         >

         <md-input-container>
           <label>School name</label>
           <md-input name="name"></md-input>
         </md-input-container>
         <md-input-container>
           <label>Donation link</label>
           <md-input name="link" type="url"></md-input>
         </md-input-container>
         <label>Spreadsheet: </label>
         <input name="sampleFile" type="file" />
        </form>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised">
          Create
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import LayoutHeader from './components/LayoutHeader'

export default {
  name: 'create-school',
  components: {
    LayoutHeader
  }
}
</script>

<style scoped>
.md-card {
  width: 50em;
  padding: 1em;
  margin: 0 auto;
}
</style>
