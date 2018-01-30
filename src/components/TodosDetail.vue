<template>
  <v-container >
    <v-layout row wrap justify-center>
      <v-flex sm10>
        <v-card>
          <v-card-media v-if="todoDetail.imageUrl" v-bind:src="todoDetail.imageUrl" height="500px">
          <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="display-3">{{todoDetail.title}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{todoDetail.title}}</h3>
              <br>
              <p>{{todoDetail.text}}</p>
              <h4 class="display-1"  v-bind:class="[!todoDetail.done ? 'cyan--text' : 'grey--text']">STATUS: {{!todoDetail.done ? 'ZALICZONE' : 'NIEZALICZONE'}}</h4>
              <div></div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="cyan" dark :to="'/'">
              Back
            </v-btn>
            <v-btn v-if="!todoDetail.done" color="gray lighten-1" @click="onConfirmed(todoDetail.id, !todoDetail.done)">
              niezaliczone
            </v-btn>
            <v-btn v-if="todoDetail.done" color="primary" @click="onConfirmed(todoDetail.id, !todoDetail.done)">
              zaliczone
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'TodosDetail',
  data(){
    return{
      valid: false,
    }
  },
  computed: {
    todoDetail(){
      var paramId = this.$route.params.id;
      this.$store.store.dispatch('getTodoDetail', paramId);
      return this.$store.store.getters.loadTodoDetail;
    }
  },
  methods: {
    onConfirmed(index, done){
      this.$store.store.dispatch('setConfirmed', {index, done});
    }
  }
}
</script>

<style>

</style>
