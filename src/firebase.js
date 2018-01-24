import { initializeApp } from 'firebase'

const app = initializeApp({
    apiKey: "AIzaSyB2yONb_Mhjxs9a_VNLt8cM7cPqODOgZHo",
    authDomain: "tood-36c02.firebaseapp.com",
    databaseURL: "https://tood-36c02.firebaseio.com",
    projectId: "tood-36c02",
    storageBucket: "tood-36c02.appspot.com",
    messagingSenderId: "778079726049"
});

export const db = app.database().ref('todos')