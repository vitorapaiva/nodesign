module.exports = app => {
    const controller = app.controllers.auth;

    app.route('/api/v1/auth/login')
        .post(controller.login);
}
