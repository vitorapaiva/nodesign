const signer = require('node-signpdf');

module.exports = () => {
  const controller = {};

  controller.signDocument = (request, response) => {
    let file=Buffer.from(request.body.file, 'base64').toString();
    let certificate=Buffer.from(request.body.certificate, 'base64').toString();
    let password=request.body.password;
    let pdfBuffer = signer.sign(
        file,
        certificate,
        {passphrase: password},
    );
    let result={};
    result.file=Buffer.from(pdfBuffer).toString('base64');
    result.status='OK';
    response.status(200).json(result);
  }

  return controller;
}
