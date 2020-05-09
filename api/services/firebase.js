const firebaseClient = require('firebase');
const config         = require('config');

if (!firebaseClient.apps.length) {
    firebaseClient.initializeApp(config.firebase);
}

let firebase = {};

firebase.signInWithEmailAndPassword = async function (email, password) {
    firebaseClient.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data);

            return data;
        })
        .catch((error) => {
            console.log(error);

            let result = {};

            result.message = "Services/Firebase.js Error";
            result.error = error;

            return result;
        })
}

module.exports = firebase;
