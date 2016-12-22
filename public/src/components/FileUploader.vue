<template>
  <div class="dropzone"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragleave"
    @drop.prevent="drop"
    @click="select"
    :class="{dragover: dragover}">
    <slot>
      Drop or select a file
    </slot>
    <input type="file" ref="file" name="files"
      @change="onFileChange">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'file-uploader',
  props: {
    name: {
      type: String,
      default: 'files'
    },
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dragover: false
    }
  },
  methods: {
    select () {
      this.$refs['file'].click()
    },
    onDragover () {
      this.dragover = true
    },
    dragleave () {
      this.dragover = false
    },
    drop (evt) {
      evt.stopPropagation()
      evt.preventDefault()
      this.dragover = false
      let files = evt.dataTransfer.files
      this.upload(files)
    },
    onFileChange (evt) {
      let files = evt.target.files
      this.upload(files)
    },
    upload (files) {
      if (!files.length) {
        return
      }

      let formData = new FormData()
      for (var i = 0; i < files.length; i ++) {
        formData.append(this.name, files[i], files[i].name)
      }

      axios.post(this.url, formData)
        .then(resp => {
          console.log(resp)
          this.$emit('uploaded', resp.data)
        })
        .catch(errors => {
          console.error(errors)
        })
    }
  }
}
</script>

<style scoped>
.dropzone {
  height: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  border-radius: 3px;
  border: 3px dashed #ccc;
}
.dropzone.dragover {
  background-color: #BBDEFB;
  border-color: #2196F3;
}
.dropzone a {
  margin: 0 0.3em;
}
input[type="file"] {
  display: none;
}
</style>
