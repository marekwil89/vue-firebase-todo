<template>
  <section class="todos-list-section">
    <ul>
      <li v-for="todo in todos" v-bind:key="todo['.key']">
        <p>{{todo.text}} {{todo.done}}</p> 
      </li>
    </ul>

    <form @submit.prevent="onSubmit()">
      <input v-model="newTodo.text" name="todo-text" placeholder="Todo text" type="text">
      <button type="submit">add</button>
    </form>

  </section>
</template>

<script>
export default {
  name: 'TodosList',
  data(){
    return{
      newTodo: {
        text: 'example todo'
      }
    }
  },
  computed: {
    todos(){
      return this.$store.store.getters.getTodos;
    }
  },
  methods: {
    onSubmit(){
      this.$store.store.dispatch('addTodo', this.newTodo.text);
    }
  }
}
</script>

<style scoped>

</style>
