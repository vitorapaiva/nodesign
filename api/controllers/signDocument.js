module.exports = () => {
  const controller = {};

  controller.signDocument = (request, response) => {
    let responseData = {};
    responseData.ok='ok';
    response.status(200).json(responseData);
  }

  return controller;
}
