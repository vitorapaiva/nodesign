module.exports = app => {
  const controller = app.controllers.signDocument;

  app.route('/api/v1/sign/document')
    .post(controller.signDocument);
}
