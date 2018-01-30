<template>
  <v-toolbar dark color="cyan">
    <v-toolbar-title v-if="logedUser">{{logedUser.email}}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon v-if="logedUser" to="/profile" flat><v-icon v-if="logedUser" to="/profile">portrait</v-icon></v-btn>
    <v-btn icon v-if="logedUser" to="/" flat><v-icon v-if="logedUser" to="/profile">list</v-icon></v-btn>
    <v-btn icon v-if="logedUser" @click="onLogout()" flat><v-icon v-if="logedUser" to="/profile">power_settings_new</v-icon></v-btn>
    <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
    <v-btn v-if="!logedUser" to="/register" flat>Sign up</v-btn>
    <v-btn v-if="!logedUser" to="/login" flat>Sign in</v-btn>
    <!-- </v-toolbar-items> -->
  </v-toolbar>
</template>

<script>
export default {
  name: 'NaviBar',
  data(){
    return{
      valid: false
    }
  },    
  methods: {
    onLogout(){
      this.$router.push('/login')
      this.$store.store.dispatch('logout');
    }
  },
  computed: {
    logedUser(){
      return this.$store.store.getters.getLogedUser;
    },
    logedUserId(){
      return this.$store.store.getters.getLogedUserId;
    }
  }
}
</script>

<style scoped>

</style>