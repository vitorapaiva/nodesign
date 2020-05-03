const signPdf = require('../services/signPdf');
const asyncDownload = require('../services/asyncDownload');
const { v4: uuidv4 } = require('uuid');
const tmpFolder = '/tmp/';

module.exports = () => {
  const controller = {};

  controller.signDocument = async(request, response, next) => {
    try {
        let file=request.body.file;
        let fileName= uuidv4()+'.pdf';
        let pdfPath = await asyncDownload(file, tmpFolder, fileName);

        let certificate=request.body.certificate;
        let certificateName= uuidv4()+'.pfx';
        let certificatePath = await asyncDownload(certificate, tmpFolder, certificateName);

        let password=request.body.password;
        let reason=request.body.reason;

        if(pdfPath.message=='Error')
        {
            return response.status(400).json(pdfPath);
        }
        if(certificatePath.message=='Error')
        {
            return response.status(400).json(certificatePath);
        }

        let pdfSigner=await signPdf(pdfPath.result, certificatePath.result, password, reason);

        let result={};
        if(pdfSigner.message=='Success')
        {
            result.file=Buffer.from(pdfSigner.result).toString('base64');
            result.status='OK';
            return response.status(200).json(result);
        }
        return response.status(400).json(pdfSigner);

    }
    catch (error) {
        console.log(error);
        next(error);
    }

  }

  return controller;
}
