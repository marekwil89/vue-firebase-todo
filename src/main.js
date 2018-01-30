import firebaseInit from './firebase';
import * as firebase from 'firebase'
import('../node_modules/vuetify/dist/vuetify.min.css');
import Vue from 'vue'
import App from './App'
import NaviBar from './components/NaviBar.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'


Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.component('navigation', NaviBar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created (){
    firebase.initializeApp(firebaseInit),
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if(user){
        this.$store.store.dispatch('autoSignIn', user);
        this.$router.push('/')
      } else{
        this.$router.push('/login')
      }
    })
  }
})
