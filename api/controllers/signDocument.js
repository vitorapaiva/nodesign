const { plainAddPlaceholder } = require('node-signpdf/dist/helpers');
const signer = require("node-signpdf").default;
const fs = require('fs');
const temp = require('temp').track();

module.exports = () => {
  const controller = {};

  controller.signDocument = (request, response) => {
    temp.track();
    let file=Buffer.from(request.body.file, 'base64').toString();
    var tempFile = temp.openSync({suffix: '.pdf'});
    fs.writeSync(tempFile.fd, file);
    fs.closeSync(tempFile.fd);

    let certificate=Buffer.from(request.body.certificate, 'base64').toString();
    var tempCertificate = temp.openSync({suffix: '.pfx'});
    fs.writeSync(tempCertificate.fd, certificate);
    fs.closeSync(tempCertificate.fd);

    let pdfBuffer=fs.readFileSync(tempFile.path);
    let certificateBuffer=fs.readFileSync(tempCertificate.path);

    pdfBuffer = plainAddPlaceholder({
        pdfBuffer,
        reason: 'Assinado por Vitor.',
        signatureLength: 8000,
      });

    let password=request.body.password;
    let pdfSigner = signer.sign(
        pdfBuffer,
        certificateBuffer,
        {passphrase: password},
    );

    let result={};
    result.file=Buffer.from(pdfSigner).toString('base64');
    result.status='OK';

    temp.cleanup(function(err, counts) {
      assert.ok(!err, 'temp.cleanup did not run without encountering an error');
      assert.ok(!existsSync(tempFile.path), 'temp.cleanup did not remove the openSync file for cleanup');
      assert.ok(!existsSync(tempCertificate.path), 'temp.cleanup did not remove the openSync certificate for cleanup');
      assert.equal(2, counts.files, 'temp.cleanup did not report the correct removal statistics');
      done();
    });

    response.status(200).json(result);
  }

  return controller;
}
