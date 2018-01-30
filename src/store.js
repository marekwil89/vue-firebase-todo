import Vue from 'vue'
import Vuex from 'vuex'
// import {db} from './firebase';

import * as firebase from 'firebase'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todoList: [],
        todoDetail: {},
        logedUser: null,
        error: null,
        loading: false
    },
    getters: {
        loadTodoList: (state) => {
            return state.todoList
        },
        loadTodoDetail: (state) => {
            return state.todoDetail
        },
        getError: (state) => {
            return state.error
        },
        getLoadingStatus: (state) => {
            return state.loading;
        },
        getLogedUser: (state) => {
            return state.logedUser
        }
    },
    mutations: {
        setTodoList (state, payload){
            state.todoList = payload
        },
        setTodoDetail (state, payload){
            state.todoDetail = payload
        },
        setUser (state, payload) {
            state.logedUser = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        }
    },
    actions: {
        getTodoDetail: ({commit, getters}, payload) => {
            firebase.database().ref('todos/' + getters.getLogedUser.id + '/'+ payload).once('value').then(function(data) {
                let todo = {}
                const obj = data.val()
                todo = {
                    id: payload,
                    title: obj.title,
                    text: obj.text,
                    done: obj.done,
                    imageUrl: obj.imageUrl
                }
                commit('setTodoDetail', todo);
            });
        },
        getTodoList: ({commit, getters}) => {
            firebase.database().ref('todos/' + getters.getLogedUser.id).once('value').then((data) => {
                const todos = [];
                const obj = data.val();

                for(let key in obj){
                    todos.push({
                        id: key,
                        title: obj[key].title,
                        text: obj[key].text,
                        done: obj[key].done,
                        imageUrl: obj[key].imageUrl
                    })
                }
                commit('setTodoList', todos);
            })
        },
        deleteTodo: ({commit, getters}, payload) => {
            console.log(payload);
            firebase.database().ref('todos/' + getters.getLogedUser.id).child(payload).remove();
        },
        setConfirmed: ({commit, getters}, payload) => {
            firebase.database().ref('todos/' + getters.getLogedUser.id).child(payload.index).update({
                done: payload.done
            });
        },
        addTodo: ({commit, getters}, payload) => {
            let key
            let imageUrl
            
            firebase.database().ref('todos/' + getters.getLogedUser.id).push({
                text: payload.text,
                title: payload.title,
                done: false
            }).then((data) => {
                key = data.key
                return key
            })
            .then(key => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase.storage().ref('todos/' + key + '.' + ext).put(payload.image)
            })
            .then(fileData => {
                return firebase.database().ref('todos/' + getters.getLogedUser.id).child(key).update({imageUrl: fileData.metadata.downloadURLs[0]})
            })
        },
        autoSignIn: ({commit}, user) => {
            const logedUser = {
                email: user.email,
                photoURL: user.photoURL,
                id: user.uid
            }
            commit('setUser', logedUser)
        },
        logout: ({commit}) => {
            firebase.auth().signOut();
            commit('setUser', null);
        },
        registerUser: ({commit}, newUser) => {
            commit('setLoading', true);
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((user) => {
                commit('setLoading', false);
                commit('setError', null);
                const newUser = {
                    email: user.email,
                    id: user.uid
                }
            })
            .catch((error) => {
                commit('setLoading', false);
                commit('setError', error);
            })
        },
        loginUser: ({commit}, user) => {
            commit('setLoading', true);
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((user) => {
                commit('setLoading', false);
                commit('setError', null);
            })
            .catch((error) => {
                commit('setLoading', false);
                commit('setError', error);
            })
        },
        updateAvatar: ({commit, getters}, payload) => {
            commit('setLoading', true);
            const filename = payload.name
            const ext = filename.slice(filename.lastIndexOf('.'))

            firebase.storage().ref('users/' + getters.getLogedUser.id + '.' + ext).put(payload)
            .then((fileData)=> {
                firebase.auth().currentUser.updateProfile({
                    photoURL: fileData.metadata.downloadURLs[0]
                }).then(()=>{
                    commit('setUser', {...getters.getLogedUser, photoURL: firebase.auth().currentUser.photoURL})
                    commit('setLoading', false);
                })
            });
        }
    }
})

export default {
    store: store
}