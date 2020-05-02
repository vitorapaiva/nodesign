const { plainAddPlaceholder } = require('node-signpdf/dist/helpers');
const signer = require("node-signpdf").default;
const fs = require('fs');
const download = require('download-file');
const { v4: uuidv4 } = require('uuid');
const tmpFolder = '/tmp/';

module.exports = () => {
  const controller = {};

  controller.signDocument = async(request, response, next) => {
    try {
        let file=request.body.file;
        let fileName= uuidv4()+'.pdf';
        var options = {
            directory: tmpFolder,
            filename: fileName
        }

        await download(file, options, function(err){
            if (err) throw err
        })

        let certificate=request.body.certificate;

        let certificateName= uuidv4()+'.pfx';
        var optionsCertificate = {
            directory: tmpFolder,
            filename: certificateName
        }

        await download(certificate, optionsCertificate, function(err){
            if (err) throw err
        })

        let pdfBuffer=fs.readFileSync(tmpFolder+fileName, (err, data) => {
          if (err) throw err;
          console.log(data);
        });

        let certificateBuffer=fs.readFileSync(tmpFolder+certificateName, (err, data) => {
          if (err) throw err;
          console.log(data);
        });

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

        response.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }

  }

  return controller;
}
