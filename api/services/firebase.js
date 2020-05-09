const firebaseClient = require('firebase');
const config         = require('config');

firebaseClient.initializeApp(config.firebase);

let firebase = {};

firebase.signInWithEmailAndPassword = function (email, password) {
    firebaseClient.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = firebase;
