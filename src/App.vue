<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/register">Register form</router-link></li>
        <li><router-link to="/">List</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>