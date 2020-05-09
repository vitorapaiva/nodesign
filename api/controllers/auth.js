const firebase = require('../services/firebase');

module.exports = () => {
    const controller = {};

    controller.login = async(request, response, next) => {
        try {
            let email = request.body.email;
            let password = request.body.password;

            // todo: request is IncomingMessage (?)
            console.log(email, password);

            let firebaseLogin = await firebase.signInWithEmailAndPassword(email, password);

            console.log(firebaseLogin);
        }
        catch (error) {
            next(error);
        }
    }

    return controller;
}
