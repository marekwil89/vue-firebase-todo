import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todos: []
    },
    getters: {
        getTodos: (state) => {
            db.once('value').then(function(data) {
                state.todos = data.val();
            });
            return state.todos;
        }
    },
    actions: {
        addTodo: (context, todoText) => {
            db.push({
                text: todoText,
                done: false
            })
        }
    }
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