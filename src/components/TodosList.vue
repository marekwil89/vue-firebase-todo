<template>
  
  <v-container v-if="logedUser">
    <v-layout row wrap justify-center>
      <v-flex sm10>
        <v-btn color="cyan" dark @click.stop="addTodoDialog = true">Add Dream</v-btn>
      </v-flex>
    </v-layout>

    <v-dialog v-model="addTodoDialog" max-width="800px">
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Add Dream</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-form v-model="valid" @submit.prevent="onSubmit()">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label="Todo title" v-model="newTodo.title" :rules="textRules" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Todo text" multi-line v-model="newTodo.text" :rules="textRules" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn raised class="cyan" dark @click="onPickFile">Upload Image</v-btn>
              <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
            </v-flex>
            <v-flex xs12>
              <br>
              <v-btn block @click.stop="addTodoDialog=false" color="primary" type="submit" :loading="loading" :disabled="!valid || loading">submit</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="addTodoDialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br>
    <v-layout v-if="todoList.length <= 0" row wrap justify-center>
      <v-flex sm10>
        <v-alert  color="error" value="true">List is empty, please add your first dream</v-alert>
      </v-flex>
    </v-layout>
    <v-layout v-if="todoList.length > 0" row wrap justify-center>
      <v-flex sm10>
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>Dream List</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-tile  avatar v-for="todo in todoList" v-bind:key="todo.id">
              <v-list-tile-avatar class="hidden-sm-and-down">
                <img v-bind:src="todo.imageUrl">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="todo.title"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action class="hidden-sm-and-down">
                <v-btn icon @click="onConfirmed(todo.id, !todo.done)">
                  <v-icon v-if="!todo.done" color="teal">done</v-icon>
                  <v-icon v-if="todo.done" color="grey lighten-1">clear</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action class="hidden-sm-and-down">
                <v-btn icon @click="onDelete(todo.id)">
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon :to="`/todo/${todo.id}`">
                  <v-icon color="grey lighten-1">send</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'TodosList',
  data(){
    return{
      addTodoDialog: false,
      valid: false,
      newTodo: {
        title: '',
        text: '',
        image: ''
      },
      textRules: [
        (v) => !!v || 'Field is required'
      ],
    }
  },
  computed: {
    loading(){
      return this.$store.store.getters.getLoadingStatus;
    },
    error(){
      return this.$store.store.getters.getError;
    },
    todoList(){
      this.$store.store.dispatch('getTodoList');
      return this.$store.store.getters.loadTodoList;
    },
    logedUser(){
      return this.$store.store.getters.getLogedUser;
    }
  },
  methods: {
    onSubmit(){
      this.$store.store.dispatch('addTodo', this.newTodo);
    },
    onDelete(id){
      this.$store.store.dispatch('deleteTodo', id);
    },
    onConfirmed(index, done){
      this.$store.store.dispatch('setConfirmed', {index, done});
    },
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
      this.newTodo.image = files[0]
    }
  }
}
</script>

<style>

</style>
