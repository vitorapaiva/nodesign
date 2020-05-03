const { plainAddPlaceholder } = require('node-signpdf/dist/helpers');
const signer = require("node-signpdf").default;
const getFile = require('../services/getFile');
module.exports = signPdf;

async function signPdf (pdfPath, certificatePath, certificatePassword, signReason) {
  try {
      let certificateBuffer=await getFile(certificatePath);
      let pdfBuffer=await getFile(pdfPath);

      pdfBuffer = plainAddPlaceholder({
          pdfBuffer,
          reason: signReason,
          signatureLength: 8000,
      });

      let pdfSigner = signer.sign(
          pdfBuffer,
          certificateBuffer,
          {passphrase: certificatePassword},
      );

      let result = {};
      result.message = "Success";
      result.result = pdfBuffer;
      return result;
  }
  catch (error) {
      let result = {};
      result.message = "Error";
      result.result = error;
      return result;

  }

}
