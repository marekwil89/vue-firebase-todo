<template>
  <form class="register-form">
    <p>Zalogowany użytkownik {{logedUser}}</p>
    <form @submit.prevent="onSubmit()">
      <input v-model="newUser.email" name="email" placeholder="Your email" type="text">
      <input v-model="newUser.password" name="password" type="password" placeholder="your password"/>
      <button type="submit">register</button>
    </form>

  </form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data(){
    return{
      newUser: {
        email: 'exmaple@mail.pl',
        password: 'qwerty1234'
      }
    }
  },
  computed: {
    logedUser(){
      return this.$store.store.getters.getLogedUser;
    }
    // todos(){
    //   return this.$store.store.getters.getTodos;
    // }
  },
  methods: {
    onSubmit(){
      this.$store.store.dispatch('registerNewUser', this.newUser)
    //   this.$store.store.dispatch('addTodo', this.newTodo.text);
    }
  }
}
</script>

<style scoped>

</style>
