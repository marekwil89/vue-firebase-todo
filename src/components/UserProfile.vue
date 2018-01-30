<template>
  <v-container v-if="logedUser">
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12>
        <v-form @submit.prevent="onSubmit()">
          <v-card >
            <v-toolbar color="cyan" dark>
              <v-toolbar-title>Profile </v-toolbar-title>
            </v-toolbar>
            <br><br>            
              <v-card-media v-if="logedUser.photoURL" v-bind:src="logedUser.photoURL" height="300px" contain></v-card-media>
            <br><br>
            <v-card-actions>
              <v-btn v-if="logedUser.photoURL" color="cyan" dark @click="onPickFile">Change Image</v-btn>
              <v-btn v-if="!logedUser.photoURL" color="cyan" dark @click="onPickFile">Upload Image</v-btn>
              <input required type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
            </v-card-actions>
            <v-card-text>
              <h2 class="title">Email: {{logedUser.email}}</h2>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="primary" type="submit" :loading="loading" :disabled="!avatar || loading">Save changes</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>

  
</template>

<script>
export default {
  name: 'UserProfile',
  data(){
    return{
      avatar: null
    }
  },
  computed: {
    loading(){
      return this.$store.store.getters.getLoadingStatus;
    },
    error(){
      return this.$store.store.getters.getError;
    },
    logedUser(){
      return this.$store.store.getters.getLogedUser;
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.avatar = files[0]
    },
    onSubmit(){
      this.$store.store.dispatch('updateAvatar', this.avatar);
    }
  },
}
</script>

<style>

</style>
