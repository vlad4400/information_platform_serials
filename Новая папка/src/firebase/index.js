import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAoC5i56RqgDJXWjsSQaRUd1vbDTb3PQFk",
    authDomain: "react-zvk.firebaseapp.com",
    databaseURL: "https://react-zvk-default-rtdb.firebaseio.com",
    projectId: "react-zvk",
    storageBucket: "react-zvk.appspot.com",
    messagingSenderId: "139477170604",
    appId: "1:139477170604:web:cb600b8d72ee91bcba2209"
};

firebase.initializeApp(firebaseConfig);



export const auth = firebase.auth();
export const db = firebase.database();

export const rootRef = db.ref("main");


export const chatsRef = rootRef.child("chats");


export const messagesRef = db.ref('messages');

