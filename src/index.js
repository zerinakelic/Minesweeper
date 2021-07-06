import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//FIREBASE
import firebase from "firebase";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCStl_18rWDVHLNGU1QlU_dunsi85NdZFo",
    authDomain: "projekat1-56841.firebaseapp.com",
    projectId: "projekat1-56841",
    storageBucket: "projekat1-56841.appspot.com",
    messagingSenderId: "708584271408",
    appId: "1:708584271408:web:c28d7d3e45760b1a70c7f5",
    measurementId: "G-YGLQRLB50L"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

