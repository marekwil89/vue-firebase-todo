import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './firebase';

import * as firebase from 'firebase'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todos: [],
        logedUser: null
    },
    getters: {
        getLogedUser: (state) => {
            return state.logedUser
        },
        getTodos: (state) => {
            db.ref('todos').once('value').then(function(data) {
                state.todos = data.val();
            });
            return state.todos;
        }
    },
    actions: {
        addTodo: (context, todoText) => {
            db.ref('todos').push({
                text: todoText,
                done: false
            })
        },
        registerNewUser: ({commit}, newUser) => {
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((user) => {
                const newUser = {
                    email: user.email,
                    id: user.uid
                }
                commit('setUser', newUser)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
    mutations: {
        setUser (state, newUser) {
          state.logedUser = newUser
        }
    },
    // mutations: {
    //     toggle: function () {
    //         console.log('dada');
    //         // let temp = !context.state._isTrue;
    //         // firebase.database.ref('settings/setting').set(temp)
    //     }
    // },
    // actions: {
    //     getFirebaseDatabase: function() {
    //         console.log('adada')
    //         // firebase.database.ref('settings/setting').on('value', function(snapshot){
    //         //     context.commit('toggle', snapsot.val())
    //         // });
    //     }
    // }
})

export default {
    store: store
}